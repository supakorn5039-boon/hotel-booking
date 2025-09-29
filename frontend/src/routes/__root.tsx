import { Outlet, createRootRoute } from '@tanstack/react-router';

import Header from '@/components/Header';
import Reviews from '@/components/Reviews';

export const Route = createRootRoute({
   component: () => (
      <>
         <Header />
         <Outlet />
         <Reviews />
      </>
   ),
});
