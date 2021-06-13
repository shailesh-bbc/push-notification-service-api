import {expect} from 'chai';
import {RegisteredUser} from '../../../src/types/createUser';
import {
  addUser,
  getRegisteredUsers,
  clearRegisteredUsers,
  getUser,
  incrementPushNotification,
} from '../../../src/user/userDatabase';
import sinon from 'sinon';

const sandbox = sinon.createSandbox();

const USERNAME = 'test-user';
const ACCESS_TOKEN = 'test-token';

const USER: RegisteredUser = {
  username: USERNAME,
  accessToken: ACCESS_TOKEN,
  creationTime: '11/06/2021T10:00:00',
  numOfNotificationsPushed: 0,
};

describe('Store for registered users', () => {
  describe('addUser', () => {
    let arrayPushSpy;

    beforeEach(() => {
      arrayPushSpy = sandbox.spy(Array.prototype, 'push');
    });

    afterEach(() => {
      arrayPushSpy.restore();
    });

    it('should add user to registeredUser if it has been created', () => {
      clearRegisteredUsers();
      addUser(USER);

      expect(arrayPushSpy.calledOnce).to.be.equal(true);
      expect(arrayPushSpy.calledWith(USER)).to.be.equal(true);
    });

    it('should throw error if user already exists', () => {
      clearRegisteredUsers();
      addUser(USER);
      expect(arrayPushSpy.callCount).to.be.equal(1);
      expect(() => addUser(USER)).to.throw('User already exists');
    });
  });

  describe('getRegisteredUsers', () => {
    it('should return empty array when no users a registered', async () => {
      clearRegisteredUsers();
      const result = await getRegisteredUsers();

      expect(result).to.deep.equal([]);
    });

    it('should return array with single created user', async () => {
      clearRegisteredUsers();
      addUser(USER);

      const result = await getRegisteredUsers();

      expect(result).to.deep.equal([USER]);
    });

    it('should return array with multiple created user', async () => {
      clearRegisteredUsers();
      addUser(USER);
      addUser({
        username: 'test-user-2',
        accessToken: ACCESS_TOKEN,
        creationTime: '11/06/2021T10:00:00',
        numOfNotificationsPushed: 0,
      });
      const result = await getRegisteredUsers();

      expect(result).to.deep.equal([
        USER,
        {
          username: 'test-user-2',
          accessToken: ACCESS_TOKEN,
          creationTime: '11/06/2021T10:00:00',
          numOfNotificationsPushed: 0,
        },
      ]);
    });
  });

  describe('getUser', () => {
    it('should return user given a username', async () => {
      clearRegisteredUsers();
      addUser(USER);

      const result = await getUser(USERNAME);

      expect(result).to.deep.equal(USER);
    });

    it('should throw error if user does not exist', () => {
      clearRegisteredUsers();

      expect(() => getUser(USERNAME)).to.throw('Could not find user with username test-user');
    });
  });

  describe('incrementPushNotification', () => {
    it('should increment number of pushed notification for a given user', async () => {
      clearRegisteredUsers();
      addUser(USER);

      incrementPushNotification(USERNAME);

      const result = await getRegisteredUsers();

      expect(result[0].numOfNotificationsPushed).to.equal(1);
    });

    it('should throw error if it can not find user', () => {
      clearRegisteredUsers();

      expect(() => incrementPushNotification(USERNAME)).to.throw(`Could not find user ${USERNAME}`);
    });
  });
});
