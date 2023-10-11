import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { WorkoutsCollection } from '/imports/db/WorkoutsCollection';
import '/imports/api/workoutsMethods';
import '/imports/api/workoutsPublications';

const insertWorkout = (workoutText, user) =>
  WorkoutsCollection.insert({
    workout: workoutText,
    userId: user._id,
    createdAt: new Date(),
  });
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

  if (WorkoutsCollection.find().count() === 0) {
    ['Chest', 'Legs', 'Cardio'].forEach((workoutText) =>
      insertWorkout(workoutText, user)
    );
  }
});
