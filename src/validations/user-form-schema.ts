import * as z from 'zod';

import { UserRole } from '@/enums/user-role.enum';

export const userFormSchema = z
  .object({
    firstNames: z
      .string()
      .min(1, { message: 'El campo debe contener al menos 1 carácter.' })
      .max(40, { message: 'El campo debe contener máximo 40 caracteres' }),

    lastNames: z
      .string()
      .min(1, { message: 'El campo debe contener al menos 1 carácter.' })
      .max(40, { message: 'El campo debe contener máximo 40 caracteres' }),

    email: z.string().email({ message: 'E-mail invalido.' }),

    password: z
      .string()
      .min(8, { message: 'El campo debe contener al menos 8 carácter.' })
      .optional(),

    passwordConfirm: z
      .string()
      .min(8, { message: 'El campo debe contener al menos 8 carácter.' })
      .optional(),

    roles: z
      .array(z.nativeEnum(UserRole), {
        required_error: 'Debes seleccionar al menos un rol',
      })
      .refine((value) => value.some((item) => item), {
        message: 'Debes seleccionar al menos un rol',
      }),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: 'Las contraseñas no coinciden.',
      path: ['passwordConfirm'],
    }
  );
