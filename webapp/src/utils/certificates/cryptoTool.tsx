import { ethers } from 'ethers';

const CONTRACT_ADDRESS = "0x8267cf9254734c6eb452a7bb9aaf97b392258b21";
const CONTRACT_ABI = [
    "function anchorHash(bytes32 hash) public",
    "function isAnchored(bytes32 hash) public view returns (bool)",
    "event HashAnchored(bytes32 hash, address issuer)"
];

export const saveRootOnBlockchain = async (signer: ethers.JsonRpcSigner, rootHex: string): Promise<any> => {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    const tx = await contract.anchorHash(rootHex);
    return await tx.wait(); // Espera la confirmación de la transacción
}

export const signHash = async (signer: ethers.JsonRpcSigner, targetHashHex: string): Promise<string> => {
    const signature = await signer.signMessage(ethers.getBytes(targetHashHex));
    return signature;
}

export const getSigner = async (): Promise<ethers.JsonRpcSigner> => {

    if (!window?.ethereum) throw new Error("MetaMask no está disponible");

    await window?.ethereum.request({ method: 'eth_requestAccounts' });

    const provider = new ethers.BrowserProvider(window?.ethereum);
    const signer = await provider.getSigner();
    return signer
}

export const makeTransaction = async (
    signer: ethers.JsonRpcSigner,
    data: string,
    to?: string,
    value?: bigint
): Promise<ethers.TransactionReceipt> => {
    try {
        const provider = signer.provider;
        if (!provider) throw new Error("No provider available");

        const address = to || "0x1ecA2B2bC6C662BDc3FB3F46Fb99400A9F12121f";

        // Get the current gas price
        const gasPrice = await provider.getFeeData();

        // Estimate gas for the transaction
        const gasEstimate = await provider.estimateGas({
            to: address,
            data,
            value: value || 0n
        }).catch(error => {
            console.error("Gas estimation failed:", error);
            throw new Error(`Gas estimation failed: ${error.message}`);
        });

        console.log("Transaction parameters:", {
            to: address,
            data,
            value: value?.toString() || "0",
            gasLimit: gasEstimate.toString(),
            maxFeePerGas: gasPrice.maxFeePerGas?.toString(),
            maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas?.toString()
        });

        const tx = await signer.sendTransaction({
            to: address,
            data,
            value: value || 0n,
            gasLimit: gasEstimate * 120n / 100n, // Add 20% buffer
            maxFeePerGas: gasPrice.maxFeePerGas,
            maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas
        });

        console.log("Transaction sent:", tx.hash);
        const receipt = await tx.wait();
        if (!receipt) throw new Error("Transaction failed - no receipt received");
        return receipt;
    } catch (error) {
        console.error("Transaction error:", error);
        if (error instanceof Error) {
            throw new Error(`Transaction failed: ${error.message}`);
        }
        throw error;
    }
}

export const sendETH = async (
    signer: ethers.JsonRpcSigner,
    to: string,
    amountInETH: number
): Promise<ethers.TransactionReceipt> => {
    try {
        // Convert ETH amount to wei
        const amountInWei = ethers.parseEther(amountInETH.toString());

        console.log("Sending transaction:", {
            to,
            amount: `${amountInETH} ETH (${amountInWei} wei)`
        });

        const tx = await signer.sendTransaction({
            to,
            value: amountInWei
        });

        console.log("Transaction sent:", tx.hash);
        const receipt = await tx.wait();
        if (!receipt) throw new Error("Transaction failed - no receipt received");
        return receipt;
    } catch (error) {
        console.error("Transaction error:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to send ETH: ${error.message}`);
        }
        throw error;
    }
}