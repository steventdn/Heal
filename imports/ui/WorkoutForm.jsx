import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

export const WorkoutForm = () => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) return;

    Meteor.call('workouts.insert', text);

    setText('');
  };

  return (
    <form className="workout-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type to add new workouts"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit">Add Workout</button>
    </form>
  );
};
