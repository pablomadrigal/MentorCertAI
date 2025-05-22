import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';
import { NFTMetadata } from "@/types/nft";

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

    if (!nft_id) {
      return NextResponse.json(
        { error: 'Se requiere el nft_id' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('certificates')
      .select('nft_metadata')
      .eq('nft_id', nft_id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json(
        { error: 'NFT no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(data.nft_metadata);
  } catch (error) {
    console.error("Error obteniendo NFT:", error);
    return NextResponse.json(
      { error: "Error al obtener el NFT" },
      { status: 500 }
    );
  }
}

// POST - Crear nuevo NFT
export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'El contenido debe ser application/json' },
        { status: 400 }
      );
    }

    const body = await request.json();
    
    // Validar campos requeridos
    if (!body.nft_id || !body.nft_metadata) {
      return NextResponse.json(
        { error: 'nft_id y nft_metadata son requeridos' },
        { status: 400 }
      );
    }

    const { nft_id, nft_metadata, image } = body;

    // Crear nuevo NFT
    const { data, error } = await supabase
      .from('certificates')
      .insert([{
        nft_id,
        nft_metadata,
        image
      }])
      .select()
      .single();

    if (error) {
      console.error('❌ Error de Supabase:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: 'NFT creado exitosamente',
      data
    });

  } catch (error) {
    console.error("Error crítico:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}

// PUT - Actualizar NFT
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'El contenido debe ser application/json' },
        { status: 400 }
      );
    }

    const { id: nft_id } = await params;
    const body = await request.json();

    // Construir objeto de actualización
    const updateData: {nft_metadata?: NFTMetadata, image?: string} = {};
    if (body.nft_metadata !== undefined) updateData.nft_metadata = body.nft_metadata;
    if (body.image !== undefined) updateData.image = body.image;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'Se requiere al menos nft_metadata o image para actualizar' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('certificates')
      .update(updateData)
      .eq('nft_id', nft_id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: 'NFT actualizado exitosamente',
      data
    });
  } catch (error) {
    console.error("Error crítico actualizando:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud de actualización" },
      { status: 500 }
    );
  }
}