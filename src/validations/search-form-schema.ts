import * as z from 'zod';

export const searchFormSchema = z.object({
  query: z
    .string()
    .min(1, { message: 'El campo debe contener al menos 1 carácter.' })
    .max(20, { message: 'El campo debe contener máximo 20 caracteres' }),

  page: z.string(),
  perPage: z.string(),
});
