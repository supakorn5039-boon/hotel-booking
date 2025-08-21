import type React from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type InputFormProps = React.HTMLAttributes<HTMLDivElement> & {
   type: 'email' | 'password' | 'text' | 'number';
   error?: FieldError;
   register: UseFormRegisterReturn;
   icon?: React.ReactNode;
   label?: string;
   name?: string;
   placeholder?: string;
};

export default function InputForm({
   className,
   error,
   register,
   icon,
   type,
   name,
   label,
   placeholder,
   ...rest
}: InputFormProps): React.ReactElement {
   return (
      <div className={`relative ${className}`}>
         <Label htmlFor={name} className="text-gray-700 font-medium">
            {label}
         </Label>
         <Input id={name} type={type} placeholder={placeholder} {...register} {...rest} className="mt-1 pl-10" />
         {icon}
         {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
      </div>
   );
}
