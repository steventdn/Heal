import React from 'react';

export const Workout = ({ workout, onCheckboxClick, onDeleteClick}) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={!!workout.isChecked}
        onClick={() => onCheckboxClick(workout)}
        readOnly
      />
      <span>{workout.text}</span>
      <button onClick={ () => onDeleteClick(workout) }>&times;</button>
    </li>
    
  );
};