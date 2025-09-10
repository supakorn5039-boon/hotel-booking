import * as z from 'zod';

export const credentialSchema = z.object({
   email: z.string().refine(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)),
   password: z.string().min(6, 'Password must be at least 6 characters.'),
});

export type CredentialFormProps = z.infer<typeof credentialSchema>;

export const CredentialDefaultValues: CredentialFormProps = {
   email: '',
   password: '',
};
