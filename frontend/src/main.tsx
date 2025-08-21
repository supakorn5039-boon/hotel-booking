import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import { routeTree } from './routeTree.gen';

import { SpinnerLoadingPulse } from '@/components/ui/spinLoading';
import { ToastProvider } from './components/Toast';
import reportWebVitals from './reportWebVitals';
import './styles.css';

const router = createRouter({
   routeTree,
   context: {},
   defaultPreload: 'intent',
   scrollRestoration: true,
   defaultStructuralSharing: true,
   defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
   interface Register {
      router: typeof router;
   }
}

const rootElement = document.getElementById('app');
const queryClient = new QueryClient();

if (rootElement && !rootElement.innerHTML) {
   const root = ReactDOM.createRoot(rootElement);
   root.render(
      <StrictMode>
         <Suspense fallback={<SpinnerLoadingPulse />}>
            <QueryClientProvider client={queryClient}>
               <RouterProvider router={router} />
               <ToastProvider />
            </QueryClientProvider>
         </Suspense>
      </StrictMode>
   );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
