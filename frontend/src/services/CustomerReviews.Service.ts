import { ApiRoutes } from '@/constants/ApiRoutes';
import { reviewSchema, ReviewsDefaultValues } from '@/dto/ReviewsDto';
import { fetchClient } from '@/lib/axios';
import type { CustomerReviewsProps } from '@/types/CustomerReviews';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const CustomerReviewsService = {
   QUERY_KEY: 'customer-reviews',
   getReviews: async (): Promise<CustomerReviewsProps[]> => {
      const res = await fetchClient.get(ApiRoutes.CUSTOMER_REVIEWS);
      return res.data;
   },

   createReviews: async (data: CustomerReviewsProps): Promise<void> => {
      const res = await fetchClient.post(ApiRoutes.CUSTOMER_REVIEWS, data);
      return res.data;
   },

   useReviewForm: (initialForm: CustomerReviewsProps = ReviewsDefaultValues) => {
      return useForm<CustomerReviewsProps>({
         resolver: zodResolver(reviewSchema),
         defaultValues: initialForm,
      });
   },
};
