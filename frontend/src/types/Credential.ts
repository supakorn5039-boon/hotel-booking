export type User = {
   email: string;
   role: string;
};

export type CredentialResponseProps = {
   token?: string;
   user?: User;
   email: string;
   password: string;
};
