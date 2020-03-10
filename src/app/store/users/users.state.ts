import IUser from './users.model';

export default interface IUserState {
  users: Array<IUser>;
  selectedUser: IUser;
  userError: Error;
}

export const initializeState = (): IUserState => {
  return {
    users: Array<IUser>(),
    selectedUser: null,
    userError: null
  };
};
