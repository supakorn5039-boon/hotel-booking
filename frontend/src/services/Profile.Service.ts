import { ApiRoutes } from '@/constants/ApiRoutes';
import { ProfileDefaultValues, profileSchema, type ProfileFormProps } from '@/dto/ProfileDto';
import { fetchClient } from '@/lib/axios';
import type { User } from '@/types/Credential';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const ProfileService = {
   QUERY_KEY: 'profile',

   getProfile: async (): Promise<User> => {
      const res = await fetchClient(ApiRoutes.PROFILE);
      return res.data;
   },

   updateProfile: async (data: ProfileFormProps): Promise<ProfileFormProps> => {
      const res = await fetchClient.put(ApiRoutes.PROFILE, data);
      return res.data;
   },

   useProfileForm: (initialFormData: ProfileFormProps = ProfileDefaultValues) => {
      return useForm<ProfileFormProps>({
         defaultValues: initialFormData,
         resolver: zodResolver(profileSchema),
      });
   },
};
