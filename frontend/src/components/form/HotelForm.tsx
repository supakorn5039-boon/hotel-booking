import type { HotelProps } from '@/types/Hotel';
import { useFormContext } from 'react-hook-form';
import InputForm from './InputForm';

export default function HotelForm() {
   const {
      register,
      formState: { errors },
   } = useFormContext<HotelProps>();

   return (
      <div className="space-y-4">
         <InputForm<HotelProps>
            type="text"
            label="Name"
            name="name"
            placeholder="Hotel Name"
            register={register}
            error={errors.name}
            required
         />
         <InputForm<HotelProps>
            type="text"
            label="Description"
            name="description"
            placeholder="Description"
            register={register}
            error={errors.description}
            required
         />

         <InputForm<HotelProps>
            type="number"
            label="Price"
            name="price"
            placeholder="Price"
            register={register}
            error={errors.price}
            required
         />

         <InputForm<HotelProps>
            type="text"
            label="Image Url"
            name="image"
            placeholder="Image Url"
            register={register}
            error={errors.image}
            required
         />

         <InputForm<HotelProps>
            type="number"
            label="People"
            name="people"
            placeholder="People Count"
            register={register}
            error={errors.people}
            required
         />
      </div>
   );
}
