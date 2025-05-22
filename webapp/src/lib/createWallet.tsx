import {
  Account,
  ec,
  stark,
  RpcProvider,
  hash,
  CallData,
  CairoOption,
  CairoOptionVariant,
  CairoCustomEnum,
} from "starknet";
import crypto from "crypto";

const algorithm = "aes-256-ecb"; // Encryption algorithm
const ARGENT_ACCOUNT_CLASS_HASH = "0x1a736d6ed154502257f02b1ccdf4d9d1089f80811cd6acad48e6b6a9d1f2003";

// Derive encryption key from data
export const getHashFromString = (data: string) => {
  return crypto.createHash("sha256").update(data).digest();
};

// Encrypt the data using the derived key
export const encryptData = (dataToEncrypt: string, pin: string) => {
  const key = getHashFromString(pin);
  const cipher = crypto.createCipheriv(algorithm, key, Buffer.alloc(0));
  let encrypted = cipher.update(dataToEncrypt, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

// Decrypt the data using the derived key
export const decryptData = (encryptedData: string, pin: string): string => {
  const key = getHashFromString(pin);
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.alloc(0));
  let decrypted = decipher.update(encryptedData, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
};

export const generatePrivateKeyEncrypted = (pin: string): string => {
  const privateKey = stark.randomAddress();
  const encryptedPrivateKey = encryptData(privateKey, pin);
  console.log("✅ Encrypted private key:", encryptedPrivateKey);
  return encryptedPrivateKey;
};

export const getDecryptedPrivateKey = (
  encryptedPrivateKey: string,
  pin: string
) => {
  return decryptData(encryptedPrivateKey, pin);
};

export const getFutureWalletAdress = (
  encryptedPrivateKey: string,
  pin: string
) => {
  const privateKey = decryptData(encryptedPrivateKey, pin);

  const starkKeyPubAX = ec.starkCurve.getStarkKey(privateKey);

  const argentXaccountClassHash =
    "0x036078334509b514626504edc9fb252328d1a240e4e948bef8d0c08dff45927f";
  const axSigner = new CairoCustomEnum({
    Starknet: { pubkey: starkKeyPubAX },
  });
  const axGuardian = new CairoOption<unknown>(CairoOptionVariant.None);
  const AXConstructorCallData = CallData.compile({
    owner: axSigner,
    guardian: axGuardian,
  });
  const AXcontractAddress = hash.calculateContractAddressFromHash(
    starkKeyPubAX,
    argentXaccountClassHash,
    AXConstructorCallData,
    0
  );
  console.log("✅ Precalculated account address:", AXcontractAddress);
  return AXcontractAddress;
};

export const generateAndDeployPreChargedWallet = async (
  encryptedPrivateKey: string,
  pin: string
) => {
  const RPC_KEY = process.env.NEXT_PUBLIC_RPC_URL ?? "";

  // connect provider
  const provider = new RpcProvider({ nodeUrl: RPC_KEY });

  //new Argent X account v0.4.0
  const argentXaccountClassHash =
    "0x036078334509b514626504edc9fb252328d1a240e4e948bef8d0c08dff45927f";

  const privateKey = decryptData(encryptedPrivateKey, pin);
  console.log("Decrypted private key", privateKey);

  const starkKeyPubAX = ec.starkCurve.getStarkKey(privateKey);

  // Calculate future address of the ArgentX account
  const axSigner = new CairoCustomEnum({
    Starknet: { pubkey: starkKeyPubAX },
  });
  const axGuardian = new CairoOption<unknown>(CairoOptionVariant.None);
  const AXConstructorCallData = CallData.compile({
    owner: axSigner,
    guardian: axGuardian,
  });
  const AXcontractAddress = hash.calculateContractAddressFromHash(
    starkKeyPubAX,
    argentXaccountClassHash,
    AXConstructorCallData,
    0
  );
  console.log("Precalculated account address=", AXcontractAddress);

  const accountAX = new Account(provider, AXcontractAddress, privateKey);

  const deployAccountPayload = {
    classHash: argentXaccountClassHash,
    constructorCalldata: AXConstructorCallData,
    contractAddress: AXcontractAddress,
    addressSalt: starkKeyPubAX,
  };

  const { transaction_hash: AXdAth, contract_address: AXcontractFinalAddress } =
    await accountAX.deployAccount(deployAccountPayload);
  console.log("✅ ArgentX wallet deployed at:", AXcontractFinalAddress, AXdAth);
  return AXcontractFinalAddress;
};

export const deployWithPaymaster = async (encryptedPrivateKey: string, pin: string, paymasterUrl: string, paymasterApiKey: string) => {
  try {
    const privateKey = getDecryptedPrivateKey(encryptedPrivateKey, pin);
    const starkKeyPub = ec.starkCurve.getStarkKey(privateKey);

    const axGuardian = new CairoOption<unknown>(CairoOptionVariant.None);
    const ArgentAAConstructorCallData = CallData.compile({
      owner: starkKeyPub,
      guardian: axGuardian,
    });

    const WalletHexAddress = hash.calculateContractAddressFromHash(
      starkKeyPub,
      ARGENT_ACCOUNT_CLASS_HASH,
      ArgentAAConstructorCallData,
      0
    );

    const deploymentData = {
      class_hash: ARGENT_ACCOUNT_CLASS_HASH,
      salt: ARGENT_ACCOUNT_CLASS_HASH,
      unique: "0x1",
      calldata: ArgentAAConstructorCallData.map(x => {
        const hex = BigInt(x).toString(16);
        return `0x${hex}`;
      })
    };

    const buildTypedDataResponse = await fetch(`${paymasterUrl}/paymaster/v1/build-typed-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": paymasterApiKey,
      },
      body: JSON.stringify({
        userAddress: WalletHexAddress,
        accountClassHash: ARGENT_ACCOUNT_CLASS_HASH,
        deploymentData,
        calls: [],
      })
    });

    if (!buildTypedDataResponse.ok) {
      throw new Error('Failed to build typed data');
    }

    const deployResponse = await fetch(`${paymasterUrl}/paymaster/v1/deploy-account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": paymasterApiKey,
      },
      body: JSON.stringify({
        userAddress: WalletHexAddress,
        deploymentData
      })
    })

    if (!deployResponse.ok) {
      throw new Error('Failed to execute deployment');
    }

    const executeResult = await deployResponse.json();

    return {
      transactionHash: executeResult.transactionHash,
      contractAddress: WalletHexAddress
    };

  } catch (error) {
    throw error;
  }
}