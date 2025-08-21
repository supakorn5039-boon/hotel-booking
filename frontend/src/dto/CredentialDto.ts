import * as z from 'zod';

export const credentialSchema = z.object({
   email: z.string().email({ message: 'Invalid email address.' }),
   password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export type CredentialFormProps = z.infer<typeof credentialSchema>;

export const CredentialDefaultValues: CredentialFormProps = {
   email: '',
   password: '',
};
