import axios from 'axios';
import {incrementPushNotification} from '../user/userDatabase';
import {RequestData} from '../types/pushNotification';

const PUSH_BULLET_API = 'https://api.pushbullet.com/v2/pushes';

export const sendPushRequest = async (accessToken: string, body: RequestData, username: string) => {
  return await axios
    .post(PUSH_BULLET_API, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(async (res) => {
      await incrementPushNotification(username);
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
