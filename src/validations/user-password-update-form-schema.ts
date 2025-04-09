import * as z from 'zod';

export const userUpdatePasswordFormSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, { message: 'La contraseña debe tener mínimo 8 caracteres' }),

    newPassword: z
      .string()
      .min(8, { message: 'La contraseña debe tener mínimo 8 caracteres' }),

    newPasswordConfirm: z
      .string()
      .min(8, { message: 'La contraseña debe tener mínimo 8 caracteres' })
      .optional(),
  })
  .refine(
    (data) => {
      return data.newPassword === data.newPasswordConfirm;
    },
    {
      message: 'Las contraseñas no coinciden.',
      path: ['newPasswordConfirm'],
    }
  );
