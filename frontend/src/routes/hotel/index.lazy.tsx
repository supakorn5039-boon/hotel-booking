import { Protected } from '@/lib/protected-routes';
import HotelIndex from '@/pages/hotel';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/hotel/')({
   component: HotelIndex,
   pendingComponent: Protected,
});
