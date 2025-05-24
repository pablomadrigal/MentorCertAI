import { withAuth } from "@/utils/api-middleware"
import { deployWithPaymaster, generatePrivateKeyEncrypted } from "@/utils/starknet-wallet"
import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const pk_pw = process.env.PASSWORD_PK ?? ""
const paymasterUrl = process.env.ANVU_URL ?? ""
const paymasterApiKey = process.env.AVNU_PAYMASTER_API_KEY ?? ""

export const GET = (request: Request) => withAuth(request, async (req, user) => {
  try {
    if (user.user_metadata?.public_key) {
      return NextResponse.json({
        error: 'Wallet already deployed'
      });
    }

    const privateKey = generatePrivateKeyEncrypted(pk_pw);
    const address = await deployWithPaymaster(privateKey, pk_pw, paymasterUrl, paymasterApiKey);

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROL!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    if (!user?.sub || typeof user.sub !== 'string') {
      return NextResponse.json({
        error: 'Invalid user ID'
      }, { status: 400 });
    }

    const { data, error } = await supabase.auth.admin.updateUserById(
      user.sub,
      { user_metadata: { private_key: privateKey, public_key: address.contractAddress } }
    );

    if (error) {
      return NextResponse.json({
        error: 'Failed to update user data',
        details: error.message
      }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({
        error: 'User not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      publicAddress: address.contractAddress,
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to deploy wallet',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
});