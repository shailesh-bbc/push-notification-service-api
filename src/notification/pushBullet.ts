import axios from 'axios';

export const sendPushRequest = async (url: string, headers?: any, body?: any) => {
  return await axios
    .post(url, body, {
      headers,
    })
    .catch((error) => {
      throw error;
    });
};
