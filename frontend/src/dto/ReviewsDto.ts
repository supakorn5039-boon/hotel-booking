import type { CustomerReviewsProps } from '@/types/CustomerReviews';
import * as z from 'zod';

export const reviewSchema = z.object({
   name: z.string(),
   text: z.string(),
});

export const ReviewsDefaultValues: CustomerReviewsProps = {
   name: '',
   text: '',
};
