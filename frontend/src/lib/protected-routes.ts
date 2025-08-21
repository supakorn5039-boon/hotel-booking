import { ROUTES } from '@/constants/Routes';
import { redirect } from '@tanstack/react-router';

export const Protected = () => {
   if (!localStorage.getItem('token')) {
      throw redirect({ to: ROUTES.LOGIN });
   }
};
