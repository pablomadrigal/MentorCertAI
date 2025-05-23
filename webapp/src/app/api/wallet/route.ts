import { withAuth } from "@/utils/api-middleware"
import { deployWithPaymaster } from "@/utils/starknet-wallet"
import { NextResponse } from "next/server"

const pk_pw = process.env.NEXT_PUBLIC_PASSWORD_PK ?? ""
const paymasterUrl = process.env.ANVU_URL ?? ""
const paymasterApiKey = process.env.AVNU_PAYMASTER_API_KEY ?? ""

export const GET = (request: Request) => withAuth(request, async (req, user) => {
  const address = await deployWithPaymaster(user.user_metadata?.private_key ?? "", pk_pw, paymasterUrl, paymasterApiKey)
  return NextResponse.json({ address: address })
})