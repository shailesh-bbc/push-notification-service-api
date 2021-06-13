import {NoteRequestData, LinkRequestData} from '../../../src/types/pushNotification';
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

const NOTE_REQUEST_BODY_WITH_ONLY_TYPE = {
  type: 'note',
};

const LINK_REQUEST_BODY = {
  type: 'link',
  title: 'test-title',
  body: 'test-body',
  url: 'test-url',
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

    it('should get the data for type note push notification with only type', () => {
      const expected: NoteRequestData = {
        type: 'note',
      };

      const result = getRequestType(NOTE_REQUEST_BODY_WITH_ONLY_TYPE);

      expect(result).to.deep.equal(expected);
    });

    it('should get the data for type link push notification', () => {
      const expected: LinkRequestData = {
        type: 'link',
        title: 'test-title',
        body: 'test-body',
        url: 'test-url',
      };

      const result = getRequestType(LINK_REQUEST_BODY);

      expect(result).to.deep.equal(expected);
    });

    it('should get the data for type link push notification without title', () => {
      const LINK_REQUEST_BODY_WITHOUT_TITLE = {
        type: 'link',
        body: 'test-body',
        url: 'test-url',
      };

      const expected: LinkRequestData = {
        type: 'link',
        body: 'test-body',
        url: 'test-url',
      };

      const result = getRequestType(LINK_REQUEST_BODY_WITHOUT_TITLE);

      expect(result).to.deep.equal(expected);
    });

    it('should get the data for type link push notification without body', () => {
      const LINK_REQUEST_BODY_WITHOUT_BODY = {
        type: 'link',
        title: 'test-title',
        url: 'test-url',
      };
      const expected: LinkRequestData = {
        type: 'link',
        title: 'test-title',
        url: 'test-url',
      };

      const result = getRequestType(LINK_REQUEST_BODY_WITHOUT_BODY);

      expect(result).to.deep.equal(expected);
    });

    it('should get the data for type link push notification without url', () => {
      const LINK_REQUEST_BODY_WITHOUT_URL = {
        type: 'note',
        title: 'test-title',
        body: 'test-body',
      };
      const expected: LinkRequestData = {
        type: 'note',
        title: 'test-title',
        body: 'test-body',
      };

      const result = getRequestType(LINK_REQUEST_BODY_WITHOUT_URL);

      expect(result).to.deep.equal(expected);
    });

    it('should get the data for type link push notification with only type', () => {
      const LINK_REQUEST_BODY_WITH_ONLY_TYPE = {
        type: 'note',
      };
      const expected: LinkRequestData = {
        type: 'note',
      };

      const result = getRequestType(LINK_REQUEST_BODY_WITH_ONLY_TYPE);

      expect(result).to.deep.equal(expected);
    });

    it('should return error if no type found', () => {
      expect(() => getRequestType({})).to.throw('No push type found');
    });
  });
});
