import { useState } from 'react';

function AddAssignmentForm({ onAddAssignment }) {

  const [ assignmentName, setAssignmentName ] = useState('');
  const [ dueDate, setDueDate ] = useState('');

  function onSubmit(e) {
    e.preventDefault(); // Don't forget, confusion follows if form submits
    setAssignmentName('');
    setDueDate('');
    onAddAssignment(assignmentName, dueDate);
  }

  return (
    <form className="add-form" action="#/add" onSubmit={onSubmit}>
      <input className="add-assignmentName" value={assignmentName} onChange={(e) => { setAssignmentName(e.target.value) }}/>
      <input className="add-dueDate" type="date" value={dueDate} onChange={(e) => { setDueDate(e.target.value) }}/>
      <button type="submit" className="add-button">Add</button>
    </form>
  );
}

export default AddAssignmentForm;