import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';
import { withAuth } from "@/utils/api-middleware";

// Configuración de Supabase
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_API_KEY!
);

export const GET = (
  request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) => withAuth(request, async () => {
  try {
    const { sessionId } = await params;
    console.log('Fetching certificate for sessionId:', sessionId);

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Se requiere el sessionId' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('session_id', sessionId)
      .order('date', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json(
        { error: 'NFT no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ ...data.nft_metadata, image: data.image ?? `${process.env.MENTOR_CERT_AI_URL}/data-science-certificate.png`, ...data });
  } catch (error) {
    console.error("Error obteniendo NFT:", error);
    if (error instanceof Error) {
      console.error('Error details:', error.message, error.stack);
    }
    return NextResponse.json(
      { error: "Error al obtener el NFT" },
      { status: 500 }
    );
  }
})
