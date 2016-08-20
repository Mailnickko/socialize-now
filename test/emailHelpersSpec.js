import { sendNotification } from '../notificationHelpers/emailHelpers';

import Promise from 'bluebird';
import { expect } from 'chai';

describe('emailHelpers', () => {
  describe('sendNotification', () => {
    it('should exist', () => {
      expect(sendNotification).to.be.a.function;
    });

    it('should return a promise', () => {
      const sendNotificationOutput = sendNotification(null, null, '', '');

      expect(sendNotificationOutput instanceof Promise).to.be.true;
    });
  });
});
