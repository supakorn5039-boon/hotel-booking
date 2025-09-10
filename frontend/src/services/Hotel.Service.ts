import { ApiRoutes } from '@/constants/ApiRoutes';
import { fetchClient } from '@/lib/axios';
import type { HotelProps } from '@/types/Hotel';

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
};
