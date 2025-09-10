import { HotelService } from '@/services/Hotel.Service';
import type { HotelProps } from '@/types/Hotel';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

export default function HotelDetail() {
   const { id } = useParams({ strict: false });

   const {
      data: hotel,
      isLoading,
      error,
   } = useQuery<HotelProps>({
      queryKey: [HotelService.QUERY_KEY, id],
      queryFn: () => HotelService.getHotelById(Number(id)),
      enabled: !!id,
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
         <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div className="h-64 w-full bg-gray-200">
               <img src={hotel.image} alt={hotel.name} className="h-full w-full object-cover" />
            </div>

            {/* Hotel info */}
            <div className="p-6">
               <h1 className="text-3xl font-bold text-gray-900">{hotel.name}</h1>

               {/* Rating */}
               <div className="flex items-center mt-3">
                  <span className="text-yellow-500 text-lg">⭐</span>
                  <span className="ml-1 text-gray-700">{hotel.rating}/5</span>
               </div>

               {/* Description */}
               <p className="mt-4 text-gray-700 leading-relaxed">{hotel.description}</p>

               {/* Price */}
               <div className="mt-6 flex items-center justify-between">
                  <div>
                     <span className="text-2xl font-bold text-blue-600">${hotel.price}</span>
                     <span className="text-gray-500 ml-1">/ night</span>
                  </div>
                  <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition">
                     Book Now
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
