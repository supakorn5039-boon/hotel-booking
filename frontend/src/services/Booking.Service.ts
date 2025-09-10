import { ApiRoutes } from '@/constants/ApiRoutes';
import { fetchClient } from '@/lib/axios';
import type { BookingProps } from '@/types/Booking';

export const BookingService = {
   QUERY_KEY: 'bookings',

   getBookingByUserId: async (): Promise<BookingProps[]> => {
      const res = await fetchClient.get(ApiRoutes.BOOKING);
      return res.data;
   },
};
