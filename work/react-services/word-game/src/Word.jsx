import Loading from './Loading';
import { useState } from 'react';





function Word({
    word,
    isWordPending,
    onUpdate,
  }) {
    // All this code before the return is to make the return easier to skim
    const SHOW = {  // a constant used only in this component
      PENDING: 'pending',
      WORD: 'word',
    };

    const [input, setInput] = useState('');

    function onChange(e) {
        setInput(e.target.value);
      }

    let show;
    if(isWordPending) {
      show = SHOW.PENDING;
    } 
    else {
      show = SHOW.WORD;
    }
  
    return (
      <div className="content">
        { show === SHOW.PENDING && <Loading className="word--waiting">Loading Word...</Loading> }
        { show === SHOW.WORD && (
            <div>
            <h1>Your word is "{word}"</h1>
            <form className='update-form' action="#">
                <label htmlFor="word">Update your word:</label>
                <input className="input-word" value={input} onChange={onChange} placeholder="enter a word"/>
                <button type='submit' className="update-button" onClick={(e) => {e.preventDefault(); onUpdate(input)}}>Update</button>
            </form>
            </div>
        )}
      </div>
    );
  }
  

export default Word;