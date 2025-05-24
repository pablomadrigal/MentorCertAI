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

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date)
}

export function getRandomUUID() {
  return crypto.randomUUID();
}

export const splitString = (str: string): string[] => {
  const chunks: string[] = [];
  for (let i = 0; i < str.length; i += 20) {
    chunks.push(str.slice(i, i + 20));
  }
  return chunks;
};