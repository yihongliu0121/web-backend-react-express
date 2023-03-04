import { useState} from 'react';
function AssignmentItem({
    assignment,
    isLastAdded,
    onDeleteAssignment,
    onToggleAssignment,
    onEditName,
    onRefresh,
  }) {
    const isDoneClass = assignment.done ? "assignment-text-complete" : "";
    const isAddedClass = isLastAdded ? "assignment-text-added" : "";
    const [assignmentEditing, setAssignmentEditing] = useState(null);
    const [editingText, setEditingText] = useState('');
    let today = new Date().toISOString().slice(0, 10);

    function calculateDiff(startDate, endDate) {
        const diffInMs = new Date(endDate) - new Date(startDate);
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        return diffInDays;
    }

    return (
      <>
        <label>
          <input
            className="assignment-toggle"
            data-id={assignment.id}
            type="checkbox"
            checked={assignment.done}
            onChange={ (e) => {
              const id = e.target.dataset.id;
              onToggleAssignment(id);
            }}
          />
         </label> 
         {assignment.id === assignmentEditing ? (
              <input className='edit-input'
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
                <span
                data-id={assignment.id}
                className={`assignment-toggle assignment-text ${ isDoneClass } ${isAddedClass}`}
                >
                {assignment.assignmentName}
              </span>
            )}

          <span
            data-id={assignment.id}
            className={`assignment-dueDate ${isAddedClass}`}
          >
            {" Due Date: " + assignment.dueDate}
          </span>
          <>
            {calculateDiff(today, assignment.dueDate) < 0 ? (
                <span> Past Due {calculateDiff(today, assignment.dueDate) * -1} Days, hurry up</span>
            ) : (
                <span>{" Due in " + calculateDiff(today, assignment.dueDate) + " Days"}</span>
            )}
          </>  

        <div className="assignment-actions">
            {assignment.id === assignmentEditing ? (
                <>
              <button data-id={assignment.id} className="assignment-edit_submit" 
              onClick={(e) => {e.preventDefault(); onEditName(assignment.id, editingText); onRefresh(); }}>Submit</button>
              <button data-id={assignment.id} className="assignment-edit_cancel" 
              onClick={(e) => {e.preventDefault(); onRefresh(); }}>Cancel</button>
              </>
            ) : (
                <>
              <button className='assignment-edit' onClick={() => setAssignmentEditing(assignment.id)}>Edit</button>
              <button data-id={assignment.id} className="assignment-delete"  
              onClick={(e) => {const id = e.target.dataset.id;
              onDeleteAssignment(id); }}>Delete</button>
              </>
            )}


        </div>  
      </>
    );
  }
  
  export default AssignmentItem;