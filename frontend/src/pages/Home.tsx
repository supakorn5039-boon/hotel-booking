import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SpinnerLoadingPulse } from '@/components/ui/spinLoading';
import { ROUTES } from '@/constants/Routes';
import { HotelService } from '@/services/Hotel.Service';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { Sparkles, Star } from 'lucide-react';

export default function Home() {
   const navigate = useNavigate();

   const { data = [], isLoading } = useQuery({
      queryKey: [HotelService.QUERY_KEY],
      queryFn: () => HotelService.getHotels(),
   });

   if (isLoading) return <SpinnerLoadingPulse />;

   return (
      <div className="bg-gray-50 min-h-screen">
         <section className="relative bg-blue-700 text-white py-32 px-6 text-center overflow-hidden">
            <div className="relative z-10">
               <h1 className="text-6xl font-bold mb-6">Find Your Perfect Stay</h1>
               <p className="text-2xl mb-8 max-w-2xl mx-auto">
                  Discover world-class hotels, resorts, and boutique stays across the globe.
               </p>
               <Button
                  onClick={() => navigate({ to: ROUTES.HOTEL })}
                  size="lg"
                  className="bg-yellow-400 text-black hover:bg-yellow-500"
               >
                  Explore Hotels
               </Button>
            </div>
         </section>

         <section className="max-w-4xl mx-auto -mt-16 bg-white p-8 rounded-2xl shadow-2xl z-10 relative border border-gray-100">
            <div className="text-center mb-6">
               <h2 className="text-2xl font-semibold text-gray-800">Start Your Journey</h2>
               <p className="text-gray-500 mt-2">Search hotels by city and dates.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
               <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Bangkok, Paris, Tokyo..." />
               </div>
               <div>
                  <Label htmlFor="checkin">Check-in</Label>
                  <Input type="date" id="checkin" />
               </div>
               <div>
                  <Label htmlFor="checkout">Check-out</Label>
                  <Input type="date" id="checkout" />
               </div>
               <div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Search</Button>
               </div>
            </div>
         </section>

         <section className="max-w-7xl mx-auto py-20 px-6">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
               <Sparkles /> Featured Hotels
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
               {data.map(hotel => (
                  <Card key={hotel.name} className="overflow-hidden shadow-md hover:shadow-xl transition">
                     <img src={hotel.image} alt={hotel.name} className="h-52 w-full object-cover" />
                     <CardContent className="p-4">
                        <h3 className="text-xl font-semibold">{hotel.name}</h3>
                        <p className="text-gray-600 text-sm mt-2">{hotel.description}</p>
                        <div className="flex items-center text-yellow-500 mt-3">
                           {[...Array(5)].map((_, i) => (
                              <Star
                                 key={`${hotel.id}-${i}`}
                                 className={`size-4 ${i < Math.floor(hotel.rating) ? 'fill-yellow-500' : 'fill-gray-300'}`}
                              />
                           ))}
                           <span className="ml-2 text-gray-500 text-sm">{hotel.rating}</span>
                        </div>
                     </CardContent>
                     <CardFooter>
                        <Button onClick={() => navigate({ to: `${ROUTES.HOTEL}/${hotel.id}` })} className="w-full">
                           Book Now
                        </Button>
                     </CardFooter>
                  </Card>
               ))}
            </div>
         </section>

         <section className="bg-white py-16 border-t border-gray-200">
            <div className="max-w-7xl mx-auto text-center">
               <h2 className="text-3xl font-bold mb-8">What our customers say</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                     {
                        name: 'Emily',
                        text: 'Amazing experience! Booking was easy and the hotel exceeded my expectations.',
                     },
                     {
                        name: 'David',
                        text: 'The best way to find hotels. The search was fast and prices were unbeatable.',
                     },
                     {
                        name: 'Sophia',
                        text: 'I loved the customer support chat. Super friendly and helpful!',
                     },
                  ].map(t => (
                     <Card key={t.name} className="p-6 shadow-sm">
                        <p className="italic text-gray-600">“{t.text}”</p>
                        <p className="mt-4 font-semibold text-gray-900">— {t.name}</p>
                     </Card>
                  ))}
               </div>
            </div>
         </section>
      </div>
   );
}
