import { RpcProvider, Contract, Account, shortString } from 'starknet';

//initialize provider with a Sepolia Testnet node
const provider = new RpcProvider({ nodeUrl: `${process.env.RPC_URL}` });

// connect your account. To adapt to your own account:
const privateKeyMensis = process.env.MENSIS_PRIVATE_KEY ?? "";
const accountMensisAddress = process.env.MENSIS_PUBLIC_KEY ?? "";

// NFT contract in Testnet
const nftAddress = process.env.MENTORCET_NFT_ADDRESS ?? "0x0699e94c1c3f33d0c9aba6d0897771ff13fc5c06f8293c96012238f83cec0273";
console.log("nftAddress", nftAddress)
if (!nftAddress) {
    throw new Error('MENTORCET_NFT_ADDRESS environment variable is not set');
}

export const getTotalMintableNFTs = async () => {
    const { abi: NftAbi } = await provider.getClassAt(nftAddress);
    if (NftAbi === undefined) {
        throw new Error('no abi.');
    }
    const mentorCertNFTContract = new Contract(NftAbi, nftAddress, provider);
    const totalMintableNFTs = await mentorCertNFTContract.total_supply();
    return totalMintableNFTs;
}

export const mintNFT = async (recipient: string, score: number, token_id: number) => {
    const accountMensis = new Account(provider, accountMensisAddress, privateKeyMensis);

    // read abi of Test contract
    const { abi: NftAbi } = await provider.getClassAt(nftAddress);
    if (NftAbi === undefined) {
        throw new Error('no abi.');
    }

    const mentorCertNFTContract = new Contract(NftAbi, nftAddress, provider);

    // Connect account with the contract
    mentorCertNFTContract.connect(accountMensis);

    try {
        //First increment the amount of minteable nfts for the user
        const incrementMintableNFTsCall = mentorCertNFTContract.populate('increment_mint_limit', [recipient]);
        const resIncrement = await mentorCertNFTContract.increment_mint_limit(incrementMintableNFTsCall.calldata);
        await provider.waitForTransaction(resIncrement.transaction_hash);

        //Then mint the nft
        const mintNFTCall = mentorCertNFTContract.populate('safe_mint', [
            recipient,
            shortString.encodeShortString('0'),
            shortString.encodeShortString('0'),
            score,
            token_id,
            shortString.encodeShortString('0')
        ]);
        const res = await mentorCertNFTContract.safe_mint(mintNFTCall.calldata);
        await provider.waitForTransaction(res.transaction_hash);

        return res.transaction_hash;
    } catch (error) {
        console.error('Error in mintNFT:', error);
        throw error;
    }
}