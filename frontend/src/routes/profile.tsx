import { Protected } from '@/lib/protected-routes';
import ProfileIndex from '@/pages/profile/ProfileIndex';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/profile')({
   component: ProfileIndex,
   loader: Protected,
});
