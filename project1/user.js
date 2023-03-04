const words = require("./words");

const userinfo = {};

const setUserInfo = (username) => {
    userinfo[username] = {
        guessedList:[],    //{username:  [{guessword: {isvalid: flase, occured: false, matches: -1; turns: -1}}, {guessword: {}}, {}]
        secret: getRandomWord(words),
        isValid: false,
        occured: false,
        isWon: false
    }
}

const setNewWord = (username) => {
    userinfo[username].secret = getRandomWord(words);
}

const checkUsername = (username) => {
    const errors = [];
    const clean = username.replace(/[^A-Za-z0-9_]+/g, '');

    if(clean === 'dog') {
        errors.push('username cannot be dog');
    }
    if (clean !== username) {
        errors.push('username contained disallowed characters');
    }
    if (!username) {
        errors.push('username was empty');
    }
    return errors.length ? errors : '';
}

const getRandomWord = (words) => {
    const rand = Math.floor(Math.random() * words.length);
    return words[rand].toLowerCase();
}

const compare = (word, guess) => {
    if(!word || !guess){
        return null;
    }

    if(word.length !== guess.length){
        return null;
    }

    word = word.toLowerCase();
    guess = guess.toLowerCase();

    let matches = 0;

    for(let i in word){
        let index = guess.indexOf(word[i]);
        if(index !== -1){
            matches++;
            guess = guess.substring(0,index) + guess.substring(index+1);
        } 
    }
    return matches;
}

//console.log(compare("tab", "bat"));
// const username1 = "cat";
// const username2 = "dogg";
// const guessedWord = "real";
// setUserInfo(username1);
// setUserInfo(username2);
// userinfo[username1].guessedList[guessedWord] = {
//     isValid: true,
//     occured: false,
//     matches: -1,
//     round: 1
// }

// userinfo[username1]["guessedList"][guessedWord]["isValid"] = false;
// userinfo[username1]["guessedList"][guessedWord]["matches"] = 5;

// console.log(userinfo[username1].guessedList[guessedWord]);

const user = {
    userinfo,
    setUserInfo,
    setNewWord,
    checkUsername,
    compare
}

module.exports = user;
