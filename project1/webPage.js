const words = require('./words');
const user = require('./user.js');

const webPage = {
    loginPage: function() {
        return `
                <!DOCTYPE html>
                <html>
                <head>
                    <link rel="stylesheet" href="/style.css">
                    <title>Login Page</title>
                </head>
                <body>
                    <div class="login-page">
                        <div class="game-title">
                            <h2>Word Guessing Game</h2>
                        </div>
                        <h3>Please login to start the guessing game</h3>
                        <form action="/login" method="POST">
                            <input name="username" placeholder="Enter your username"/>
                            <button type="submit">Login</button>
                        </form>        
                    </div>
                </body>
                </html>
            `;
    },
    errorPage: (error) => {
        return`
            <!doctype html>   
            <html>
                <head>
                    <link rel="stylesheet" href="/style.css">
                    <title>Error Page</title>
                </head>
                <body>
                    <div class="error-page">
                        <div class="game-title">
                        <h2>Word Guessing Game</h2>
                        </div>
                        <p>${error}</p>
                        <a href="/">Please enter a valid username</a>
                    </div>
                </body>
            </html>
        `;
    },
    guessingPage: (username, guessedWord, secret) => {
        return `
            <!doctype html>   
            <html>
                <head>
                    <link rel="stylesheet" href="/style.css">
                    <title>Guessing Page</title>
                </head>
                <body>
                    <div class="guessing-page">
                        <div class="game-title">
                        <h2>Word Guessing Game</h2>
                        </div>
                        <h3>Guess the word</h3>
                        <p>Welcome, ${username}</p>
                        <div class="word-list">
                            <p>Here is the guessing list</p>
                            ${words.map((word) => `<p class="word">${word}</p>`).join("")}
                        </div>
                        <div class="wrapper">
                        <input type="hidden" name="secret">
                        <div>
                            <form class="input-form" action="/guess" method="POST">
                                <input class="input-guess" name="guessedWord" value="" placeholder="Enter your guess"/>
                                <button type="submit">Submit</buttom>
                            </form>
                        </div>
                        <div class="errorMessage">
                            ${webPage.checkWordValid(username)}
                        </div>
                        <div class="gussedList">
                        <div class="wrong-label">Your Valid Guess Record:</div>
                            ${webPage.guessedWordsResult(username)}
                        </div>
                        <div class="logout"> 
                            <form action="/logout" method="POST"> 
                                <button type="submit">LOGOUT</button>
                            </form>
                        </div>
                        <div class="restart"> 
                            <form action="/new-game" method="POST"> 
                                <button type="submit">RESTART</button>
                            </form>
                        </div>
                    </div>
                </body>
            </html>
        `;
    },
    successPage: () => {
        return `
            <!doctype html>
            <html>   
                <head>
                <link rel="stylesheet" href="/style.css">
                    <title>Winning Page</title>
                </head>
                <div class="winning-page">
                    <h3>You have won the game!</h3>
                    <form action="/logout" method="POST"> 
                        <button type="submit">LOGOUT</button>
                    </form>
                    <form action="/new-game" method="POST">
                        <button type="submit">RESTART</button>
                    </form>
                </div>
            </html>
        `;
    },
    checkWordValid: function (username) {
        if(user.userinfo[username].invalid) return `Your guess is invalid, please only use the from the word list`;
        else if (user.userinfo[username].occured) return 'You have guessed this word before, please try another one';
        return ``;
    },

    guessedWordsResult: function (username) {
        return ` <ul class="guessedWords">` +
            Object.keys(user.userinfo[username].guessedList).map(word => `
            <li>
                <div class="word">
                    <p>#Round${user.userinfo[username].guessedList[word]['round']} ${word}, matches ${user.userinfo[username].guessedList[word]['matches']} letter</p>
                </div>
            </li>
            `).join('') +
            `</ul>`;
    }
};

module.exports = webPage;