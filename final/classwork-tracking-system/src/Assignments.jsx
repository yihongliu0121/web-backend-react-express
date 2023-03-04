import Loading from './Loading';
import AssignmentItem from './AssignmentItem';

function Assignments({
  assignments,
  isAssignmentPending,
  lastAddedAssignmentId,
  onDeleteAssignment,
  onToggleAssignment,
  onEditName,
  onRefresh,
}) {
  // All this code before the return is to make the return easier to skim
  const SHOW = {  // a constant used only in this component
    PENDING: 'pending',
    EMPTY: 'empty',
    ASSIGNMENTS: 'assignments',
  };

  let show;
  if(isAssignmentPending) {
    show = SHOW.PENDING;
  } else if (!Object.keys(assignments).length) {
    show = SHOW.EMPTY;
  } else {
    show = SHOW.ASSIGNMENTS;
  }

  // The `Object.values(todos).map()` below returns
  // an array of JSX elements
  return (
    <div className="content">
      { show === SHOW.PENDING && <Loading className="assignments-waiting">Loading Assignments...</Loading> }
      { show === SHOW.EMPTY && (
        <p>No Assignment Items yet, add one!</p>
      )}
      { show === SHOW.ASSIGNMENTS && (
        <ul className="assignments">
          { Object.values(assignments).map( assignment => (
            <li className="assignment" key={assignment.id}>
              <AssignmentItem
                assignment={assignment}
                isLastAdded={lastAddedAssignmentId===assignment.id}
                onDeleteAssignment={onDeleteAssignment}
                onToggleAssignment={onToggleAssignment}
                onEditName={onEditName}
                onRefresh={onRefresh}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Assignments;