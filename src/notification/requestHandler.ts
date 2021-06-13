import _ from 'lodash';
import FormData from 'form-data';
import fs from 'fs';
import {Request, Response} from 'express';
import {AxiosResponse} from 'axios';
import {getUser} from './../user/userDatabase';
import {sendPushRequest} from './pushBullet';
import {pushRequestBody} from './requestBody';
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

    const pushData = await sendUploadRequest(accessToken, body);

    const requestBody = pushRequestBody(pushData);

    const {data} = await sendPushRequest(PUSH_BULLET_API, headers(accessToken), requestBody).then(
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

const sendUploadRequest = async (accessToken: string, requestBody: any) => {
  if (requestBody.type === 'file') {
    const {type, body, fileName, fileType, fileUrl} = requestBody;

    if (fileUrl && fileUrl.length !== 0) {
      const uploadRequestBody = _.pickBy(
        {
          file_name: fileName,
          file_type: fileType,
        },
        _.identity,
      );

      const {file_name, file_type, file_url, upload_url} = await sendPushRequest(
        PUSH_BULLET_UPLOAD_REQUEST_API,
        headers(accessToken),
        uploadRequestBody,
      ).then(({data}) => {
        return data;
      });

      const formData = new FormData();
      formData.append('file', fs.createReadStream(fileUrl));

      await sendPushRequest(upload_url, {...formData.getHeaders()}, formData);

      return {
        type,
        body,
        fileName: file_name,
        fileType: file_type,
        fileUrl: file_url,
      };
    }

    return {
      type,
      body,
      fileName,
      fileType,
      fileUrl,
    };
  }

  return requestBody;
};
