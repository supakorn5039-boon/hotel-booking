import { ApiRoutes } from '@/constants/ApiRoutes';
import { BookingDefaultValues, bookingSchema } from '@/dto/BookingDto';
import { fetchClient } from '@/lib/axios';
import type { BookingProps } from '@/types/Booking';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const BookingService = {
   QUERY_KEY: 'bookings',

   getBookingByUserId: async (): Promise<BookingProps[]> => {
      const res = await fetchClient.get(ApiRoutes.BOOKING);
      return res.data;
   },

   createBooking: async (data: BookingProps): Promise<BookingProps> => {
      const res = await fetchClient.post(ApiRoutes.BOOKING, data);
      return res.data;
   },

   useBookingForm: (initialForm: BookingProps = BookingDefaultValues) => {
      return useForm<BookingProps>({
         defaultValues: initialForm,
         resolver: zodResolver(bookingSchema),
      });
   },
};
