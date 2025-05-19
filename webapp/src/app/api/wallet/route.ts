import { deployWithPaymaster, generatePrivateKeyEncrypted } from "@/lib/createWallet"
import { NextResponse } from "next/server"

const pk_pw=process.env.NEXT_PUBLIC_PASSWORD_PK ?? ""
const paymasterUrl = process.env.ANVU_URL ?? ""
const paymasterApiKey = process.env.AVNU_PAYMASTER_API_KEY ?? ""

export async function GET() {
  const privateKey = generatePrivateKeyEncrypted(pk_pw)
  const address = await deployWithPaymaster(privateKey, pk_pw, paymasterUrl, paymasterApiKey)
  return NextResponse.json({address: address})
}
