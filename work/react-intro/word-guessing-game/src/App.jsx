import './App.css';
import { useState } from 'react';
import Guess from './Guess';
import Result from './Result';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [guessWord, setGuessWord] = useState('');
  const [error, setError] = useState('');

  const onLogin =(username) => {
    username = username.trim();
    const regex = /^[0-9a-zA-Z]*$/;
    if (!username || !username.match(regex)) {
        setError("the username is not made up of valid characters, only 0-9 and/or a-Z");
        setIsLoggedIn(false);
    }
    else if (username === "dog") {
      setError("username can not be dog!");
      setIsLoggedIn(false);
    }
    else {
      setIsLoggedIn(true);
      
    }
  }


  return (
    <div className="App">
      {
        isLoggedIn 
        ? 
        <div className='content-page'>
          <span>Hello {username}</span>
          <Guess setGuessWord={setGuessWord} />
          <Result guessWord={guessWord} />
          <button onClick={() => {setIsLoggedIn(false); setUsername(''); setError('')} }>Logout</button>
        </div>
        :
        <>
        <form>
          <label>
            <span>Username: </span>
            <input value={username} onInput={(e) => setUsername(e.target.value)}/>
          </label>
          <button onClick={(e) =>{ e.preventDefault(); onLogin(username)}}>Login</button>
        </form>
        <span>{error}</span>
        </>
      }
    </div>
  );
}

export default App;
