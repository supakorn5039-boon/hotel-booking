import { Protected } from '@/lib/protected-routes';
import HotelDetail from '@/pages/hotel/HotelDetail';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/hotel/$id')({
   component: HotelDetail,
   pendingComponent: Protected,
});
