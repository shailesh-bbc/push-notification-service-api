import {NoteRequestData} from '../../../src/types/pushNotification';
import {getRequestType} from '../../../src/notification/pushNotification';
import {expect} from 'chai';

const NOTE_REQUEST_BODY = {
  type: 'note',
  title: 'test-title',
  body: 'test-body',
};

const NOTE_REQUEST_BODY_WITHOUT_TITLE = {
  type: 'note',
  body: 'test-body',
};

const NOTE_REQUEST_BODY_WITHOUT_BODY = {
  type: 'note',
  title: 'test-title',
};

const NOTE_REQUEST_BODY_WITHOUT_BODY_AND_TITLE = {
  type: 'note',
};

describe('Checks the type of push notification and returns the data to send', () => {
  describe('getRequestType', () => {
    it('should get the data for type note push notification', () => {
      const expected: NoteRequestData = {
        type: 'note',
        title: 'test-title',
        body: 'test-body',
      };

      const result = getRequestType(NOTE_REQUEST_BODY);

      expect(result).to.deep.equal(expected);
    });

    it('should get the data for type note push notification without title', () => {
      const expected: NoteRequestData = {
        type: 'note',
        body: 'test-body',
      };

      const result = getRequestType(NOTE_REQUEST_BODY_WITHOUT_TITLE);

      expect(result).to.deep.equal(expected);
    });

    it('should get the data for type note push notification without body', () => {
      const expected: NoteRequestData = {
        type: 'note',
        title: 'test-title',
      };

      const result = getRequestType(NOTE_REQUEST_BODY_WITHOUT_BODY);

      expect(result).to.deep.equal(expected);
    });

    it('should get the data for type note push notification without body and title', () => {
      const expected: NoteRequestData = {
        type: 'note',
      };

      const result = getRequestType(NOTE_REQUEST_BODY_WITHOUT_BODY_AND_TITLE);

      expect(result).to.deep.equal(expected);
    });

    it('should return error if no type found', () => {
      expect(() => getRequestType({})).to.throw('No push type found');
    });
  });
});
