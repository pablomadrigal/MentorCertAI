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
    console.log('📝 Iniciando POST request para crear estudiante');
    
    // Verificar el Content-Type
    const contentType = request.headers.get('content-type');
    console.log('📨 Content-Type recibido:', contentType);
    
    if (!contentType || !contentType.includes('application/json')) {
      console.log('❌ Error: Content-Type inválido');
      return NextResponse.json(
        { error: 'El contenido debe ser application/json' },
        { status: 400 }
      );
    }

    const body = await request.json();
    console.log('📦 Body recibido:', body);
    
    // Validar que los campos requeridos existan
    if (!body.email || !body.name) {
      console.log('❌ Error: Campos requeridos faltantes');
      return NextResponse.json(
        { error: 'Email y nombre son requeridos' },
        { status: 400 }
      );
    }

    const { email, lastname, name, isProfesor } = body;
    console.log('📋 Datos extraídos:', { email, lastname, name, isProfesor });

    // Insertar nuevo estudiante en Supabase
    console.log('🔄 Intentando insertar en Supabase...');
    const { data, error } = await supabase
      .from('person')
      .insert([
        {
          name,
          email,
          lastname,
          isProfesor
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('❌ Error de Supabase:', error);
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('✅ Estudiante creado exitosamente:', data);
    return NextResponse.json(data)
  } catch (error) {
    console.error("❌ Error crítico creando estudiante:", error);
    console.error("Stack trace:", error instanceof Error ? error.stack : 'No stack trace disponible');
    return NextResponse.json(
      { error: "Error al procesar la solicitud. Asegúrate de enviar un JSON válido" },
      { status: 400 }
    );
  }
}
