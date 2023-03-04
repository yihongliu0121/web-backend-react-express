import { useState, useEffect } from 'react';

import './App.css';
import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
} from './constants';

import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchAssignments,
  fetchUpdateAssignment,
  fetchDeleteAssignment,
  fetchAddAssignment,
} from './services';

import LoginForm from './LoginForm';
import Assignments from './Assignments';
import Loading from './Loading';
import Controls from './Controls';
import Status from './Status';
import AddAssignmentForm from './AddAssignmentForm';

function App() {
  const [ error, setError ] = useState('');
  const [ username, setUsername] = useState('');
  const [ loginStatus, setLoginStatus ] = useState(LOGIN_STATUS.PENDING); 
  const [ isAssignmentPending, setIsAssignmentPending ] = useState(false);
  const [ assignments, setAssignments ] = useState({});
  const [ lastAddedAssignmentId, setLastAddedAssignmentId ] = useState();
  

  function onLogin( username ) {
    setIsAssignmentPending(true);
    fetchLogin(username)
    .then( (fetchedAssignments) => {
      setError(''); 
      setAssignments( fetchedAssignments );
      setIsAssignmentPending(false);
      setUsername(username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
    });
  }

  function onLogout() {
    setError('');
    setUsername('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setAssignments({});
    setLastAddedAssignmentId('');
    fetchLogout() 
    .catch( err => {
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });
  }

  function onRefresh() {
    setError('');
    setIsAssignmentPending(true); // Show loading state
    fetchAssignments()
    .then( (assignments) => {
      setAssignments(assignments);
      setLastAddedAssignmentId('');
      setIsAssignmentPending(false);
    })
    .catch( (err) => {
      if (err.error === 'auth-missing') {
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
      }
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });
  }

  function onDeleteAssignment(id) {
    setError('');
    setIsAssignmentPending(true); // Show loading state
    fetchDeleteAssignment(id)
      .then( () => {
        return fetchAssignments(); // Return the promise so we can chain
      })
      .then( (assignments) => {
        setAssignments(assignments);
        setIsAssignmentPending(false);
      })
      .catch( (err) => {
        if (err.error === 'auth-missing') {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        }
        setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
      });
  }

  function onToggleAssignment(id) {
    fetchUpdateAssignment(id, { done: !assignments[id].done } )
    .then( assignment => {
      setAssignments({
        ...assignments, 
        [id]: assignment, 
      });
      setLastAddedAssignmentId('');
    })
    .catch( (err) => {
      if (err.error === 'auth-missing') {
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
      }
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });
  }

  function onEditName(id, newName) {
    fetchUpdateAssignment(id, { assignmentName: newName } )
    .then( assignment => {
      setAssignments({
        ...assignments, 
        [id]: assignment, 
      });
      setLastAddedAssignmentId('');
    })
    .catch( err => {
      if (err.error === 'auth-missing') {
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
      }
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });
  }

  function onAddAssignment(assignmentName, dueDate) {
    fetchAddAssignment(assignmentName, dueDate)
    .then( (assignment) => {
      setAssignments({ 
        ...assignments, 
        [assignment.id]: assignment, 
      });
      setLastAddedAssignmentId(assignment.id);
    })
    .catch( (err) => {
      if (err.error === 'auth-missing') {
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
      }
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });

  }

  function checkForSession() {
    fetchSession()
    .then( (session) => { 
      setUsername(session.username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN); 
      return fetchAssignments(); 
    })
    .catch( (err) => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION })
      }
      return Promise.reject(err);
    })
    .then( (assignments) => {
      setAssignments(assignments);
    })
    .catch( (err) => {
      if( err?.error === CLIENT.NO_SESSION ) { 
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        return;
      }
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });

  }

  useEffect(
    () => {
      checkForSession();
    }, 
  [] 
  );

  return (
    <div className="App">
      <main className="">
        { error && <Status error={error}/> }
        { loginStatus === LOGIN_STATUS.PENDING && <Loading className="login-waiting">Loading user...</Loading> }
        { loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin}/> }
        { loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="content">
            <span className="welcome">Welcome, {username}</span>
            <Controls onLogout={onLogout} onRefresh={onRefresh}/>
            <AddAssignmentForm onAddAssignment={onAddAssignment}/>
            <Assignments
              isAssignmentPending={isAssignmentPending}
              assignments={assignments}
              lastAddedAssignmentId={lastAddedAssignmentId}
              onDeleteAssignment={onDeleteAssignment}
              onToggleAssignment={onToggleAssignment}
              onEditName={onEditName}
              onRefresh={onRefresh}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;