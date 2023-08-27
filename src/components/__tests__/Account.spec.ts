import { describe, expect, it } from 'vitest';
import { User } from '../user/User';
import { Avatar } from '../user/Avatar';

describe('User', () => {
  describe('constructor', () => {
    it('should be able to set the required properties', () => {
      const account = new User({
        id: '1',
        name: 'User',
        email: 'user@example.com',
        avatar: new Avatar(),
      });

      expect(account.id).to.equal('1');
      expect(account.name).to.equal('User');
      expect(account.email).to.equal('user@example.com');
      expect(account.avatar).instanceof(Avatar);
    });

    it('should assign default values for the optional properties', () => {
      const account = new User({
        id: '1',
        name: 'User',
        email: 'user@example.com',
      });

      expect(account.avatar).not.toBeDefined();
    });
  });
});
