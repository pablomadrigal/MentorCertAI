import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';
import { withAuth } from '@/utils/api-middleware'
import { getUserByEmail } from "@/utils/supabase/searchOrCreateUser";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROL!  // Cambiar a service role
);

// GET - Obtener usuarios en sesión
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const room_id = searchParams.get('room_id');
    const user_id = searchParams.get('user_id');

    let query = supabase.from('user_at_session').select('*');

    if (room_id) {
      query = query.eq('room_id', room_id);
    }
    if (user_id) {
      query = query.eq('user_id', user_id);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error obteniendo usuarios en sesión:", error);
    return NextResponse.json(
      { error: "Error al obtener usuarios en sesión" },
      { status: 500 }
    );
  }
}

// POST - Agregar usuario a sesión
export const POST = (request: Request) => withAuth(request, async (req, user) => {
  try {
    const contentType = req.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'El contenido debe ser application/json' },
        { status: 400 }
      );
    }

    const body = await req.json();

    if (!body.room_id) {
      return NextResponse.json(
        { error: 'room_id es requerido' },
        { status: 400 }
      );
    }

    const { room_id, userEmail } = body;

    const se = await getUserByEmail({ mentorId: user.sub as string, newUserEmail: userEmail })

    const { data, error } = await supabase
      .from('user_at_session')
      .insert([{
        room_id,
        user_id: se.user,
      }])
      .select()
      .single();

    if (error) {
      console.error('Error de Supabase:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Usuario agregado a la sesión exitosamente',
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

// PUT - Actualizar información del usuario en la sesión
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

    if (!body.room_id || !body.user_id) {
      return NextResponse.json(
        { error: 'Se requieren room_id y user_id para actualizar' },
        { status: 400 }
      );
    }

    const { room_id, user_id, exam, score } = body;

    const updateData: { exam?: string, score?: number } = {};
    if (exam !== undefined) updateData.exam = exam;
    if (score !== undefined) updateData.score = score;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'Se requiere al menos un campo para actualizar' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('user_at_session')
      .update(updateData)
      .eq('room_id', room_id)
      .eq('user_id', user_id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Información actualizada exitosamente',
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

// DELETE - Eliminar usuario de la sesión
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const room_id = searchParams.get('room_id');
    const user_id = searchParams.get('user_id');

    if (!room_id || !user_id) {
      return NextResponse.json(
        { error: 'Se requieren room_id y user_id para eliminar' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('user_at_session')
      .delete()
      .eq('room_id', room_id)
      .eq('user_id', user_id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Usuario eliminado de la sesión exitosamente'
    });
  } catch (error) {
    console.error("Error crítico eliminando:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud de eliminación" },
      { status: 500 }
    );
  }
}