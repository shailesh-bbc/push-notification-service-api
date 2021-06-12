import {RegisteredUser} from '../types/createUser';

const registeredUsers: RegisteredUser[] = [];

export const getRegisteredUsers = (): RegisteredUser[] => {
  return registeredUsers;
}

export const addUser = (user: RegisteredUser) => {
  if(isUserAlreadyRegistered(user)) {
    throw new Error("User already exists");
  }
  registeredUsers.push(user);
}

const isUserAlreadyRegistered = ({username} : RegisteredUser): boolean => {
  return registeredUsers.some(({username: registeredUser}) => registeredUser === username);
}

// Exists for testing purposes.
export const clearRegisteredUsers = () => {
  registeredUsers.length = 0;
}