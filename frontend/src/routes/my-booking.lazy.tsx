import { Protected } from '@/lib/protected-routes';
import MyBookingIndex from '@/pages/my-booking/MyBookingIndex';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/my-booking')({
   component: MyBookingIndex,
   pendingComponent: Protected,
});
