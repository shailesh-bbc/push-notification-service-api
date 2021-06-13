import {Request, Response} from 'express';
import {getUser} from './../user/userDatabase';
import {sendPushRequest} from './pushBullet';
import {getRequestType} from './pushNotification';

export const requestHandler = async (req: Request, res: Response) => {
  const username = typeof req.query.username === 'string' ? req.query.username : '';
  const {body} = req;

  try {
    if (!username || username.length === 0) {
      throw new Error('Username is missing');
    }

    const {accessToken} = await getUser(username);

    const getRequestBody = getRequestType(body);

    const {data} = await sendPushRequest(accessToken, getRequestBody, username);

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
