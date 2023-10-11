import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  createUserAccount({ username, password }) {
    check(username, String);
    check(password, String);

    if (Meteor.isServer) {
      if (!Accounts.findUserByUsername(username)) {
        const userId = Accounts.createUser({
          username,
          password,
        });
        return userId;
      } else {
        throw new Meteor.Error(
          'username-already-exists',
          'Username already exists.'
        );
      }
    }
  },
});
