import {
  RequestData,
  NoteRequestBody,
  LinkRequestBody,
  FileRequestBody,
  PushFileRequestBody,
} from '../types/pushNotification';
import _ from 'lodash';

export const pushRequestBody = (requestBody): RequestData => {
  if (!requestBody.type) {
    throw new Error('No push type found');
  }

  if (requestBody.type === 'note') {
    const {type, title, body}: NoteRequestBody = requestBody;

    const noteRequestBody = _.pickBy(
      {
        type,
        title,
        body,
      },
      _.identity,
    ) as NoteRequestBody;

    return noteRequestBody;
  }

  if (requestBody.type === 'link') {
    const {type, title, body, url}: LinkRequestBody = requestBody;

    const linkRequestBody = _.pickBy(
      {
        type,
        title,
        body,
        url,
      },
      _.identity,
    ) as LinkRequestBody;

    return linkRequestBody;
  }

  if (requestBody.type === 'file') {
    const {type, body, fileName, fileType, fileUrl}: FileRequestBody = requestBody;

    const pushFileRequestBody = _.pickBy(
      {
        type,
        body,
        file_name: fileName,
        file_type: fileType,
        file_url: fileUrl,
      },
      _.identity,
    ) as PushFileRequestBody;

    return pushFileRequestBody;
  }
};
