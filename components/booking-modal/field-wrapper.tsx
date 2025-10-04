import { ReactNode } from 'react';
import { FormError } from '@/components/ui/form-error';
import { Label } from '@/components/ui/label';

interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export function FieldWrapper({
  label,
  htmlFor,
  error,
  required = false,
  children,
  className = '',
}: FieldWrapperProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      <Label htmlFor={htmlFor}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {children}
      {error && <FormError message={error} className="text-xs mt-1" />}
    </div>
  );
}
