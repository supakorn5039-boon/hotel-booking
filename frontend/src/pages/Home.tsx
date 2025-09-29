import HotelForm from '@/components/form/HotelForm';
import AlertModal from '@/components/modal/AlertModal';
import DialogModal from '@/components/modal/DIalogModal';
import { ToastAlert } from '@/components/Toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SpinnerLoadingPulse } from '@/components/ui/spinLoading';
import { ROUTES } from '@/constants/Routes';
import { HotelDefaultValues } from '@/dto/HotelDto';
import { CustomerReviewsService } from '@/services/CustomerReviews.Service';
import { HotelService } from '@/services/Hotel.Service';
import { useUserStore } from '@/store/useUserStore';
import type { HotelProps } from '@/types/Hotel';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { Edit, Sparkles, Star, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';

export default function Home() {
   const navigate = useNavigate();
   const queryClient = useQueryClient();

   const [open, setOpen] = useState(false);
   const [editingHotel, setEditingHotel] = useState<HotelProps | null>(null);
   const [selectedHotel, setSelectedHotel] = useState<HotelProps | null>(null);

   const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

   const { role } = useUserStore();

   const form = HotelService.useHotelForm();

   const { data = [], isLoading } = useQuery({
      queryKey: [HotelService.QUERY_KEY],
      queryFn: () => HotelService.getHotels(),
   });

   const { data: customerReviewsData, isLoading: customerLoading } = useQuery({
      queryKey: [CustomerReviewsService.QUERY_KEY],
      queryFn: () => CustomerReviewsService.getReviews(),
   });

   const saveHotel = useMutation({
      mutationFn: (data: HotelProps) => {
         if (editingHotel?.id) return HotelService.updateHotel(editingHotel.id, data);
         return HotelService.createHotel(data);
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [HotelService.QUERY_KEY] });
         setOpen(false);
         setEditingHotel(null);
         form.reset();
      },
   });

   const deleteHotel = useMutation({
      mutationFn: (id: number) => HotelService.deleteHotel(id),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [HotelService.QUERY_KEY] });
         ToastAlert('success', 'Hotel deleted successfully');
      },
   });

   const handleEdit = (hotel: HotelProps) => {
      setEditingHotel(hotel);
      form.reset(hotel);
      setOpen(true);
   };

   const handleAdd = () => {
      setEditingHotel(null);
      form.reset(HotelDefaultValues);
      setOpen(true);
   };

   const handleSelect = (hotel: HotelProps) => {
      setSelectedHotel(hotel);
      setDeleteOpen(true);
   };

   const onSubmit = (values: HotelProps) => {
      saveHotel.mutate(values);
   };

   if (isLoading || customerLoading) return <SpinnerLoadingPulse />;

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
            <div className="flex justify-between items-center">
               <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
                  <Sparkles /> Featured Hotels
               </h2>
               <Button onClick={handleAdd} className={role.toLowerCase() === 'user' ? 'hidden' : ''} variant="outline">
                  Add Hotel
               </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
               {data.map(hotel => (
                  <Card key={hotel.id} className="overflow-hidden shadow-md hover:shadow-xl transition">
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
                        <p className="mt-2 text-gray-500">People: {hotel.people}</p>
                     </CardContent>
                     <CardFooter className="flex gap-2">
                        <Button className="flex-1" onClick={() => navigate({ to: `${ROUTES.HOTEL}/${hotel.id}` })}>
                           Book Now
                        </Button>
                        <div className={`flex items-center gap-2 ${role.toLowerCase() === 'admin' ? '' : 'hidden'}`}>
                           <Button variant="outline" onClick={() => handleEdit(hotel)}>
                              <Edit size={16} />
                           </Button>
                           <Button variant="destructive" onClick={() => handleSelect(hotel)}>
                              <Trash2 size={16} />
                           </Button>
                        </div>
                     </CardFooter>
                  </Card>
               ))}
            </div>
         </section>

         <section className="bg-white py-16 border-t border-gray-200">
            <div className="max-w-7xl mx-auto text-center">
               <h2 className="text-3xl font-bold mb-8">What our customers say</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {customerReviewsData
                     ?.slice(0, 3)
                     .sort(() => 0.5 - Math.random())
                     .map(t => (
                        <Card key={t.name} className="p-6 shadow-sm">
                           <p className="italic text-gray-600">"{t.text}"</p>
                           <p className="mt-4 font-semibold text-gray-900">{t.name}</p>
                        </Card>
                     ))}
               </div>
            </div>
         </section>

         <FormProvider {...form}>
            <DialogModal
               title={editingHotel ? 'Edit Hotel' : 'Add a New Hotel'}
               description="Fill in the details to add a new hotel."
               isOpen={open}
               setOpen={setOpen}
               onSubmit={form.handleSubmit(onSubmit)}
            >
               <HotelForm />
            </DialogModal>
         </FormProvider>
         <AlertModal
            confirmAction={() => selectedHotel && deleteHotel.mutate(selectedHotel.id)}
            title="Are you sure you want to delete this hotel?"
            description="This action cannot be undone."
            cancel="Cancel"
            confirm="Confirm"
            open={deleteOpen}
            setOpen={setDeleteOpen}
         />
      </div>
   );
}
