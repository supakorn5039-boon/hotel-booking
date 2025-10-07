import { CustomerReviewsService } from '@/services/CustomerReviews.Service';
import type { CustomerReviewsProps } from '@/types/CustomerReviews';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import ReviewForm from './form/ReviewForm';
import DialogModal from './modal/DIalogModal';
import { ToastAlert } from './Toast';
import { Button } from './ui/button';

export default function Reviews() {
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const queryClient = useQueryClient();

   const form = CustomerReviewsService.useReviewForm();

   const reviewMutation = useMutation({
      mutationFn: (data: CustomerReviewsProps) => {
         return CustomerReviewsService.createReviews(data);
      },
      onSuccess: () => {
         ToastAlert('success', 'Review created successfully');
         queryClient.invalidateQueries({ queryKey: [CustomerReviewsService.QUERY_KEY] });
         setIsOpen(false);
         form.reset();
      },
   });

   const onSubmit = (values: CustomerReviewsProps) => {
      reviewMutation.mutate(values);
   };

   return (
      <>
         <div className="fixed bottom-6 right-6">
            <Button
               onClick={() => setIsOpen(true)}
               className="flex items-center gap-2 rounded-full px-5 py-3 bg-yellow-500 hover:bg-yellow-600 shadow-lg"
            >
               <Star className="w-5 h-5" />
               <span className="font-medium">Leave a Review</span>
            </Button>
         </div>

         <FormProvider {...form}>
            <DialogModal
               title={'Reviews'}
               description="Fill in the details to add a new hotel."
               isOpen={isOpen}
               setOpen={setIsOpen}
               onSubmit={form.handleSubmit(onSubmit)}
            >
               <ReviewForm />
            </DialogModal>
         </FormProvider>
      </>
   );
}
