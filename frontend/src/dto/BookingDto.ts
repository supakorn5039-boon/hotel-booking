import * as z from 'zod';

export const bookingSchema = z.object({
   id: z.number(),
   hotel_id: z.number(),
   start_date: z.date(),
   end_date: z.date(),
   hotel: z.any(),
});

export type BookingFormProps = z.infer<typeof bookingSchema>;

export const BookingDefaultValues: BookingFormProps = {
   id: 0,
   hotel_id: 0,
   start_date: new Date(),
   end_date: new Date(),
   hotel: undefined,
};
