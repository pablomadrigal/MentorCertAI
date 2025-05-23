import { RpcProvider, Contract, Account } from 'starknet';

//initialize provider with a Sepolia Testnet node
const provider = new RpcProvider({ nodeUrl: `${process.env.RPC_URL}` });

// connect your account. To adapt to your own account:
const privateKeyMensis = process.env.MENSIS_PRIVATE_KEY ?? "";
const accountMensisAddress = process.env.MENSIS_PUBLIC_KEY ?? "";

// NFT contract in Testnet
const nftAddress = process.env.MENTORCET_NFT_ADDRESS ?? "";

export const getTotalMintableNFTs = async () => {
    const { abi: NftAbi } = await provider.getClassAt(nftAddress);
    if (NftAbi === undefined) {
        throw new Error('no abi.');
    }
    const mentorCertNFTContract = new Contract(NftAbi, nftAddress, provider);
    const totalMintableNFTs = await mentorCertNFTContract.total_supply();
    return totalMintableNFTs;
}

export const mintNFT = async (recipient: string, certificate_id: string, theme: string, score: number, token_id: number, data: string) => {

    const accountMensis = new Account(provider, accountMensisAddress, privateKeyMensis);

    // read abi of Test contract
    const { abi: NftAbi } = await provider.getClassAt(nftAddress);
    if (NftAbi === undefined) {
        throw new Error('no abi.');
    }

    const mentorCertNFTContract = new Contract(NftAbi, nftAddress, provider);

    // Connect account with the contract
    mentorCertNFTContract.connect(accountMensis);

    //First increment the amount of minteable nfts for the user
    const incrementMintableNFTsCall = mentorCertNFTContract.populate('increment_mintable_nfts', [recipient]);
    const resIncrement = await mentorCertNFTContract.increment_mintable_nfts(incrementMintableNFTsCall.calldata);
    await provider.waitForTransaction(resIncrement.transaction_hash);

    //Then mint the nft
    const mintNFTCall = mentorCertNFTContract.populate('safe_mint', [recipient, certificate_id, theme, score, token_id, data]);
    const res = await mentorCertNFTContract.safe_mint(mintNFTCall.calldata);
    await provider.waitForTransaction(res.transaction_hash);

    return res.transaction_hash;
}