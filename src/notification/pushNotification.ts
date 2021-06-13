import {RequestData, NoteRequestData} from '../types/pushNotification';
import _ from 'lodash';

export const getRequestType = (requestBody): RequestData => {
  if (!requestBody.type) {
    throw new Error('No push type found');
  }

  if (requestBody.type === 'note') {
    const {type, title, body}: NoteRequestData = requestBody;

    const noteRequestBody = _.pickBy(
      {
        type,
        title,
        body,
      },
      _.identity,
    ) as NoteRequestData;

    return noteRequestBody;
  }
};
