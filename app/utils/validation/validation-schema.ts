import { z } from "zod";

import { ValidationError } from "./validation-error";
import { regex } from "./regex";

export const validationSchema: Record<
  string,
  z.ZodString | z.ZodEffects<z.ZodString>
> = {
  specialCharacter: z
    .string()
    .refine((value) => regex.specialCharacter.test(value)),
  nonempty: z.string().nonempty(ValidationError.Empty),
  noNumber: z
    .string()
    .refine((value) => !regex.number.test(value), ValidationError.NoNumber),
  noSpecialCharacter: z
    .string()
    .refine(
      (value) => !regex.specialCharacter.test(value),
      ValidationError.NoSpecialCharacter
    ),
  hasUrl: z
    .string()
    .refine((value) => !regex.url.test(value), ValidationError.HasUrl),
};
