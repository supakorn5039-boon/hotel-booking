import InputForm from '@/components/form/InputForm';
import { ToastAlert } from '@/components/Toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SpinnerLoadingPulse } from '@/components/ui/spinLoading';
import type { CredentialFormProps } from '@/dto/CredentialDto';
import { ProfileService } from '@/services/Profile.Service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Key, UserRound } from 'lucide-react';

export default function ProfileIndex() {
   const queryClient = useQueryClient();

   const { data: profileData, isLoading } = useQuery({
      queryKey: [ProfileService.QUERY_KEY],
      queryFn: ProfileService.getProfile,
   });

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = ProfileService.useProfileForm();

   const mutation = useMutation({
      mutationFn: ProfileService.updateProfile,
      onSuccess: () => {
         ToastAlert('success', 'Profile updated successfully');
         queryClient.invalidateQueries({ queryKey: [ProfileService.QUERY_KEY] });
      },
   });

   const onSubmit = (data: CredentialFormProps) => mutation.mutateAsync(data);

   if (isLoading || !profileData) {
      return <SpinnerLoadingPulse />;
   }

   return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
         <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="mt-6">
               <CardTitle className="text-center">Profile Settings</CardTitle>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <InputForm<CredentialFormProps>
                     type="email"
                     label="Email"
                     name="email"
                     icon={<UserRound className="absolute left-3 top-8 text-gray-400" size={18} />}
                     placeholder="you@example.com"
                     register={register}
                     error={errors.email}
                     required
                  />
                  <InputForm<CredentialFormProps>
                     type="password"
                     label="Password"
                     name="password"
                     icon={<Key className="absolute left-3 top-8 text-gray-400" size={18} />}
                     placeholder="••••••••"
                     register={register}
                     error={errors.password}
                  />
                  <Button
                     type="submit"
                     className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-transform duration-200 hover:scale-105"
                     disabled={mutation.isPending}
                  >
                     {mutation.isPending ? 'Updating...' : 'Update Profile'}
                  </Button>
               </form>
            </CardContent>
         </Card>
      </div>
   );
}
