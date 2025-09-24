import { ApiRoutes } from '@/constants/ApiRoutes';
import { HotelDefaultValues, hotelSchema } from '@/dto/HotelDto';
import { fetchClient } from '@/lib/axios';
import type { HotelProps } from '@/types/Hotel';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const HotelService = {
   QUERY_KEY: 'hotels',

   getHotels: async (): Promise<HotelProps[]> => {
      const res = await fetchClient.get(ApiRoutes.HOTEL);
      return res.data;
   },

   getHotelById: async (id: number): Promise<HotelProps> => {
      const res = await fetchClient.get(`${ApiRoutes.HOTEL}/${id}`);
      return res.data;
   },

   createHotel: async (data: HotelProps): Promise<HotelProps> => {
      const res = await fetchClient.post(ApiRoutes.HOTEL, data);
      return res.data;
   },

   updateHotel: async (id: number, data: HotelProps): Promise<HotelProps> => {
      const res = await fetchClient.put(`${ApiRoutes.HOTEL}/${id}`, data);
      return res.data;
   },

   deleteHotel: async (id: number): Promise<void> => {
      const res = await fetchClient.delete(`${ApiRoutes.HOTEL}/${id}`);
      return res.data;
   },

   useHotelForm: (initialForm: HotelProps = HotelDefaultValues) => {
      return useForm<HotelProps>({
         resolver: zodResolver(hotelSchema),
         defaultValues: initialForm,
      });
   },
};
