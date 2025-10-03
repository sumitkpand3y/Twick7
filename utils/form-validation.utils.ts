import { ZodError, ZodSchema } from 'zod';

export interface FieldError {
  field: string;
  message: string;
}

export interface ValidationResult {
  success: boolean;
  errors: FieldError[];
  data?: any;
}

export function validateStep(schema: ZodSchema, data: any): ValidationResult {
  try {
    const validatedData = schema.parse(data);
    return {
      success: true,
      errors: [],
      data: validatedData,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErrors: FieldError[] = error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      return {
        success: false,
        errors: fieldErrors,
      };
    }

    return {
      success: false,
      errors: [
        {
          field: 'general',
          message: 'Validation failed',
        },
      ],
    };
  }
}

export function getFieldError(errors: FieldError[], fieldName: string): string | undefined {
  const error = errors.find((err) => err.field === fieldName);
  return error?.message;
}

export function hasFieldError(errors: FieldError[], fieldName: string): boolean {
  return errors.some((err) => err.field === fieldName);
}
