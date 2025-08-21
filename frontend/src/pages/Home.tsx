import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarIcon, Search, Sparkles } from 'lucide-react';
import { useState } from 'react';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { cn } from '@/lib/utils';

export default function Home() {
   const [checkinDate, setCheckinDate] = useState<Date>();
   const [checkoutDate, setCheckoutDate] = useState<Date>();

   return (
      <div className="bg-gray-50 min-h-screen">
         <section className="bg-blue-600 text-white py-32 px-6 text-center">
            <h1 className="text-5xl font-bold mb-4">Book Your Dream Hotel</h1>
            <p className="text-xl mb-8">Find the best hotels at the best prices, everywhere you travel.</p>
            <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500">
               Explore Hotels
            </Button>
         </section>

         <section className="max-w-4xl mx-auto -mt-16 bg-white p-10 rounded-xl shadow-2xl z-10 relative border border-gray-100">
            <div className="text-center mb-6">
               <h2 className="text-2xl font-semibold text-gray-800">Ready to find your perfect stay?</h2>
               <p className="text-gray-500 mt-2">Search for hotels by city and dates below.</p>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
               <div className="md:col-span-1">
                  <Label htmlFor="city" className="text-gray-700 font-medium">
                     City
                  </Label>
                  <Input id="city" placeholder="Enter city" className="mt-1" />
               </div>
               <div className="md:col-span-1">
                  <Label htmlFor="checkin" className="text-gray-700 font-medium">
                     Check-in
                  </Label>
                  <Popover>
                     <PopoverTrigger asChild>
                        <Button
                           variant={'outline'}
                           className={cn(
                              'w-full justify-start text-left font-normal mt-1',
                              !checkinDate && 'text-muted-foreground'
                           )}
                        >
                           <CalendarIcon className="mr-2 h-4 w-4" />
                           {checkinDate ? checkinDate.toDateString() : <span>Pick a date</span>}
                        </Button>
                     </PopoverTrigger>
                     <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={checkinDate} onSelect={setCheckinDate} />
                     </PopoverContent>
                  </Popover>
               </div>
               <div className="md:col-span-1">
                  <Label htmlFor="checkout" className="text-gray-700 font-medium">
                     Check-out
                  </Label>
                  <Popover>
                     <PopoverTrigger asChild>
                        <Button
                           variant={'outline'}
                           className={cn(
                              'w-full justify-start text-left font-normal mt-1',
                              !checkoutDate && 'text-muted-foreground'
                           )}
                        >
                           <CalendarIcon className="mr-2 h-4 w-4" />
                           {checkoutDate ? checkoutDate.toDateString() : <span>Pick a date</span>}
                        </Button>
                     </PopoverTrigger>
                     <PopoverContent className="w-auto p-0">
                        <Calendar
                           mode="single"
                           selected={checkoutDate}
                           onSelect={setCheckoutDate}
                           disabled={[{ before: checkinDate || new Date() }]}
                        />
                     </PopoverContent>
                  </Popover>
               </div>
               <div className="md:col-span-1">
                  <Button className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-bold">
                     <Search className="mr-2 h-4 w-4" />
                     Search
                  </Button>
               </div>
            </form>
         </section>

         <section className="max-w-6xl mx-auto py-16 px-6">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
               <Sparkles /> Featured Hotels
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
               {[
                  {
                     name: 'Grand Palace Hotel',
                     description: 'Luxury stay in the heart of the city.',
                     img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/184305239.jpg?k=2d22fe63ae1f8960e057238c98fb436f7bd9f65854e3a5e918607c5cfa1d0a52&o=&hp=1',
                  },
                  {
                     name: 'Beachside Resort',
                     description: 'Relax by the beach with stunning views.',
                     img: 'https://upload.opalcollection.com/app/uploads/sites/9/2022/07/22154724/HEADER_Stay-at-Jupiter-Beach-Resort.jpg',
                  },
                  {
                     name: 'Boutique Hotel',
                     description: 'Charming rooms with personalized service.',
                     img: 'https://images.squarespace-cdn.com/content/v1/5edbbcf3253cf824ff6fd101/55784f61-4bd6-4c0f-819c-024491522d3b/Revised+-+Unit+9.%2C3_F%2C+18+HAMILTON+SQUARE-Unit+9.%2C+3_F-20221229-162936.jpeg',
                  },
               ].map(hotel => (
                  <Card key={hotel.name} className="hover:shadow-xl transition-shadow flex flex-col pt-0">
                     <img src={hotel.img} alt={hotel.name} className="rounded-t-xl w-full h-48 object-cover" />
                     <CardContent className="flex-1 flex flex-col justify-between">
                        <div>
                           <h3 className="text-xl font-semibold">{hotel.name}</h3>
                           <p className="text-gray-600 mt-2">{hotel.description}</p>
                        </div>
                     </CardContent>
                     <CardFooter>
                        <Button variant="outline" className="w-full">
                           Book Now
                        </Button>
                     </CardFooter>
                  </Card>
               ))}
            </div>
         </section>
      </div>
   );
}
