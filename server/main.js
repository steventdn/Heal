import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import '/imports/api/workoutsMethods';
import '/imports/api/workoutsPublications';
import { ServiceConfiguration } from 'meteor/service-configuration';

const SEED_USERNAME = 'dev';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  ServiceConfiguration.configurations.upsert(
    { service: 'github' },
    {
      $set: {
        loginStyle: 'popup',
        clientId: 'c006e462577d70334660',
        secret: 'c5aa963a1a14b8431a2dfd8f28caa4beb804ead6',
      },
    }
  );
  console.log('Mongo URL:', Meteor.settings.MONGO_URL);
});
