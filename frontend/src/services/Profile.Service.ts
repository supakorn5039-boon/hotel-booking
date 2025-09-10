import { ApiRoutes } from '@/constants/ApiRoutes';
import { CredentialDefaultValues, credentialSchema, type CredentialFormProps } from '@/dto/CredentialDto';

import { fetchClient } from '@/lib/axios';
import type { User } from '@/types/Credential';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const ProfileService = {
   QUERY_KEY: 'profile',

   getProfile: async (): Promise<User> => {
      const res = await fetchClient.get(ApiRoutes.PROFILE);
      return res.data;
   },

   updateProfile: async (data: CredentialFormProps): Promise<CredentialFormProps> => {
      const res = await fetchClient.put(ApiRoutes.PROFILE, data);
      return res.data;
   },

   useProfileForm: (initialFormData: CredentialFormProps = CredentialDefaultValues) => {
      return useForm<CredentialFormProps>({
         defaultValues: initialFormData,
         resolver: zodResolver(credentialSchema),
      });
   },
};
