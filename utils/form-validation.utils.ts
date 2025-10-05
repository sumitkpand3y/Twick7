// utils/form-validation.utils.ts
import { ZodError, ZodSchema } from "zod";

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
    if (error instanceof ZodError && Array.isArray(error.issues)) {
      const fieldErrors: FieldError[] = error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
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
          field: "general",
          message: error instanceof Error ? error.message : "Validation failed",
        },
      ],
    };
  }
}

// New function for real-time field validation
export function validateField(
  schema: ZodSchema,
  fieldName: string,
  value: any
): string | null {
  try {
    // Create a partial validation for just this field
    const fieldSchema = schema.pick({ [fieldName]: true });
    fieldSchema.parse({ [fieldName]: value });
    return null; // No error
  } catch (error) {
    if (error instanceof ZodError && Array.isArray(error.issues)) {
      const fieldError = error.issues.find(
        (issue) => issue.path[0] === fieldName
      );
      return fieldError?.message || null;
    }
    return null;
  }
}

export function getFieldError(
  errors: FieldError[],
  fieldName: string
): string | undefined {
  if (!Array.isArray(errors)) return undefined;
  return errors.find((err) => err.field === fieldName)?.message;
}

export function hasFieldError(
  errors: FieldError[],
  fieldName: string
): boolean {
  if (!Array.isArray(errors)) return false;
  return errors.some((err) => err.field === fieldName);
}
