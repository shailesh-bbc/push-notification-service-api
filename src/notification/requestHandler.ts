import {Request, Response} from 'express';
import {AxiosResponse} from 'axios';
import {getUser} from './../user/userDatabase';
import {sendPushRequest} from './pushBullet';
import {getRequestType} from './pushNotification';
import {incrementPushNotification} from '../user/userDatabase';

const PUSH_BULLET_API = 'https://api.pushbullet.com/v2/pushes';
const PUSH_BULLET_UPLOAD_REQUEST_API = 'https://api.pushbullet.com/v2/upload-request';

const headers = (accessToken) => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
};

export const requestHandler = async (req: Request, res: Response) => {
  const username = typeof req.query.username === 'string' ? req.query.username : '';
  const {body} = req;

  try {
    if (!username || username.length === 0) {
      throw new Error('Username is missing');
    }

    const {accessToken} = await getUser(username);

    const getRequestBody = getRequestType(body);

    const {data} = await sendPushRequest(PUSH_BULLET_API, headers(accessToken), getRequestBody).then(
      (res: AxiosResponse) => {
        incrementPushNotification(username);
        return res;
      },
    );

    return res.send(await getUser(username));
  } catch (error) {
    const {response} = error;

    if (response) {
      const {status, statusText, data} = response;

      return res.status(status).json({
        status,
        statusText,
        data,
      });
    }

    return res.status(400).json({
      statusCode: 400,
      errorMessage: error.message,
    });
  }
};
