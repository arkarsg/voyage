import type { IUser } from './user';

export interface IUserCard {
  user: IUser;
  signOut: () => Promise<void>;
}
