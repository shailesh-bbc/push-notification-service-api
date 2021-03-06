import sinon from 'sinon';
import {createUser} from '../../../src/user/createUser';
import {expect} from 'chai';

const USERNAME = 'test-user';
const ACCESS_TOKEN = 'test-token';

const sandbox = sinon.createSandbox();

describe('User actions', () => {
  let dateStub;
  let arraySomeStub;

  beforeEach(() => {
    dateStub = sandbox.stub(Date.prototype, 'toISOString').returns('11/06/2011T10:00:00');
    arraySomeStub = sandbox.stub(Array.prototype, 'some').returns(false);
  });

  afterEach(() => {
    dateStub.restore();
    arraySomeStub.restore();
  });
  describe('createUser', () => {
    it('should create a user with given username, access token and creation time', () => {
      const expected = {
        username: USERNAME,
        accessToken: ACCESS_TOKEN,
        creationTime: '11/06/2011T10:00:00',
        numOfNotificationsPushed: 0,
      };

      const result = createUser(USERNAME, ACCESS_TOKEN);

      expect(result).to.deep.equal(expected);
    });

    it('should create new user with same access token', () => {
      const expectedUser1 = {
        username: USERNAME,
        accessToken: ACCESS_TOKEN,
        creationTime: '11/06/2011T10:00:00',
        numOfNotificationsPushed: 0,
      };

      const expectedUser2 = {
        username: 'test-user-2',
        accessToken: ACCESS_TOKEN,
        creationTime: '11/06/2011T10:00:00',
        numOfNotificationsPushed: 0,
      };

      const resultUser1 = createUser(USERNAME, ACCESS_TOKEN);
      const resultUser2 = createUser('test-user-2', ACCESS_TOKEN);

      expect(resultUser1).to.deep.equal(expectedUser1);
      expect(resultUser2).to.deep.equal(expectedUser2);
    });

    it('should throw error with message invalid username given undefined username', () => {
      expect(() => createUser(undefined, ACCESS_TOKEN)).to.throw('Invalid username');
    });

    it('should throw error with message invalid username given null username', () => {
      expect(() => createUser(null, ACCESS_TOKEN)).to.throw('Invalid username');
    });

    it('should throw error with invalid access token given an undefined access token', () => {
      expect(() => createUser(USERNAME, undefined)).to.throw('Invalid access token');
    });

    it('should throw error with invalid access token given an null access token', () => {
      expect(() => createUser(USERNAME, null)).to.throw('Invalid access token');
    });
  });
});
