import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { withAuth } from '@/utils/api-middleware'
import { NFT } from '@/types/nft';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_API_KEY!
);

// GET - Obtener todas las sesiones de un usuario
export const GET = (request: Request) => withAuth(request, async (req, user) => {
  try {
    const { data, error } = await supabase
      .from('certificates')
      .select(`
        id,
        nft_id,
        nft_metadata,
        image,
        nft_transaction
      `)
      .eq('user_id', user.sub)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const nfts: NFT[] = data.map((nft) => ({ certificateId: nft.id, ...nft }));

    return NextResponse.json(nfts);
  } catch (error) {
    console.error("Error obteniendo sesiones:", error);
    return NextResponse.json({ error: "Error al obtener sesiones" }, { status: 500 });
  }

});
