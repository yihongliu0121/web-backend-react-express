const express = require('express');
const cookieParser = require('cookie-parser');
const uuidv4 = require('uuid').v4;
const app = express();
const PORT = 3000;
const dynamicPage = require('./dynamicPage');

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('./public'));

const sessions = {}; //dummy databse to store sessionid: username key value pair 
const userinfo = {}; //dummy databse to store username: word key value pair 111: words

//get the homepage
app.get('/', (req, res) => {
    const sid = req.cookies.sid; //get the sessionid
    if(sid && sessions[sid]) {
        const username = sessions[sid].username;
        if(!userinfo[username]) {
            userinfo[username] = {word: ''}; //set the default value to empty string
        }
        console.log(sessions, userinfo);
        res.send(dynamicPage.dataPage(username, userinfo[username].word));
        return;
    }
    res.send(dynamicPage.loginPage());
});

app.post('/login', (req, res) => {
    const username = req.body.username.trim();
    console.log(username);
    const regex = /^[0-9a-zA-Z]*$/;
    if (username === 'dog' || username.toLowerCase() === "dog" || !username || !username.match(regex)) {
        res.status(401).send(dynamicPage.errorPage());
        return;
    }
    const sid = uuidv4();
    sessions[sid] = {username};
    res.cookie('sid', sid);
    res.redirect('/');
});

app.post('/update', (req, res) => {
    const word = req.body.word.trim();
    const sid = req.cookies.sid;
    const username = sessions[sid].username;
    userinfo[username] = {word};
    res.redirect('/');
});

app.post('/logout', (req, res) => {
    const sid = req.cookies.sid;
    delete sessions[sid];
    res.clearCookie('sid');
    res.redirect('/');

})

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));