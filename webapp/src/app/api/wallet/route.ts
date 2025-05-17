import { deployWithPaymaster, generatePrivateKeyEncrypted } from "@/lib/createWallet"
import { NextResponse } from "next/server"

const pk_pw=process.env.NEXT_PUBLIC_PASSWORD_PK ?? ""
const rpcUrl = process.env.RPC_URL ?? ""
const paymasterUrl = process.env.ANVU_URL ?? ""
const paymasterApiKey = process.env.AVNU_PAYMASTER_API_KEY ?? ""

export async function GET() {
  const privateKey = generatePrivateKeyEncrypted(pk_pw)
  deployWithPaymaster(privateKey, pk_pw, paymasterUrl, paymasterApiKey, rpcUrl)
  return NextResponse.json({})
}
