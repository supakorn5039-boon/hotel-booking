import { ApiRoutes } from '@/constants/ApiRoutes';
import { fetchClient } from '@/lib/axios';
import type { CustomerReviewsProps } from '@/types/CustomerReviews';

export const CustomerReviewsService = {
   QUERY_KEY: 'customer-reviews',
   getReviews: async (): Promise<CustomerReviewsProps[]> => {
      const res = await fetchClient.get(ApiRoutes.CUSTOMER_REVIEWS);
      return res.data;
   },
};
