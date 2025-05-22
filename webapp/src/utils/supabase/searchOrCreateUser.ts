import { CreateUserIfNotExistsProps } from '@/types/user';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROL!, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
    }
);

export async function getIdOrCreateUserByEmail({ mentorId, newUserEmail }: CreateUserIfNotExistsProps) {
  // Verificar si el mentor tiene el rol correcto
  const { data: mentorProfile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', mentorId)
    .single();

  if (profileError || mentorProfile.role !== 'mentor') {
    throw new Error('Unauthorized');
  }
  const { data: oldUserId, error: oldUserError } = await supabase.rpc(
    "get_user_id_by_email",
    {
      email: newUserEmail,
    }
  );
  if (oldUserError) throw oldUserError;

  if (oldUserId) {
    return { user: oldUserId, created: false };
  }

  // Crear nuevo usuario
  const { data: newUser, error: createError }  = await supabase.auth.admin.inviteUserByEmail(newUserEmail)

  if (createError) throw createError;

  return { user: newUser.user.id, created: true };
}
