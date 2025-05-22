import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { withAuth } from '@/utils/api-middleware'
import { ApiSession } from "@/types/session";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_API_KEY!
);

// GET - Obtener todas las sesiones de un usuario
export const GET = (request: Request) => withAuth(request, async (req, user) => {
  console.log("user", user)
  try {
    const { data, error } = await supabase
      .from('session')
      .select('*')
      .eq('owner_id', user.sub);
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error obteniendo sesiones:", error);
    return NextResponse.json({ error: "Error al obtener sesiones" }, { status: 500 });
  }
});

// POST - Crear nueva sesión
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
    if (!body.room_id || !body.theme) {
      return NextResponse.json(
        { error: 'room_id y theme son requeridos' },
        { status: 400 }
      );
    }

    const { room_id, theme, transcription = null, owner_id } = body;

    const { data, error } = await supabase
      .from('session')
      .insert([{ 
        room_id, 
        theme,
        transcription,
        owner_id 
      }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Sesión creada exitosamente',
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

// PUT - Actualizar sesión
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
    
    if (!body.room_id) {
      return NextResponse.json(
        { error: 'Se requiere el room_id para actualizar' },
        { status: 400 }
      );
    }

    const { room_id, theme, transcription, owner_id } = body;

    // Construir objeto de actualización
    const updateData: ApiSession = {
        room_id,
        theme,
        transcription,
        owner_id
    };


    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'Se requiere al menos un campo para actualizar' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('session')
      .update(updateData)
      .eq('room_id', room_id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Sesión actualizada exitosamente',
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