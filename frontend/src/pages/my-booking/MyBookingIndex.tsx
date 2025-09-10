import { Card, CardContent } from '@/components/ui/card';
import { SpinnerLoadingPulse } from '@/components/ui/spinLoading';
import { BookingService } from '@/services/Booking.Service';
import type { BookingProps } from '@/types/Booking';
import { useQuery } from '@tanstack/react-query';
import type React from 'react';

export default function MyBookingIndex(): React.ReactElement {
   const {
      data: bookings,
      isLoading,
      isError,
   } = useQuery({
      queryKey: [BookingService.QUERY_KEY],
      queryFn: BookingService.getBookingByUserId,
   });

   if (isLoading) {
      return (
         <div className="flex justify-center items-center h-64">
            <SpinnerLoadingPulse />
         </div>
      );
   }

   if (isError) {
      return <div className="text-red-500 text-center py-4">Failed to load bookings. Please try again later.</div>;
   }

   if (!bookings || bookings.length === 0) {
      return <div className="text-center py-4 text-gray-500">You have no bookings yet.</div>;
   }

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 pt-32 max-w-7xl mx-auto">
         {bookings.map((booking: BookingProps) => (
            <Card key={booking.id} className="shadow-md rounded-2xl">
               <CardContent className="pt-6 space-y-2">
                  <img src={booking.hotel.image} alt={booking.hotel.name} className="w-full h-40 object-cover rounded-xl mb-3" />
                  <h2 className="text-lg font-semibold">{booking.hotel.name}</h2>
                  <p className="text-gray-600 font-medium">
                     {booking.hotel.people} guests · ⭐ {booking.hotel.rating}
                  </p>
                  <p className="text-gray-700 mt-2">
                     <span className="font-medium">Start:</span> {new Date(booking.start_date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">
                     <span className="font-medium">End:</span> {new Date(booking.end_date).toLocaleDateString()}
                  </p>

                  <p className="text-blue-600 font-bold mt-2">${booking.hotel.price} / night</p>
               </CardContent>
            </Card>
         ))}
      </div>
   );
}
