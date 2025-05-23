import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { withAuth } from '@/utils/api-middleware'
import { Session } from "@/types/session";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_API_KEY!
);

// GET - Obtener todas las sesiones de un mentor
export const GET = (request: Request) => withAuth(request, async (req, user) => {
  if(user?.user_metadata?.role == "mentor"){
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
  } else {
    try {
      const { data, error } = await supabase
      .from('user_at_session')
      .select(`
        room_id,
        exam,
        score,
        user_id,
        session:room_id (
          room_id,
          theme,
          transcription,
          owner_id,
          date_time
        )
      `)
      .eq('user_id', user.sub)

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      const sessions = data.map((item) => ({...item.session, ...item}));

      return NextResponse.json(sessions);
    } catch (error) {
      console.error("Error obteniendo sesiones:", error);
      return NextResponse.json({ error: "Error al obtener sesiones" }, { status: 500 });
    }
  }
});

// POST - Crear nueva sesión
export const POST = (request: Request) => withAuth(request, async (req, user) => {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'El contenido debe ser application/json' },
        { status: 400 }
      );
    }

    const body: Session = await request.json();
    
    // Validar campos requeridos
    if (!body.room_id || !body.theme) {
      return NextResponse.json(
        { error: 'room_id y theme son requeridos' },
        { status: 400 }
      );
    }

    const { room_id, theme, transcription, date_time } = body;

    const { data, error } = await supabase
      .from('session')
      .insert([{ 
        room_id, 
        theme,
        transcription,
        owner_id: user.sub,
        date_time: date_time
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
});

// PUT - Actualizar la fecha de la sesión
export const PUT = (request: Request) => withAuth(request, async (req, user) => {
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

    const { room_id, date_time } = body;

    const { data, error } = await supabase
      .from('session')
      .update({
        date_time
      })
      .eq('room_id', room_id)
      .eq('owner_id', user.sub)
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
});