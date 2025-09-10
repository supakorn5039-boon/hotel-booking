import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { SpinnerLoadingPulse } from '@/components/ui/spinLoading';
import { HotelService } from '@/services/Hotel.Service';
import type { HotelProps } from '@/types/Hotel';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { Star } from 'lucide-react';

export default function HotelIndex() {
   const { data: hotels = [], isLoading } = useQuery({
      queryKey: [HotelService.QUERY_KEY],
      queryFn: HotelService.getHotels,
   });

   if (isLoading) return <SpinnerLoadingPulse />;

   return (
      <div className="bg-gray-50 min-h-screen pt-20">
         <section className="max-w-7xl mx-auto py-12 px-6 flex flex-col md:flex-row gap-6">
            <aside className="w-full md:w-1/4 bg-white p-6 rounded-xl shadow">
               <h3 className="font-bold text-lg mb-4">Filters</h3>
               <div className="mb-6">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Enter city" className="mt-1" />
               </div>
               <div className="mb-6">
                  <Label>Price Range</Label>
                  <Slider defaultValue={[100]} max={500} step={10} className="mt-2" />
               </div>
               <div className="mb-6">
                  <Label>Minimum Rating</Label>
                  <div className="flex gap-1 mt-2">
                     {[1, 2, 3, 4, 5].map(r => (
                        <Star key={r} className="size-5 text-gray-400 hover:text-yellow-400 cursor-pointer" />
                     ))}
                  </div>
               </div>
               <Button className="w-full">Apply Filters</Button>
            </aside>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {hotels.map((hotel: HotelProps) => (
                  <Card key={hotel.id} className="overflow-hidden hover:shadow-xl">
                     <img src={hotel.image} alt={hotel.name} className="size-full object-cover" />
                     <CardContent className="p-4">
                        <h3 className="text-lg font-semibold">{hotel.name}</h3>
                        <p className="text-sm text-gray-600">${hotel.price} / night</p>
                        <div className="flex items-center text-yellow-500 mt-2">
                           {[...Array(5)].map((_, i) => (
                              <Star
                                 key={`${hotel.id}-${i}`}
                                 className={`size-4 ${i < Math.floor(hotel.rating) ? 'fill-yellow-500' : 'fill-gray-300'}`}
                              />
                           ))}

                           <span className="ml-2 text-sm text-gray-500">{hotel.rating}</span>
                        </div>
                     </CardContent>
                     <CardFooter>
                        <Link to="/hotel/$id" className="w-full" params={{ id: String(hotel.id) }}>
                           <Button onClick={() => console.log(hotel)} className="w-full">
                              Book Now
                           </Button>
                        </Link>
                     </CardFooter>
                  </Card>
               ))}
            </div>
         </section>
      </div>
   );
}
