const wordFor = {};

function isValidUsername(username) {
  let isValid = true;
  isValid = isValid && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

function isValidWord(word) {
  let isValid = true;
  isValid = isValid && word.match(/^[A-Za-z]*$/);
  return isValid;
}

function addUserWord(username, word) {
    wordFor[username] = word;
}

module.exports = {
  isValidUsername,
  isValidWord,
  wordFor,
  addUserWord
};