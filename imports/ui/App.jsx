import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { WorkoutsCollection } from '/imports/db/WorkoutsCollection';
import { Workout } from './Workout.jsx';
import { WorkoutForm } from './WorkoutForm.jsx';
import { LoginForm } from './LoginForm';

const toggleChecked = ({ _id, isChecked }) =>
  Meteor.call('workouts.setIsChecked', _id, !isChecked);

const deleteWorkout = ({ _id }) => Meteor.call('workouts.remove', _id);

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const [hideCompleted, setHideCompleted] = useState(false);

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const { workouts, pendingWorkoutsCount, isLoading } = useTracker(() => {
    const noDataAvailable = { workouts: [], pendingWorkoutsCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('workouts');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const workouts = WorkoutsCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
    const pendingWorkoutsCount =
      WorkoutsCollection.find(pendingOnlyFilter).count();

    return { workouts, pendingWorkoutsCount };
  });

  const pendingWorkoutsTitle = `${
    pendingWorkoutsCount ? ` (${pendingWorkoutsCount})` : ''
  }`;

  const logout = () => Meteor.logout();

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>Welcome to Heal! {pendingWorkoutsTitle} </h1>
          </div>
        </div>
      </header>

      <div className="main">
        {user ? (
          <Fragment>
            <div className="user" onClick={logout}>
              {user.username} 🚪
            </div>
            <WorkoutForm />

            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? 'Show All' : 'Hide Completed'}
              </button>
            </div>

            {isLoading && <div className="loading">loading...</div>}

            <ul className="workouts">
              {workouts.map((workout) => (
                <Workout
                  key={workout._id}
                  workout={workout}
                  onCheckboxClick={toggleChecked}
                  onDeleteClick={deleteWorkout}
                />
              ))}
            </ul>
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};
