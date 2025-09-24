import type { HotelProps } from '@/types/Hotel';
import * as z from 'zod';

export const hotelSchema = z.object({
   id: z.number(),
   name: z.string(),
   description: z.string(),
   image: z.string(),
   price: z.number(),
   rating: z.number(),
   people: z.number(),
});

export const HotelDefaultValues: HotelProps = {
   id: 0,
   name: '',
   description: '',
   image: '',
   price: 0,
   rating: 5,
   people: 0,
};
