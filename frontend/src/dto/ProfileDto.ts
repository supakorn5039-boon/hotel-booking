import * as z from 'zod';

export const profileSchema = z.object({
   email: z.string().email({ message: 'Invalid email address.' }),
   password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export type ProfileFormProps = z.infer<typeof profileSchema>;

export const ProfileDefaultValues: ProfileFormProps = {
   email: '',
   password: '',
};
