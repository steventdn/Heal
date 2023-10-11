import { Meteor } from 'meteor/meteor';
import { WorkoutsCollection } from '/imports/db/WorkoutsCollection';

Meteor.publish('workouts', function publishWorkouts() {
  return WorkoutsCollection.find({ userId: this.userId });
});
