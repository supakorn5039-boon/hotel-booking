import InputForm from '@/components/form/InputForm';
import { ToastAlert } from '@/components/Toast';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/Routes';
import { CredentialService } from '@/services/Credential.Service';
import type { CredentialResponseProps } from '@/types/Credential';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import type { AxiosError } from 'axios';
import { Key, UserRound } from 'lucide-react';

export default function Register() {
   const navigate = useNavigate();
   const queryClient = useQueryClient();

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = CredentialService.useCredentialForm();

   const mutation = useMutation({
      mutationFn: CredentialService.Register,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [CredentialService.QUERY_KEY] });
         ToastAlert('success', 'สมัครสมาชิกสําเร็จ !');
         navigate({ to: ROUTES.LOGIN });
      },

      onError: (error: AxiosError<{ error: string }>) => {
         const msg = error.response?.data.error ?? 'เกิดข้อผิดพลาด !';
         ToastAlert('error', msg);
      },
   });

   const onSubmit = async (data: CredentialResponseProps) => {
      mutation.mutate(data);
   };

   return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
         <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl transition-all duration-300 hover:shadow-3xl">
            <h2 className="text-3xl font-extrabold text-center text-gray-900">Create a New Account</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
               <InputForm
                  type="email"
                  label="Email"
                  name="email"
                  icon={<UserRound className="absolute left-3 top-8 text-gray-400" size={18} />}
                  placeholder="you@example.com"
                  register={register}
                  error={errors.email}
                  required
               />

               <InputForm
                  type="password"
                  label="Password"
                  name="password"
                  icon={<Key className="absolute left-3 top-8 text-gray-400" size={18} />}
                  placeholder="••••••••"
                  register={register}
                  error={errors.password}
                  required
               />

               <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-transform duration-200 hover:scale-105"
                  disabled={isSubmitting}
               >
                  {isSubmitting ? 'Registering...' : 'Register'}
               </Button>
            </form>
            <div className="text-center text-sm text-gray-600 mt-4">
               Already have an account?{' '}
               <Link to={ROUTES.LOGIN} className="text-blue-600 hover:underline">
                  Sign In
               </Link>
            </div>
         </div>
      </div>
   );
}
