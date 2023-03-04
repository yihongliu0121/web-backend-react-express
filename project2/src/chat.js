import {
    fetchSession,
    fetchLogout,
    fetchLogin,
    fetchMessages,
    fetchSendMessage,
    fetchUserData,
  } from './services';

const MESSAGES = {
    "network-error": 'Trouble connecting to the network!',
    "auth-missing": 'Please login first!',
    "required-message": 'Require message, please input a message!',
    "auth-insufficient": 'Username can not be dog!',
    "required-username": 'Your username is is invalid, please re-enter!',
    "default": 'Something weird went wrong.',
};

const contentEl = document.querySelector('.content');
const statusEl = document.querySelector('.status');
pollChat();
//checkSession();

function checkSession() {
fetchSession()
.then((sessions) => {
        console.log(getActiveUser(sessions));
        const activeUser = getActiveUser(sessions);
        fetchMessages()
        .then((messageList) => {
            console.log(activeUser, messageList);
            renderChatPage(activeUser, messageList);
            renderStatus('');
        })
        .catch((error) => {
            renderStatus(error);
        });
})
.catch(() => renderLoginPage());  //it means there is not
}

function getActiveUser(sessions) {
    let activeUser = [];
    for (let key in sessions) {
        activeUser.push(sessions[key].username);
    }

    return Array.from(new Set(activeUser));
}

function pollChat() {
    checkSession();
    setTimeout( pollChat, 5000 );
}


//listener
function addAbilityToLogin() {
    const buttonEl = document.querySelector(".login-button");
    const usernameEl = document.querySelector(".login-username");
    buttonEl.addEventListener("click", (e) => {
        e.preventDefault();
        contentEl.innerHTML = renderLoading();
        const username = usernameEl.value;
        fetchLogin(username)
        .then(() => {
            checkSession();
        })
        .catch((error) => renderStatus(error));
    });
}

function addAbilityToLogout() {
    const buttonEl = document.querySelector(".logout-button");
    buttonEl.addEventListener("click", (e) => {
        e.preventDefault();
        fetchLogout()
        .then(() => {
            renderLoginPage();
            renderStatus('');
        })
        .catch();
    });
}

function addAbilityToSend() {
    const buttonEl = document.querySelector(".send-button");
    const textEl = document.querySelector(".to-send");
    buttonEl.addEventListener("click", (e) => {
        e.preventDefault();
        contentEl.innerHTML = renderLoading();
        const text = textEl.value;
        fetchSendMessage(text)
        .then(checkSession)
        .catch((error) => renderStatus(error));
    });
}

//view pages
function renderLoading() {
    return `
      <div class="login__waiting">Loading</div>
    ` 
}


function renderStatus(message) {
    //statusEl = document.querySelector('.status');
    if (!message) {
        statusEl.innerText = '';
        return;
    }
    const key = message?.error ? message.error : "default";
    statusEl.innerText = MESSAGES[key];
}

function renderLoginPage() {
    contentEl.innerHTML = `
    <div class="loginPage">
    <form action="#">
        <label for="username">Username:</label>
        <input class="login-username" placeholder="please enter your username">
        <button class="login-button" type="button">Login</button>
    </form>
    </div>`;
    addAbilityToLogin();
}

function renderChatPage(activeUser, messageList) {
    contentEl.innerHTML =
    `<h1>Online Users</h1>` +
    `<ul class="users">` +
    activeUser.map( username => 
      `
      <li>
        <div class="user">
          <span class="username">${username}</span>
        </div>
      </li>
    `).join('') +
    `</ul>` +
    `<h1>Chat Messages</h1>` +
    `<ul class="messages">` +
    Object.values(messageList).map
    ( message => 
        `
        <li>
        <div class="message">  
            <div class="sender-info">
            <span class="username">${message.sender}</span>
            </div>
            <p class="message-text">${message.text}</p>
        </div>
        </li>
        `  
    ).join('') +         
    `</ul>` + 
    `<div class="outgoing">
        <form action="#">
        <input class="to-send" placeholder="Enter message to send"/>
        <button class="send-button" type="submit">Send</button>
        </form>
    </div> ` + 
    `
    <button class="logout-button">Logout</button>
    `
    ;
    addAbilityToLogout();
    addAbilityToSend();
}