"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */
  let count = 0;
  
  word = word.toUpperCase().split('');
  guess = guess.toUpperCase().split('');

  word.forEach(
    e => 
    {
    if (guess.includes(e))  
    {
      count++;
      guess.splice(guess.indexOf(e), 1); //CUT THE MATTCHED LETTER 
    }
    });

      
  return count;
}

