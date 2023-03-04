import countMatches from "./compare";

const target = "RECAT";


function isValidWord(guess) {
    const clean = guess.replace(/[^A-Za-z]+/g, '');
    return clean === guess;
}

function Result({ guessWord }) {
    let result = '';
    if (!guessWord) {
        result = 'Please input your guess...';
    } else if (!isValidWord(guessWord)) {
        result = `contains disallowed characters!`;
    } else if (guessWord.toLowerCase() === target.toLowerCase()) {
        result = `is the secret word! you win!`;
    } else if (guessWord.length !== target.length) {
        result = `was not a valid word.`;
    } else {
        const matches = countMatches(guessWord, target);
        result = `had ${matches} letters in common.`;
    }
    return (
        <div className="result">
            <div>
                <span className="guess-word">{guessWord} </span>
                {result}
            </div>
        </div>
    );
}

export default Result;