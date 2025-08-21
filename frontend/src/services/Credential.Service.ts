import { ApiRoutes } from '@/constants/ApiRoutes';
import { CredentialDefaultValues, credentialSchema, type CredentialFormProps } from '@/dto/CredentialDto';
import { fetchClient } from '@/lib/axios';
import type { CredentialResponseProps } from '@/types/Credential';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const CredentialService = {
   QUERY_KEY: 'credential',

   Login: async (data: CredentialFormProps): Promise<CredentialResponseProps> => {
      const res = await fetchClient.post(ApiRoutes.LOGIN, data);
      if (res.data.token) {
         localStorage.setItem('token', res.data.token);
      }
      return res.data;
   },

   Register: async (data: CredentialFormProps): Promise<CredentialResponseProps> => {
      const res = await fetchClient.post(ApiRoutes.REGISTER, data);
      return res.data;
   },

   useCredentialForm: (initialFormData: CredentialFormProps = CredentialDefaultValues) => {
      return useForm<CredentialFormProps>({
         defaultValues: initialFormData,
         resolver: zodResolver(credentialSchema),
      });
   },
};
