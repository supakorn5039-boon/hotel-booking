import { ToastAlert } from '@/components/Toast';
import AlertDialogDemo from '@/components/ui/AlertDialog';
import { BookingService } from '@/services/Booking.Service';
import { HotelService } from '@/services/Hotel.Service';
import type { BookingProps } from '@/types/Booking';
import type { HotelProps } from '@/types/Hotel';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

export default function HotelDetail() {
   const { id } = useParams({ strict: false });
   const queryClient = useQueryClient();

   const form = BookingService.useBookingForm();

   const {
      data: hotel,
      isLoading,
      error,
   } = useQuery<HotelProps>({
      queryKey: [HotelService.QUERY_KEY, id],
      queryFn: () => HotelService.getHotelById(Number(id)),
      enabled: !!id,
   });

   const createBooking = useMutation({
      mutationFn: (data: any) => {
         return BookingService.createBooking(data);
      },
      onSuccess: () => {
         ToastAlert('success', 'Booking created successfully');
         form.reset();
         queryClient.invalidateQueries({ queryKey: [BookingService.QUERY_KEY] });
      },
   });

   const onSubmit = form.handleSubmit((data: BookingProps) => {
      createBooking.mutate({
         ...data,
         hotel: hotel,
         hotel_id: hotel?.id ?? 0,
      });
   });

   if (isLoading) {
      return (
         <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
         </div>
      );
   }

   if (error) return <div className="text-center text-red-500">⚠️ Error loading hotel</div>;
   if (!hotel) return <div className="text-center text-gray-500">No hotel found</div>;

   return (
      <div className="max-w-3xl min-h-screen mx-auto p-4 pt-32">
         <div className="bg-white shadow-xl rounded-xl overflow-hidden">
            <div className="h-64 w-full bg-gray-200">
               <img src={hotel.image} alt={hotel.name} className="h-full w-full object-cover" />
            </div>

            <div className="p-6">
               <h1 className="text-3xl font-bold text-gray-900">{hotel.name}</h1>

               <div className="flex items-center mt-3">
                  <span className="text-yellow-500 text-lg">⭐</span>
                  <span className="ml-1 text-gray-700">{hotel.rating}/5</span>
               </div>

               <p className="mt-4 text-gray-700 leading-relaxed">{hotel.description}</p>

               <div className="mt-6 flex items-center justify-between">
                  <div>
                     <span className="text-2xl font-bold text-blue-600">${hotel.price}</span>
                     <span className="text-gray-500 ml-1">/ night</span>
                  </div>
                  <AlertDialogDemo
                     confirmAction={onSubmit}
                     buttonLabel="Book Now"
                     title="Are you sure you want to book this hotel?"
                     description="This action cannot be undone."
                     cancel="Cancel"
                     confirm="Confirm"
                  />
               </div>
            </div>
         </div>
      </div>
   );
}
