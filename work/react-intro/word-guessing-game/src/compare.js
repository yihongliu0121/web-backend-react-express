function countMatches(target, guess) {
    let count = 0;
  
  target = target.toUpperCase().split('');
  guess = guess.toUpperCase().split('');

  target.forEach(
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

export default countMatches;