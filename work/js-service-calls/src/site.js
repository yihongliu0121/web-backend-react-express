"use strict";

( function() {

    const MESSAGES = {
        "network-error": 'Trouble connecting to the network!',
        "auth-missing": 'Please login first!',
        "required-word": 'Require word, please input a word!',
        "invalid-word": 'Invalid word, Only character a-Z allowed!',
        "auth-insufficient": 'Username can not be dog!',
        "required-username": 'Your username is is invalid, please re-enter!',
        "default": 'Something weird went wrong.',
    };

    let username = undefined;
    let word = undefined;

    const contentEl = document.querySelector('.content');
    const statusEl = document.querySelector('.status');

    checkSession();
 
    function checkSession() {
    fetchSessionGet()
    .then((user) => {
            console.log(user);
            username = user.username;
            fetchWordGet()
        .then((pair) => {
            console.log(pair);
            word = pair.storedWord;
            renderWordPage(username, word);
            renderStatus('');
        })
        .catch((error) => {
            renderStatus(error);
        });
    })
    .catch(() => renderLoginPage());  //it means there is not
    }

    function addAbilityToLogin() {
        const buttonEl = document.querySelector(".login-button");
        const usernameEl = document.querySelector(".login-username");
        buttonEl.addEventListener("click", (e) => {
            const username = usernameEl.value;
            fetchSessionPost(username)
            .then(checkSession)
            .catch((error) => renderStatus(error));
        });
    }

    function addAbilityToLogout() {
        const buttonEl = document.querySelector(".logout-button");
        buttonEl.addEventListener("click", (e) => {
            fetchSessionDelete()
            .then(() => {
                renderLoginPage();
                renderStatus('');
            })
            .catch();
        });
    }

    function addAbilityToUpdateWord() {
        const buttonEl = document.querySelector(".update-button");
        const wordEl = document.querySelector(".input-word");
        buttonEl.addEventListener("click", (e) => {
            const word = wordEl.value;
            fetchWordPost(word)
            .then(checkSession)
            .catch((error) => renderStatus(error));
        });
    }

// services
    function fetchSessionGet() {
        return fetch("/api/session", {
        method: "GET",
        })
        .catch(() => Promise.reject({ error: "networkError" }))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then((err) => Promise.reject(err));
        });
    }
    
    function fetchSessionPost(username) {
        return fetch("/api/session", {
            method: "POST",
            headers: new Headers({
              "content-type": "application/json",
            }),
            body: JSON.stringify({ username }),
          })
            .catch(() => Promise.reject({ error: "networkError" }))
            .then((response) => {
              if (response.ok) {
                return response.json();
              }
              return response.json().then((err) => Promise.reject(err));
            });
    }

    function fetchSessionDelete() {
        return fetch("/api/session", {
            method: "DELETE",
          })
            .catch(() => Promise.reject({ error: "networkError" }))
            .then((response) => {
              if (response.ok) {
                return response.json();
              }
              return response.json().then((err) => Promise.reject(err));
            });
    }

    function fetchWordGet() {
        return fetch("/api/word", {
            method: "GET",
          })
            .catch(() => Promise.reject({ error: "networkError" }))
            .then((response) => {
              if (response.ok) {
                return response.json();
              }
              return response.json().then((err) => Promise.reject(err));
            });
    }

    function fetchWordPost(word) {
        return fetch("/api/word", {
            method: "POST",
            headers: new Headers({
              "content-type": "application/json",
            }),
            body: JSON.stringify({ word }),
          })
            .catch(() => Promise.reject({ error: "networkError" }))
            .then((response) => {
              if (response.ok) {
                return response.json();
              }
              return response.json().then((err) => Promise.reject(err));
            });
    }

//view pages
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

    function renderWordPage(username, word) {
        contentEl.innerHTML = `
        <div class="wordPage">
        <h1>Hi ${username}, your word is "${word}"</h1>
        <form action="#">
            <label for="word">Update your word:</label>
            <input class="input-word" value="">
            <button class="update-button" type="button">Update</button>
        </form>
        <button class="logout-button">Logout</button>
        </div>
        `;
        addAbilityToLogout();
        addAbilityToUpdateWord();
    }

})();