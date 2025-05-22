import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_API_KEY!
);

// GET - Obtener todos los certificados o filtrar por usuario
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');

    let query = supabase.from('certificates').select('*');

    if (user_id) {
      query = query.eq('user_id', user_id);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error obteniendo certificados:", error);
    return NextResponse.json(
      { error: "Error al obtener certificados" },
      { status: 500 }
    );
  }
}

// POST - Crear nuevo certificado
export async function POST(request: Request) {
  try {
    console.log('Iniciando solicitud POST');

    const contentType = request.headers.get('content-type');
    console.log('Content-Type recibido:', contentType);

    if (!contentType || !contentType.includes('application/json')) {
      console.log('Error: Content-Type inválido');
      return NextResponse.json(
        { error: 'El contenido debe ser application/json' },
        { status: 400 }
      );
    }

    const body = await request.json();
    console.log('Body recibido:', JSON.stringify(body, null, 2));

    if (!body.user_id || !body.nft_id) {
      console.log('Error: Faltan campos requeridos', { user_id: body.user_id, nft_id: body.nft_id });
      return NextResponse.json(
        { error: 'user_id y nft_id son requeridos' },
        { status: 400 }
      );
    }

    const {
      nft_id,
      nft_metadata,
      image,
      user_id,
      date = new Date(),
      score,
      session_id,
      theme,
      nft_transaction
    } = body;

    console.log('Datos procesados:', {
      nft_id,
      user_id,
      date,
      score,
      session_id,
      theme
    });

    console.log('Intentando insertar en Supabase...');
    const { data, error } = await supabase
      .from('certificates')
      .insert([{
        nft_id,
        nft_metadata,
        image,
        user_id,
        date,
        score,
        session_id,
        theme,
        nft_transaction
      }])
      .select()
      .single();

    if (error) {
      console.error('Error de Supabase:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Certificado creado exitosamente:', data);
    return NextResponse.json({
      message: 'Certificado creado exitosamente',
      data
    });
  } catch (error) {
    console.error("Error crítico completo:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}

// PUT - Actualizar certificado
export async function PUT(request: Request) {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'El contenido debe ser application/json' },
        { status: 400 }
      );
    }

    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { error: 'Se requiere el id para actualizar' },
        { status: 400 }
      );
    }

    const {
      id,
      nft_id,
      nft_metadata,
      image,
      date,
      score,
      theme,
      nft_transaction
    } = body;

    const updateData: any = {};
    if (nft_id !== undefined) updateData.nft_id = nft_id;
    if (nft_metadata !== undefined) updateData.nft_metadata = nft_metadata;
    if (image !== undefined) updateData.image = image;
    if (date !== undefined) updateData.date = date;
    if (score !== undefined) updateData.score = score;
    if (theme !== undefined) updateData.theme = theme;
    if (nft_transaction !== undefined) updateData.nft_transaction = nft_transaction;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'Se requiere al menos un campo para actualizar' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('certificates')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Certificado actualizado exitosamente',
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

// DELETE - Eliminar certificado
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Se requiere el id para eliminar' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('certificates')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Certificado eliminado exitosamente'
    });
  } catch (error) {
    console.error("Error crítico eliminando:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud de eliminación" },
      { status: 500 }
    );
  }
}