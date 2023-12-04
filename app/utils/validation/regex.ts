import { z } from "zod";

const urlRegexPattern = /^(?![\s\S]*https?:\/\/)[\s\S]*$/;
const urlRegex = new RegExp(urlRegexPattern);

export const regex: Record<string, RegExp> = {
  number: /\d/,
  specialCharacter: /[!@#$%^&*(),.?":{}|<>]/,
  url: urlRegex,
};

export const regexValidator = (
  regexValidator: RegExp,
  errorMessage: string
): Record<string, z.ZodTypeAny> => {
  return {
    match: z.string().refine((value: string) => {
      return regexValidator.test(value);
    }, errorMessage),
  };
};
