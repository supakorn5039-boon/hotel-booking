import type { HotelProps } from './Hotel';

export type BookingProps = {
   id: number;
   hotel_id: number;
   start_date: Date;
   end_date: Date;
   hotel: HotelProps;
};
