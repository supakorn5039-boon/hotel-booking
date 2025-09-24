import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type React from 'react';
import type { FieldError, FieldValues, Path, UseFormRegister, UseFormSetValue, UseFormTrigger } from 'react-hook-form';

type InputFormProps<T extends FieldValues> = React.HTMLAttributes<HTMLDivElement> & {
   type: React.HTMLInputTypeAttribute;
   error?: FieldError;
   register: UseFormRegister<T>;
   icon?: React.ReactNode;
   label?: string;
   name: Path<T>;
   placeholder?: string;
   setValue?: UseFormSetValue<T>;
   trigger?: UseFormTrigger<T>;
   required?: boolean;
};

export default function InputForm<T extends FieldValues>({
   className,
   error,
   register,
   icon,
   type,
   name,
   label,
   placeholder,
   setValue,
   trigger,
   required,
   ...rest
}: InputFormProps<T>): React.ReactElement {
   return (
      <div className={`relative ${className}`}>
         {label && (
            <Label htmlFor={name} className="text-gray-700 font-medium">
               {label}
               {required && (
                  <span className="text-red-500" aria-hidden="true">
                     *
                  </span>
               )}
            </Label>
         )}
         <Input
            id={name}
            type={type}
            placeholder={placeholder}
            {...register(name, type === 'number' ? { valueAsNumber: true } : {})}
            {...rest}
            className={`mt-1 transition-colors duration-200 ${icon ? 'pl-10' : ''}`}
            aria-required={required}
            aria-invalid={!!error}
            onChange={e => {
               const value = type === 'number' ? Number(e.target.value) : e.target.value;
               setValue?.(name, value as T[Path<T>]);
               trigger?.(name);
            }}
         />
         {icon}
         {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
      </div>
   );
}
