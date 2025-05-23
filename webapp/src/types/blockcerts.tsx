
export interface PublicKeyEntry {
    id: string; // Dirección Ethereum del emisor
    type: "EthereumAddress" | "StarknetAddress";
    created: string; // ISO date string
}

export interface Issuer {
    id: string; // Dirección Ethereum
    name: string;
    email: string;
    url: string;
    publicKey: PublicKeyEntry[];
}

export interface Recipient {
    id: string; // Dirección Ethereum
    name: string;
    email: string;
}

export interface CredentialSubject {
    id: string; // Ej: mailto:nombre@email.com
    name: string;
}

export interface Criteria {
    narrative: string;
}

export interface Badge {
    id: string; // URL al badge o identificador único
    name: string;
    description: string;
    criteria: Criteria;
    issuer: string; // Dirección Ethereum del emisor
}

export interface Evidence {
    type: string; // Ej: "DocumentVerification"
    description: string;
}

export interface BlockcertsV3 {
    "@context": string[];
    id: string; // URN con UUID
    type: ["VerifiableCredential", "BlockcertsCredential"];
    recipient: Recipient;
    issuer: Issuer;
    issuanceDate: string;
    credentialSubject: CredentialSubject;
    badge: Badge;
    evidence?: Evidence[];
}

export interface IssuerData { name: string, email: string, url: string, ethPubKey: string }

export interface RecipientData {
    name: string;
    email: string;
    issuedOn: string;
    course: string;
    issuerId: string;
}

export interface MerkleProof {
    index: number;
    proof: string[];
    targetHash: string;
}

export interface MerkleTreeData {
    merkleRoot: string;
    proofs: MerkleProof[];
}

export interface CertificateAnchor {
    type: string,
    chain: "ethereum" | "bitcoin" | "starknet",
    network: "sepolia" | "mainnet",
    sourceId: string,
    transactionId?: string
}

export interface CertificateSignature {
    type: string,
    creator: string,
    signatureValue: string,
}

export interface BlockcertPackageCertificate {
    certificate: BlockcertsV3,
    merkleRoot?: string,
    targetHash?: string,
    proof?: string[];
    anchors?: CertificateAnchor[]
    signature?: CertificateSignature,
}