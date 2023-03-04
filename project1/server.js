const express = require('express');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');
const uuidv4 = require('uuid').v4;
const webPage = require('./webPage');
const user = require('./user');
const words = require('./words');

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('./public'));

const sessions = {};

app.get('/', (req, res) => {
    const sid = req.cookies.sid;
    if(sid && sessions[sid]) {
        const username = sessions[sid].username;
        if(!user.userinfo[username]) {
            user.setUserInfo(username);
        }
        const secret = user.userinfo[username].secret;
        console.log(`logged in as ${username} and the secret word is ${secret}`);
        res.send(webPage.guessingPage(username, '-----',secret));
        return;
    }
    res.send(webPage.loginPage());
});

app.post('/login', (req, res) => {
    const username = req.body.username.trim();
    const errors = user.checkUsername(username);
    if(errors){
        res.status(401).send(webPage.errorPage(errors));
        return;
    }
    const sid = uuidv4();
    sessions[sid] = {username};
    res.cookie('sid', sid);
    res.redirect('/');
});

app.post('/guess', (req, res) => {
    let guessedWord = req.body.guessedWord;
    const sid = req.cookies.sid;
    const username = sessions[sid].username;
    const secret = user.userinfo[username].secret;
    user.userinfo[username].invalid = false;
    user.userinfo[username].occured = false;
    if (!guessedWord) {
        res.redirect('/');
    } else if (!words.includes(guessedWord)) {
        user.userinfo[username].invalid = true;
        res.redirect('/');
    } else if (user.userinfo[username].guessedList[guessedWord]) {
        user.userinfo[username].occured = true;
        res.redirect('/');
    } else if (guessedWord === secret) {
        user.userinfo[username].isWon = true;
        res.send(webPage.successPage());
    } else {
        const matches = user.compare(secret, guessedWord);
        const round = Object.keys(user.userinfo[username].guessedList).length + 1;
        user.userinfo[username].guessedList[guessedWord] = {
            matches: matches,
            round: round
        }
        res.redirect('/');
    }
});

//start a new game
app.post('/new-game', (req, res) => {
    const sid = req.cookies.sid;

    if(sid && sessions[sid]) {
        const username = sessions[sid].username;
        user.setNewWord(username);
        user.userinfo[username].guessedList = [];
        res.redirect('/');
    } else {
        res.send(webPage.errorPage('Please login'));
    }
})

//logOut
app.post('/logout', (req, res) => {
    const sid = req.cookies.sid;
    delete sessions[sid];
    res.clearCookie('sid');
    res.redirect('/');
});


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))