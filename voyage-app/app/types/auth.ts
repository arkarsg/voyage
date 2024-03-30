export interface IAuthContext {
  signIn: () => Promise<string | null>;
  signOut: () => Promise<void>;
  session?: string | null;
  isLoading: boolean;
}
