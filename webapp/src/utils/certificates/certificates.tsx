import { Badge, BlockcertPackageCertificate, BlockcertsV3, CertificateAnchor, IssuerData, MerkleProof, RecipientData } from '@/types/blockcerts';

declare global {
    interface Window {
        ethereum?: unknown;
    }
}

export const generateBlockcertsV3 = (recipient: RecipientData, issuer: IssuerData, badge: Badge): BlockcertsV3 => {
    const blockcert: BlockcertsV3 = {
        "@context": [
            "https://www.w3.org/2018/credentials/v1",
            "https://w3id.org/blockcerts/v3"
        ],
        id: `urn:uuid:${crypto.randomUUID()}`,
        type: ["VerifiableCredential", "BlockcertsCredential"],
        recipient: {
            id: `mailto:${recipient.email}`,
            name: recipient.name,
            email: recipient.email,
        },
        issuer: {
            id: recipient.issuerId,
            name: issuer.name,
            email: issuer.email,
            url: issuer.url,
            publicKey: [
                {
                    id: issuer.ethPubKey,
                    type: "StarknetAddress",
                    created: new Date().toISOString(),
                },
            ],
        },
        issuanceDate: recipient.issuedOn,
        credentialSubject: {
            id: `mailto:${recipient.email}`,
            name: recipient.name,
        },
        badge,
        evidence: [
            {
                type: "DocumentVerification",
                description: "Verified by Mensis Issuer",
            },
        ],
    };

    return blockcert;
}

export const generateBlockcertsV3Batch = (recipients: RecipientData[], issuer: IssuerData, badge: Badge): BlockcertsV3[] => {
    return recipients.map((recipient) => {
        return generateBlockcertsV3(recipient, issuer, badge);
    });
}

export const generateBlockcertSinglePackage = (certificate: BlockcertsV3, txHash?: string): BlockcertPackageCertificate => {
    const result: BlockcertPackageCertificate = {
        certificate: certificate,
        anchors: []
    };
    const anchor: CertificateAnchor =
    {
        type: "ETHData",
        chain: "starknet",
        network: "sepolia",
        sourceId: "0x0699e94c1c3f33d0c9aba6d0897771ff13fc5c06f8293c96012238f83cec0273",
        transactionId: txHash
    };

    if (txHash) result.anchors = [anchor];

    return result;
}

export const generateBlockcertPackagesForBatch = (certificates: BlockcertsV3[], merkleRoot: string, proofs: MerkleProof[], txHash?: string): BlockcertPackageCertificate[] => {
    return certificates.map((cert, i) => {
        const { proof, targetHash } = proofs[i];
        const anchor: CertificateAnchor =
        {
            type: "ETHData",
            chain: "ethereum",
            network: "sepolia",
            sourceId: "0x8267cf9254734c6eb452a7bb9aaf97b392258b21",
            transactionId: txHash
        };

        const result: BlockcertPackageCertificate = {
            certificate: cert,
            merkleRoot,
            targetHash,
            proof,
            anchors: []
        };
        if (txHash) result.anchors = [anchor];

        return result
    });
}

export const mensisIssuer: IssuerData = {
    name: "Mensis",
    email: "info@mensismentor.com",
    url: "https://mensismentor.com/",
    ethPubKey: process.env.NEXT_PUBLIC_MENSIS_PUBLIC_KEY ?? ""
}
