import {RegisteredUser} from '../types/createUser';
import {addUser} from '../user/userDatabase';

export const createUser = (username: string, bearerToken: string): RegisteredUser => {
  if (!isValidUsername(username)) {
    throw new Error('Invalid username');
  }

  if (!isAccessTokenValid(bearerToken)) {
    throw new Error('Invalid access token');
  }

  const accessToken = bearerToken.replace('Bearer ', '');

  const newUser = {
    username: username,
    accessToken: accessToken,
    creationTime: new Date().toISOString(),
    numOfNotificationsPushed: 0,
  };

  try {
    addUser(newUser);
  } catch (error) {
    throw error;
  }

  return newUser;
};

const isValidUsername = (username: string): boolean => {
  if (username) {
    return true;
  }

  return false;
};

const isAccessTokenValid = (accessToken: string): boolean => {
  if (accessToken) {
    return true;
  }

  return false;
};
