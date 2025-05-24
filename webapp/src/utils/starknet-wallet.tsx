/* eslint-disable @typescript-eslint/no-unused-vars */
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
  TypedData,
  GetTransactionReceiptResponse
} from "starknet";
import crypto from "crypto";

const algorithm = "aes-256-ecb"; // Encryption algorithm
const ARGENT_ACCOUNT_CLASS_HASH = "0x1a736d6ed154502257f02b1ccdf4d9d1089f80811cd6acad48e6b6a9d1f2003";
const RPC_KEY = process.env.NEXT_PUBLIC_RPC_URL ?? "";
const UDC_ADDRESS = process.env.UDC_ADDRESS ?? "0x41a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf";

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
  return encryptedPrivateKey;
};

export const getDecryptedPrivateKey = (
  encryptedPrivateKey: string,
  pin: string
) => {
  return decryptData(encryptedPrivateKey, pin);
};

export const getPublicAddress = (
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
  return AXcontractAddress;
};

export const generateAndDeployPreChargedWallet = async (
  encryptedPrivateKey: string,
  pin: string
) => {

  // connect provider
  const provider = new RpcProvider({ nodeUrl: RPC_KEY });

  //new Argent X account v0.4.0
  const argentXaccountClassHash =
    "0x036078334509b514626504edc9fb252328d1a240e4e948bef8d0c08dff45927f";

  const privateKey = decryptData(encryptedPrivateKey, pin);

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

  const accountAX = new Account(provider, AXcontractAddress, privateKey);

  const deployAccountPayload = {
    classHash: argentXaccountClassHash,
    constructorCalldata: AXConstructorCallData,
    contractAddress: AXcontractAddress,
    addressSalt: starkKeyPubAX,
  };

  const { contract_address: AXcontractFinalAddress } =
    await accountAX.deployAccount(deployAccountPayload);
  return AXcontractFinalAddress;
};

interface StarknetEvent {
  from_address: string;
  data: string[];
  keys: string[];
}

interface DeploymentData {
  class_hash: string;
  salt: string;
  unique: string;
  calldata: string[];
}

const prepareDeploymentData = (starkKeyPub: string): DeploymentData => {
  const axGuardian = new CairoOption<unknown>(CairoOptionVariant.None);
  const constructorCallData = CallData.compile({
    owner: starkKeyPub,
    guardian: axGuardian,
  });

  return {
    class_hash: ARGENT_ACCOUNT_CLASS_HASH,
    salt: ARGENT_ACCOUNT_CLASS_HASH,
    unique: "0x1",
    calldata: constructorCallData.map(x => {
      const hex = BigInt(x).toString(16);
      return `0x${hex}`;
    })
  };
};

const calculateWalletAddress = (starkKeyPub: string, constructorCallData: string[]): string => {
  return hash.calculateContractAddressFromHash(
    starkKeyPub,
    ARGENT_ACCOUNT_CLASS_HASH,
    constructorCallData,
    0
  );
};

const buildTypedData = async (walletAddress: string, deploymentData: DeploymentData, paymasterUrl: string, paymasterApiKey: string) => {
  const response = await fetch(`${paymasterUrl}/paymaster/v1/build-typed-data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": paymasterApiKey,
    },
    body: JSON.stringify({
      userAddress: walletAddress,
      accountClassHash: ARGENT_ACCOUNT_CLASS_HASH,
      deploymentData,
      calls: [],
    })
  });

  if (!response.ok) {
    throw new Error('Failed to build typed data');
  }
};

const executeDeployment = async (walletAddress: string, deploymentData: DeploymentData, paymasterUrl: string, paymasterApiKey: string) => {
  const response = await fetch(`${paymasterUrl}/paymaster/v1/deploy-account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": paymasterApiKey,
    },
    body: JSON.stringify({
      userAddress: walletAddress,
      deploymentData
    })
  });

  if (!response.ok) {
    throw new Error('Failed to execute deployment');
  }

  return response.json();
};

const getTransactionReceipt = async (provider: RpcProvider, transactionHash: string): Promise<GetTransactionReceiptResponse> => {
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let receipt: GetTransactionReceiptResponse | undefined;
  let retries = 5;
  const RETRY_DELAY = 2000;

  while (retries > 0) {
    try {
      receipt = await provider.getTransactionReceipt(transactionHash);
      if (receipt) {
        break;
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const isNotFoundError = errorMessage.includes('Transaction hash not found');

      if (!isNotFoundError) {
        throw error;
      }

      retries--;
      if (retries > 0) {
        await sleep(RETRY_DELAY);
      }
    }
  }

  if (!receipt) {
    throw new Error(`Failed to get transaction receipt after 5 attempts for tx: ${transactionHash}`);
  }

  return receipt;
};

const findDeployedContractAddress = (receipt: GetTransactionReceiptResponse): string | undefined => {
  if ('events' in receipt) {
    const deployedEvent = receipt.events.find(
      (event: StarknetEvent) => event.from_address === UDC_ADDRESS
    );
    if (deployedEvent) {
      const contractAddress = deployedEvent.data[0];
      return contractAddress;
    }
  }
  return undefined;
};

export const deployWithPaymaster = async (encryptedPrivateKey: string, pin: string, paymasterUrl: string, paymasterApiKey: string) => {
  try {
    const privateKey = getDecryptedPrivateKey(encryptedPrivateKey, pin);
    const starkKeyPub = ec.starkCurve.getStarkKey(privateKey);

    const deploymentData = prepareDeploymentData(starkKeyPub);
    const walletAddress = calculateWalletAddress(starkKeyPub, deploymentData.calldata);

    await buildTypedData(walletAddress, deploymentData, paymasterUrl, paymasterApiKey);
    const executeResult = await executeDeployment(walletAddress, deploymentData, paymasterUrl, paymasterApiKey);

    const provider = new RpcProvider({ nodeUrl: RPC_KEY });
    const receipt = await getTransactionReceipt(provider, executeResult.transactionHash);

    const contractAddress = findDeployedContractAddress(receipt);
    if (!contractAddress) {
      throw new Error('Could not find deployed contract address in transaction events');
    }

    return {
      transactionHash: executeResult.transactionHash,
      contractAddress
    };
  } catch (error) {
    throw error;
  }
};

export const signMessage = async (encryptedPrivateKey: string, pin: string, message: object) => {
  const privateKey = getDecryptedPrivateKey(encryptedPrivateKey, pin);
  const publicKey = getPublicAddress(encryptedPrivateKey, pin);

  // connect provider
  const provider = new RpcProvider({ nodeUrl: RPC_KEY });

  const account = new Account(provider, publicKey, privateKey);
  const stringified = JSON.stringify(message);
  const feltHash = hash.starknetKeccak(stringified);

  //const signature = await account.signMessage(feltHash);
  ///const signature = await account.signMessage(toTypedDataFromJson({ content: JSON.stringify(message) }));
  return feltHash;
}