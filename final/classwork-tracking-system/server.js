const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const PORT = process.env.PORT || 3000;

const assignments = require('./assignments');
const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

// Sessions
app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  res.json({ username });
});

app.post('/api/session', (req, res) => {
  const { username } = req.body;

  if (!username) {
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if(!users.isValid(username)) {
    res.status(400).json({ error: 'username-invalid' });
    return;
  }

  if(username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);

  if(!existingUserData) {
    users.addUserData(username, assignments.makeAssignmentList());
  }

  res.cookie('sid', sid);
  res.json(users.getUserData(username).getAssignments());
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(sid) {
    res.clearCookie('sid');
  }

  if(username) {
    // Delete the session, but not the user data
    sessions.deleteSession(sid);
  }

  res.json({ username });
});

// Assignments
app.get('/api/assignments', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(users.getUserData(username).getAssignments());
});

app.post('/api/assignments', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { assignmentName, dueDate } = req.body;
  if(!assignmentName || !dueDate) {
    res.status(400).json({ error: 'required-assignment' });
    return;
  }
  const assignmentList = users.getUserData(username);
  const id = assignmentList.addAssignment(assignmentName, dueDate);
  res.json(assignmentList.getAssignment(id));
});

app.get('/api/assignments/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const assignmentList = users.getUserData(username);
  const { id } = req.params;
  if(!assignmentList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No assignment with id ${id}` });
    return;
  }
  res.json(assignmentList.getAssignment(id));
});

// app.put('/api/assignments/:id', (req, res) => {
//   const sid = req.cookies.sid;
//   const username = sid ? sessions.getSessionUser(sid) : '';
//   if(!sid || !users.isValid(username)) {
//     res.status(401).json({ error: 'auth-missing' });
//     return;
//   }
//   const assignmentList = users.getUserData(username);
//   const { id } = req.params;
//   const { assignmentName, done=false, dueDate } = req.body;
//   // Full Replacement required for a PUT
//   if(!assignmentName || !dueDate) {
//     res.status(400).json({ error: 'required-assignment' });
//     return;
//   }
//   if(!assignmentList.contains(id)) {
//     res.status(404).json({ error: `noSuchId`, message: `No assignment with id ${id}` });
//     return;
//   }
//   assignmentList.updateAssignment(id, { assignmentName, done, dueDate });
//   res.json(assignmentList.getAssignment(id));
// });

app.patch('/api/assignments/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const { assignmentName, done, dueDate } = req.body;
  const assignmentList = users.getUserData(username);
  if(!assignmentList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No assignment with id ${id}` });
    return;
  }
  assignmentList.updateAssignment(id, { assignmentName, done, dueDate });
  res.json(assignmentList.getAssignment(id));
});

app.delete('/api/assignments/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const assignmentList = users.getUserData(username);
  const exists = assignmentList.contains(id);
  if(exists) {
    assignmentList.deleteAssignment(id);
  }
  res.json({ message: exists ? `assignment ${id} deleted` : `assignment ${id} did not exist` });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));