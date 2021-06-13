import {RequestData, NoteRequestBody, LinkRequestBody, FileRequestBody} from '../types/pushNotification';
import _ from 'lodash';

export const pushRequestBody = (requestBody): RequestData => {
  if (!requestBody.type) {
    throw new Error('No push type found');
  }

  if (!isPushTypeValid(requestBody.type)) {
    throw new Error('Push type is invalid');
  }

  if (requestBody.type === 'note') {
    const {type, title, body}: NoteRequestBody = requestBody;

    const noteRequestBody = {
      type,
      title,
      body,
    };

    return sanitiseRequestBody(noteRequestBody);
  }

  if (requestBody.type === 'link') {
    const {type, title, body, url}: LinkRequestBody = requestBody;

    const linkRequestBody = {
      type,
      title,
      body,
      url,
    };

    return sanitiseRequestBody(linkRequestBody);
  }

  if (requestBody.type === 'file') {
    const {type, body, fileName, fileType, fileUrl}: FileRequestBody = requestBody;

    const fileRequestBody = {
      type,
      body,
      file_name: fileName,
      file_type: fileType,
      file_url: fileUrl,
    };

    return sanitiseRequestBody(fileRequestBody);
  }
};

const sanitiseRequestBody = (requestBody: RequestData): RequestData => {
  return _.pickBy(
    {
      ...requestBody,
    },
    _.identity,
  ) as RequestData;
};

const isPushTypeValid = (pushType: string) => pushType === 'note' || pushType === 'link' || pushType === 'file';
