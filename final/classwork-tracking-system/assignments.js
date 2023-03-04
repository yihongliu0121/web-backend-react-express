const uuid = require('uuid').v4;

function makeAssignmentList() {
  // These are hardcoded initial state when we restart the server
  const id1 = uuid();
  const id2 = uuid();

  const assignmentList = {};
  const assignments = {
    [id1]: {
      id: id1,
      assignmentName: 'Assignment1',
      done: false,
      dueDate: '2022-12-06'
    },
    [id2]: {
      id: id2,
      assignmentName: 'Assignment2',
      done: true,
      dueDate: '2022-12-08'
    },
  };

  assignmentList.contains = function contains(id) {
    return !!assignments[id];
  };

  assignmentList.getAssignments = function getAssignments() {
    return assignments;
  };

  assignmentList.addAssignment = function addAssignment(assignmentName, dueDate) {
    const id = uuid();
    assignments[id] = {
      id,
      assignmentName,
      done: false,
      dueDate
    };
    return id;
  };

  assignmentList.getAssignment = function getAssignment(id) {
    return assignments[id];
  };

  assignmentList.updateAssignment = function updateAssignment(id, assignment) {
    // this uses ?? because we need to accept `false` as a legit value
    assignments[id].done = assignment.done ?? assignments[id].done;
    // the below could use ?? or ||, but I don't want to accept ''
    assignments[id].assignmentName = assignment.assignmentName || assignments[id].assignmentName;
    assignments[id].dueDate = assignment.dueDate || assignments[id].dueDate;
  };

  assignmentList.deleteAssignment = function deleteAssignment(id) {
    delete assignments[id];
  };

  return assignmentList;
};

module.exports = {
  makeAssignmentList,
};