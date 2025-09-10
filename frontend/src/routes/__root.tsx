import { Outlet, createRootRoute } from '@tanstack/react-router';

import ChatButton from '@/components/ChatButton';
import Header from '@/components/Header';

export const Route = createRootRoute({
   component: () => (
      <>
         <Header />
         <Outlet />
         <ChatButton />
      </>
   ),
});
