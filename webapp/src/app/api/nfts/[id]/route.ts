import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_API_KEY!
);

// GET - Obtener NFT por ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: nft_id } = await params;
    console.log("Fetching NFT with ID:", nft_id);

    if (!nft_id) {
      return NextResponse.json(
        { error: 'Se requiere el nft_id' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('certificates')
      .select('nft_metadata, image')
      .eq('nft_id', nft_id)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      console.log("No NFT found for ID:", nft_id);
      return NextResponse.json(
        { error: 'NFT no encontrado' },
        { status: 404 }
      );
    }

    console.log("NFT data found:", {
      hasMetadata: !!data.nft_metadata,
      hasImage: !!data.image,
      imageType: data.image?.substring(0, 20) // Log first 20 chars of image
    });

    // Format metadata for Voyager
    const metadata = {
      name: data.nft_metadata?.name || `Certificate #${nft_id}`,
      description: data.nft_metadata?.description || "Certificate of completion",
      image: data.image?.startsWith('data:image')
        ? `${process.env.MENTOR_CERT_AI_URL}/api/nfts/${nft_id}/image`
        : (data.image ?? `${process.env.MENTOR_CERT_AI_URL}/data-science-certificate.png`),
      attributes: data.nft_metadata?.attributes || []
    };

    return NextResponse.json(metadata);
  } catch (error) {
    console.error("Error obteniendo NFT:", error);
    return NextResponse.json(
      { error: "Error al obtener el NFT", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}