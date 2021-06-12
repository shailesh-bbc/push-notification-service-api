
const registeredUsers = [];

export const createUser = (username: string, bearerToken: string) => {

  if(!isValidUsername(username)) {
    throw new Error("Invalid username");
  }

  if(!isAccessTokenValid(bearerToken)) {
    throw new Error("Invalid access token");
  }

  if(isUserAlreadyRegistered(username)) {
    throw new Error("User already exists");
  }

  const accessToken = bearerToken.replace("Bearer ", "");

  const newUser = {
    "username": username,
    "accessToken": accessToken,
    "creationTime": new Date().toISOString(),
    "numOfNotificationsPushed": 0
  }

  registeredUsers.push(newUser);

  return newUser;
} 

const isValidUsername = (username: string): boolean => {
  if(username) {
    return true;
  }

  return false;
}

const isAccessTokenValid = (accessToken: string): boolean => {
  if(accessToken) {
    return true;
  }

  return false;
}

const isUserAlreadyRegistered = (username: string) => {
  return registeredUsers.some(({username: registeredUser}) => registeredUser === username);
}
