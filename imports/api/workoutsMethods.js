import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { WorkoutsCollection } from '../db/WorkoutsCollection';

Meteor.methods({
  'workouts.insert'(text) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    WorkoutsCollection.insert({
      text,
      createdAt: new Date(),
      userId: this.userId,
    });
  },

  'workouts.remove'(workoutId) {
    check(workoutId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    WorkoutsCollection.remove(workoutId);
  },

  'workouts.setIsChecked'(workoutId, isChecked) {
    check(workoutId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    WorkoutsCollection.update(workoutId, {
      $set: {
        isChecked,
      },
    });
  },
});
