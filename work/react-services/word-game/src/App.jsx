import { useState, useEffect } from 'react';
import './App.css';
import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
} from './constants';

import {
  fetchSessionGet,
  fetchSessionPost,
  fetchSessionDelete,
  fetchWordGet,
  fetchWordPost,
} from './services';

import LoginForm from './LoginForm';
import Word from './Word';
import Loading from './Loading';
import Controls from './Controls';
import Status from './Status';

function App() {

  const [ error, setError ] = useState('');
  const [ username, setUsername] = useState('');
  const [ loginStatus, setLoginStatus ] = useState(LOGIN_STATUS.PENDING); // one variable covers multiple cases
  const [ isWordPending, setIsWordPending ] = useState(false);
  const [ word, setWord ] = useState('');
 
  function onLogin( username ) {
    setIsWordPending(true);
    fetchSessionPost(username)
    .then( () => {
      setError('');
      return fetchWordGet();
    })
    .catch( err => {
      //console.log(err.error);
      return Promise.reject(err); // Pass any other error unchanged
    })
    .then( (data) => {
      setError(''); // in case another action had set an error
      setWord( data.storedWord );
      setIsWordPending(false);
      setUsername(username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
    })
    .catch( (err) => {
      setError(err?.error || 'ERROR'); 
    });
  }

  function onLogout() {
    setError('');
    setUsername('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setWord('');
    fetchSessionDelete()
    .catch( err => {
      setError(err?.error || 'ERROR');
    });
  }

  function onUpdate( word ) {
    setIsWordPending(true);
    fetchWordPost(word)
    .then((data) => {
      setError(''); 
      setWord( data.storedWord );
      setIsWordPending(false);
    })
    .catch((err) => {
      setError(err?.error || 'ERROR'); 
      setIsWordPending(false);
    })
  }

  function onRefresh() {
    setError('');
    setIsWordPending(true); // Show loading state
    fetchWordGet()
    .then( data => {
      setWord(data.storedWord);
      setIsWordPending(false);
    })
    .catch( err => {
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });
  }

  function checkForSession() {
    fetchSessionGet()
    .then( session => { 
      setUsername(session.username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN); 
      return fetchWordGet(); 
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION }) // Expected, not a problem
      }
      return Promise.reject(err); // Pass any other error unchanged
    })
    .then( data => {
      setWord(data.storedWord);
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) { 
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        return;
      }
      setError(err?.error || 'ERROR');
    })

  }

  useEffect(
    () => {
      checkForSession();
    }, [] // Only run on initial render
  );

  return (
    <div className="App">
      <main className="">
        { error && <Status error={error}/> }
        { loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading> }
        { loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin}/> }
        { loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="content">
            <Controls onLogout={onLogout} onRefresh={onRefresh}/>
            <p>Hello, {username}</p>
            <Word
              isWordPending={isWordPending}
              word={word}
              onUpdate={onUpdate}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;