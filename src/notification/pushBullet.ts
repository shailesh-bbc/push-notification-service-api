import axios from 'axios';
import {RequestData} from '../types/pushNotification';

export const sendPushRequest = async (url: string, headers: any, body: RequestData) => {
  return await axios
    .post(url, body, {
      headers,
    })
    .catch((error) => {
      throw error;
    });
};
