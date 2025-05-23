// merkleTree.js
import { MerkleTree } from "merkletreejs";
import crypto from "crypto";
import { BlockcertsV3, MerkleProof, MerkleTreeData } from "@/types/blockcerts";
import { keccak256 } from "ethers";

// Normaliza el JSON para que el hash sea consistente
const normalizeJson = (obj: object) => {
  return JSON.stringify(obj, Object.keys(obj).sort());
};

// Hashea un certificado (usando SHA-256 o Keccak-256 si prefieres Ethereum)
const hashCertificate = (certJson: object): Buffer => {
  const normalized = normalizeJson(certJson);
  return crypto.createHash("sha256").update(normalized).digest();
};

// Construye el árbol y devuelve la raíz y pruebas
export const buildMerkleTree = (certificates: BlockcertsV3[]): MerkleTreeData => {
  const hashes: Buffer[] = certificates.map(cert => hashCertificate(cert));
  const tree = new MerkleTree(hashes, keccak256, { sortPairs: true });

  const merkleRoot = tree.getHexRoot();

  const proofs: MerkleProof[] = hashes.map((leaf, index) => {
    const proof = tree.getHexProof(leaf);
    return {
      index,
      proof,
      targetHash: "0x" + leaf.toString("hex"),
    };
  });

  return {
    merkleRoot,
    proofs,
  };
};
