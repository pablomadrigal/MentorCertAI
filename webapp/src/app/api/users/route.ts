// POST GET & PUT para 
import { NextResponse } from "next/server"
import { createClient } from '@supabase/supabase-js'

// Configuración de Supabase
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_API_KEY!
)

// GET - Obtener todas las sesiones
export async function GET() {
  try {
    const { data: sessions, error: sessionError } = await supabase
      .from('session')
      .select('*')
    
    if (sessionError) {
      return NextResponse.json({ error: sessionError.message }, { status: 500 })
    }

    return NextResponse.json(sessions)
  } catch (error) {
    console.error("Error obteniendo sesiones:", error)
    return NextResponse.json({ error: "Error al obtener sesiones" }, { status: 500 })
  }
}

// POST - Crear nueva sesión
export async function POST(request: Request) {
  try {
    console.log('📝 Iniciando POST request');
    
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'El contenido debe ser application/json' },
        { status: 400 }
      );
    }

    const body = await request.json();
    console.log('📦 Body recibido:', body);
    
    // Validar campos requeridos
    if (!body.room_id || !body.theme) {
      return NextResponse.json(
        { error: 'room_id y theme son requeridos' },
        { status: 400 }
      );
    }

    const { room_id, theme } = body;

    // Crear nueva sesión
    const { data, error } = await supabase
      .from('session')
      .insert([{ room_id, theme }])
      .select()
      .single();

    if (error) {
      console.error('❌ Error de Supabase:', error);
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

    const { room_id, theme } = body;

    if (!theme) {
      return NextResponse.json(
        { error: 'Se requiere el theme para actualizar' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('session')
      .update({ theme })
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
