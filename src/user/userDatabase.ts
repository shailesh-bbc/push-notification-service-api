import {RegisteredUser} from '../types/createUser';

const registeredUsers: RegisteredUser[] = [
  {
    username: 'test',
    accessToken: 'o.dluqWtxxXHF7QlaBTbmiYdqY4KfCImLi',
    creationTime: '2021-06-12T20:34:40.201Z',
    numOfNotificationsPushed: 0,
  },
];

export const getRegisteredUsers = (): Promise<RegisteredUser[]> => {
  return Promise.resolve(registeredUsers);
};

export const addUser = (user: RegisteredUser) => {
  if (isUserAlreadyRegistered(user)) {
    throw new Error('User already exists');
  }
  registeredUsers.push(user);
};

export const getUser = (username: string): Promise<RegisteredUser> => {
  const registeredUser = registeredUsers.find(({username: registeredUsername}) => registeredUsername === username);

  if (!registeredUser) {
    throw new Error(`Could not find user with username ${username}`);
  }

  return Promise.resolve(registeredUser);
};

export const incrementPushNotification = (usrname: string): Promise<void> => {
  const registeredUserIndex = registeredUsers.findIndex(
    ({username: registeredUsername}) => registeredUsername === usrname,
  );

  if (registeredUserIndex < 0) {
    throw new Error(`Could not find user ${usrname}`);
  }

  let {username, accessToken, creationTime, numOfNotificationsPushed} = registeredUsers[registeredUserIndex];

  registeredUsers[registeredUserIndex] = {
    username,
    accessToken,
    creationTime,
    numOfNotificationsPushed: ++numOfNotificationsPushed,
  };

  return Promise.resolve();
};

const isUserAlreadyRegistered = ({username}: RegisteredUser): boolean => {
  return registeredUsers.some(({username: registeredUser}) => registeredUser === username);
};

// Exists for testing purposes.
export const clearRegisteredUsers = () => {
  registeredUsers.length = 0;
};
