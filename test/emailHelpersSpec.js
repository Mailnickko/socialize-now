import { sendNotification } from '../notificationHelpers/emailHelpers';

import { expect } from 'chai';

describe('emailHelpers', () => {
  describe('sendNotification', () => {
    it('should exist', () => {
      expect(sendNotification).to.be.a.function;
    });
  });
});
