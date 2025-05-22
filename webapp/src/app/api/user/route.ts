import { NextResponse } from "next/server"
import { createClient } from '@supabase/supabase-js'
import { getUserByEmail } from "@/utils/supabase/searchOrCreateUser"
import { withAuth } from "@/utils/api-middleware";

// Configuración de Supabase
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_API_KEY!
)

export const GET = (request: Request) => withAuth(request, async (req, user) => {
  const url = new URL(req.url);
  const email = url.searchParams.get('email');
  try {
    const data = await getUserByEmail({ mentorId: user?.sub as string, newUserEmail: email as string })
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error obteniendo sesiones:", error);
    return NextResponse.json({ error: "Error al obtener sesiones" }, { status: 500 });
  }
});

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type');

    if (!contentType || !contentType.includes('application/json')) {
      console.error('Error: Content-Type inválido');
      return NextResponse.json(
        { error: 'El contenido debe ser application/json' },
        { status: 400 }
      );
    }

    const body = await request.json();

    if (!body.email || !body.lastname || !body.name) {
      console.error('Error: Campos requeridos faltantes');
      return NextResponse.json(
        { error: 'email, lastname y name son requeridos' },
        { status: 400 }
      );
    }

    const { email, lastname, name, isProfesor = false } = body;

    const { data, error } = await supabase
      .from('users')
      .insert([{ email, lastname, name, isProfesor }])
      .select()
      .single();

    if (error) {
      console.error('Error de Supabase:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Estudiante creado exitosamente',
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
