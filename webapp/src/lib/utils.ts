import { type ClassValue, clsx } from "clsx"
import { Signature } from "starknet";
import { toBeHex } from "ethers";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
} 

export const convertSignedMessage = (signedMessage: Signature) => {
  if (Array.isArray(signedMessage)) {
    return signedMessage.map((sig) => toBeHex(BigInt(sig)));
  } else if (signedMessage.r && signedMessage.s) {
    return [toBeHex(BigInt(signedMessage.r)), toBeHex(BigInt(signedMessage.s))];
  }
  return signedMessage;
}