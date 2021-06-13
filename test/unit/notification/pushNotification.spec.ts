import {
  NoteRequestBody,
  LinkRequestBody,
  FileRequestBody,
  PushFileRequestBody,
} from '../../../src/types/pushNotification';
import {pushRequestBody} from '../../../src/notification/pushNotification';
import {expect} from 'chai';

const NOTE_REQUEST_BODY: NoteRequestBody = {
  type: 'note',
  title: 'test-title',
  body: 'test-body',
};

const LINK_REQUEST_BODY: LinkRequestBody = {
  type: 'link',
  title: 'test-title',
  body: 'test-body',
  url: 'test-url',
};

const FILE_REQUEST_BODY: FileRequestBody = {
  type: 'file',
  fileType: 'test-file-type',
  fileName: 'test-file-name',
  fileUrl: 'test-file-url',
  body: 'test-body',
};

describe('Checks the type of push notification and returns the data to send', () => {
  describe('getRequestType', () => {
    describe('note push', () => {
      it('should get the data for type note push notification', () => {
        const expected: NoteRequestBody = {
          type: 'note',
          title: 'test-title',
          body: 'test-body',
        };

        const result = pushRequestBody(NOTE_REQUEST_BODY);

        expect(result).to.deep.equal(expected);
      });

      it('should get the data for type note push notification without title', () => {
        const NOTE_REQUEST_BODY_WITHOUT_TITLE = {
          type: 'note',
          body: 'test-body',
        };
        const expected: NoteRequestBody = {
          type: 'note',
          body: 'test-body',
        };

        const result = pushRequestBody(NOTE_REQUEST_BODY_WITHOUT_TITLE);

        expect(result).to.deep.equal(expected);
      });

      it('should get the data for type note push notification without body', () => {
        const NOTE_REQUEST_BODY_WITHOUT_BODY = {
          type: 'note',
          title: 'test-title',
        };
        const expected: NoteRequestBody = {
          type: 'note',
          title: 'test-title',
        };

        const result = pushRequestBody(NOTE_REQUEST_BODY_WITHOUT_BODY);

        expect(result).to.deep.equal(expected);
      });

      it('should get the data for type note push notification with only type', () => {
        const NOTE_REQUEST_BODY_WITH_ONLY_TYPE = {
          type: 'note',
        };
        const expected: NoteRequestBody = {
          type: 'note',
        };

        const result = pushRequestBody(NOTE_REQUEST_BODY_WITH_ONLY_TYPE);

        expect(result).to.deep.equal(expected);
      });
    });

    describe('link push', () => {
      it('should get the data for type link push notification', () => {
        const expected: LinkRequestBody = {
          type: 'link',
          title: 'test-title',
          body: 'test-body',
          url: 'test-url',
        };

        const result = pushRequestBody(LINK_REQUEST_BODY);

        expect(result).to.deep.equal(expected);
      });

      it('should get the data for type link push notification without title', () => {
        const LINK_REQUEST_BODY_WITHOUT_TITLE = {
          type: 'link',
          body: 'test-body',
          url: 'test-url',
        };

        const expected: LinkRequestBody = {
          type: 'link',
          body: 'test-body',
          url: 'test-url',
        };

        const result = pushRequestBody(LINK_REQUEST_BODY_WITHOUT_TITLE);

        expect(result).to.deep.equal(expected);
      });

      it('should get the data for type link push notification without body', () => {
        const LINK_REQUEST_BODY_WITHOUT_BODY = {
          type: 'link',
          title: 'test-title',
          url: 'test-url',
        };
        const expected: LinkRequestBody = {
          type: 'link',
          title: 'test-title',
          url: 'test-url',
        };

        const result = pushRequestBody(LINK_REQUEST_BODY_WITHOUT_BODY);

        expect(result).to.deep.equal(expected);
      });

      it('should get the data for type link push notification without url', () => {
        const LINK_REQUEST_BODY_WITHOUT_URL = {
          type: 'note',
          title: 'test-title',
          body: 'test-body',
        };
        const expected: LinkRequestBody = {
          type: 'note',
          title: 'test-title',
          body: 'test-body',
        };

        const result = pushRequestBody(LINK_REQUEST_BODY_WITHOUT_URL);

        expect(result).to.deep.equal(expected);
      });

      it('should get the data for type link push notification with only type', () => {
        const LINK_REQUEST_BODY_WITH_ONLY_TYPE = {
          type: 'note',
        };
        const expected: LinkRequestBody = {
          type: 'note',
        };

        const result = pushRequestBody(LINK_REQUEST_BODY_WITH_ONLY_TYPE);

        expect(result).to.deep.equal(expected);
      });
    });

    describe('file push', () => {
      it('should get the data for type file push notification', () => {
        const expected: PushFileRequestBody = {
          type: 'file',
          file_type: 'test-file-type',
          file_name: 'test-file-name',
          file_url: 'test-file-url',
          body: 'test-body',
        };

        const result = pushRequestBody(FILE_REQUEST_BODY);

        expect(result).to.deep.equal(expected);
      });

      it('should get the data for type file push notification without body', () => {
        const FILE_REQUEST_BODY_WITHOUT_BODY: FileRequestBody = {
          type: 'file',
          fileType: 'test-file-type',
          fileName: 'test-file-name',
          fileUrl: 'test-file-url',
        };
        const expected: PushFileRequestBody = {
          type: 'file',
          file_type: 'test-file-type',
          file_name: 'test-file-name',
          file_url: 'test-file-url',
        };

        const result = pushRequestBody(FILE_REQUEST_BODY_WITHOUT_BODY);

        expect(result).to.deep.equal(expected);
      });

      it('should get the data for type file push notification without file type', () => {
        const FILE_REQUEST_BODY_WITHOUT_FILE_TYPE: FileRequestBody = {
          type: 'file',
          fileName: 'test-file-name',
          fileUrl: 'test-file-url',
          body: 'test-body',
        };
        const expected: PushFileRequestBody = {
          type: 'file',
          file_name: 'test-file-name',
          file_url: 'test-file-url',
          body: 'test-body',
        };

        const result = pushRequestBody(FILE_REQUEST_BODY_WITHOUT_FILE_TYPE);

        expect(result).to.deep.equal(expected);
      });

      it('should get the data for type file push notification without file name', () => {
        const FILE_REQUEST_BODY_WITHOUT_FILE_NAME: FileRequestBody = {
          type: 'file',
          fileType: 'test-file-type',
          fileUrl: 'test-file-url',
          body: 'test-body',
        };
        const expected: PushFileRequestBody = {
          type: 'file',
          file_type: 'test-file-type',
          file_url: 'test-file-url',
          body: 'test-body',
        };

        const result = pushRequestBody(FILE_REQUEST_BODY_WITHOUT_FILE_NAME);

        expect(result).to.deep.equal(expected);
      });

      it('should get the data for type file push notification without file url', () => {
        const FILE_REQUEST_BODY_WITHOUT_FILE_URL: FileRequestBody = {
          type: 'file',
          fileName: 'test-file-name',
          fileType: 'test-file-type',
          body: 'test-body',
        };
        const expected: PushFileRequestBody = {
          type: 'file',
          file_name: 'test-file-name',
          file_type: 'test-file-type',
          body: 'test-body',
        };

        const result = pushRequestBody(FILE_REQUEST_BODY_WITHOUT_FILE_URL);

        expect(result).to.deep.equal(expected);
      });

      it('should get the data for type file push notification with just type', () => {
        const FILE_REQUEST_BODY_WITHOUT_FILE_URL: FileRequestBody = {
          type: 'file',
          fileName: 'test-file-name',
          fileType: 'test-file-type',
          body: 'test-body',
        };
        const expected: PushFileRequestBody = {
          type: 'file',
          file_name: 'test-file-name',
          file_type: 'test-file-type',
          body: 'test-body',
        };

        const result = pushRequestBody(FILE_REQUEST_BODY_WITHOUT_FILE_URL);

        expect(result).to.deep.equal(expected);
      });
    });

    it('should return error if no type found', () => {
      expect(() => pushRequestBody({})).to.throw('No push type found');
    });
  });
});
