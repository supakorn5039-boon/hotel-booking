import type { CustomerReviewsProps } from '@/types/CustomerReviews';
import type React from 'react';
import { useFormContext } from 'react-hook-form';
import InputForm from './InputForm';

export default function ReviewForm(): React.ReactElement {
   const {
      register,
      formState: { errors },
   } = useFormContext<CustomerReviewsProps>();
   return (
      <div className="space-y-4">
         <InputForm<CustomerReviewsProps>
            type="text"
            label="Name"
            name="name"
            placeholder="User Name"
            register={register}
            error={errors.name}
            required
         />
         <InputForm<CustomerReviewsProps>
            type="text"
            label="Description"
            name="text"
            placeholder="Description"
            register={register}
            error={errors.text}
            required
         />
      </div>
   );
}
