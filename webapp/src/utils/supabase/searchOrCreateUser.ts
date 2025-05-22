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

export async function getUserByEmail({ mentorId, newUserEmail }: CreateUserIfNotExistsProps) {
  // Verificar si el mentor tiene el rol correcto
  const { data: mentorProfile, error: profileError } = await supabase.auth.admin.getUserById(mentorId)

  if (profileError || mentorProfile.user.user_metadata.role !== 'mentor') {
    throw new Error('Unauthorized');
  }
  const { data, error: oldUserError } = await supabase.rpc('get_user_by_email', {
    user_email: newUserEmail,
  });
  
  if (oldUserError) {
    console.error(oldUserError);
    throw oldUserError;
  } else if (data.length > 0) {
    return { user: data[0].id, created: false };
  }

  // Crear nuevo usuario
  const { data: newUser, error: createError }  = await supabase.auth.admin.inviteUserByEmail(newUserEmail)

  if (createError) throw createError;

  return { user: newUser.user.id, created: true };
}
