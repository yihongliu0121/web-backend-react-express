const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const sessions = require('./sessions');
const users = require('./users');
const messages = require('./messages');

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());

app.get('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json(sessions.getAllSession());
});

app.post('/api/v1/session', (req, res) => {
    const { username } = req.body;
    if (!users.isValid(username)) {
        res.status(400).json({ error: 'required-username' });
        return;
    }
    if (username === 'dog') {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }

    const sid = sessions.addSession(username);
    const existingUserData = users.getUserData(username);
    if (!existingUserData) {
        users.addUserData(username);
    }
    res.cookie('sid', sid);
    res.json(users.getUserData(username));
});

app.delete('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (sid) {
        res.clearCookie('sid');
    }
    if (username) {
        sessions.deleteSession(sid);
    }
    res.json({ username });
});

app.get('/api/v1/message', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json(messages.messageList);
});

app.post('/api/v1/message', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    const { message } = req.body;
    if (!message) {
        res.status(400).json({ error: 'required-message' });
        return;
    }
    messages.addMessage(username, message);
    res.json(messages.messageList);
});

app.get('/api/v1/user', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json(users.getUserData(username));
});


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));