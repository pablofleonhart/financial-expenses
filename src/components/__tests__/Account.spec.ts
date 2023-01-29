import { describe, expect, it } from 'vitest';
import { Account } from '../accounts/Account';
import { Avatar } from '../accounts/Avatar';

describe('Account', () => {
  describe('constructor', () => {
    it('should be able to set the required properties', () => {
      const account = new Account({
        id: '1',
        name: 'User',
        email: 'user@example.com',
        password: 'super_secret',
        avatar: new Avatar(),
      });

      expect(account.id).to.equal('1');
      expect(account.name).to.equal('User');
      expect(account.email).to.equal('user@example.com');
      expect(account.password).to.equal('super_secret');
      expect(account.avatar).instanceof(Avatar);
    });

    it('should assign default values for the optional properties', () => {
      const account = new Account({
        id: '1',
        name: 'User',
        email: 'user@example.com',
        password: 'super_secret',
      });

      expect(account.avatar).not.toBeDefined();
    });
  });
});
