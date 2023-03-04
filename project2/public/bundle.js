/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "fetchLogout": () => (/* binding */ fetchLogout),
/* harmony export */   "fetchMessages": () => (/* binding */ fetchMessages),
/* harmony export */   "fetchSendMessage": () => (/* binding */ fetchSendMessage),
/* harmony export */   "fetchSession": () => (/* binding */ fetchSession),
/* harmony export */   "fetchUserData": () => (/* binding */ fetchUserData)
/* harmony export */ });
function fetchSession() {
  return fetch('/api/v1/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogout() {
  return fetch('/api/v1/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogin(username) {
  return fetch('/api/v1/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchMessages() {
  return fetch('/api/v1/message', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchSendMessage(message) {
  return fetch('/api/v1/message', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      message: message
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchUserData() {
  return fetch('/api/v1/user', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/chat.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");

var MESSAGES = {
  "network-error": 'Trouble connecting to the network!',
  "auth-missing": 'Please login first!',
  "required-message": 'Require message, please input a message!',
  "auth-insufficient": 'Username can not be dog!',
  "required-username": 'Your username is is invalid, please re-enter!',
  "default": 'Something weird went wrong.'
};
var contentEl = document.querySelector('.content');
var statusEl = document.querySelector('.status');
pollChat();
//checkSession();

function checkSession() {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchSession)().then(function (sessions) {
    console.log(getActiveUser(sessions));
    var activeUser = getActiveUser(sessions);
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchMessages)().then(function (messageList) {
      console.log(activeUser, messageList);
      renderChatPage(activeUser, messageList);
      renderStatus('');
    })["catch"](function (error) {
      renderStatus(error);
    });
  })["catch"](function () {
    return renderLoginPage();
  }); //it means there is not
}

function getActiveUser(sessions) {
  var activeUser = [];
  for (var key in sessions) {
    activeUser.push(sessions[key].username);
  }
  return Array.from(new Set(activeUser));
}
function pollChat() {
  checkSession();
  setTimeout(pollChat, 5000);
}

//listener
function addAbilityToLogin() {
  var buttonEl = document.querySelector(".login-button");
  var usernameEl = document.querySelector(".login-username");
  buttonEl.addEventListener("click", function (e) {
    e.preventDefault();
    contentEl.innerHTML = renderLoading();
    var username = usernameEl.value;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function () {
      checkSession();
    })["catch"](function (error) {
      return renderStatus(error);
    });
  });
}
function addAbilityToLogout() {
  var buttonEl = document.querySelector(".logout-button");
  buttonEl.addEventListener("click", function (e) {
    e.preventDefault();
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)().then(function () {
      renderLoginPage();
      renderStatus('');
    })["catch"]();
  });
}
function addAbilityToSend() {
  var buttonEl = document.querySelector(".send-button");
  var textEl = document.querySelector(".to-send");
  buttonEl.addEventListener("click", function (e) {
    e.preventDefault();
    contentEl.innerHTML = renderLoading();
    var text = textEl.value;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchSendMessage)(text).then(checkSession)["catch"](function (error) {
      return renderStatus(error);
    });
  });
}

//view pages
function renderLoading() {
  return "\n      <div class=\"login__waiting\">Loading</div>\n    ";
}
function renderStatus(message) {
  //statusEl = document.querySelector('.status');
  if (!message) {
    statusEl.innerText = '';
    return;
  }
  var key = message !== null && message !== void 0 && message.error ? message.error : "default";
  statusEl.innerText = MESSAGES[key];
}
function renderLoginPage() {
  contentEl.innerHTML = "\n    <div class=\"loginPage\">\n    <form action=\"#\">\n        <label for=\"username\">Username:</label>\n        <input class=\"login-username\" placeholder=\"please enter your username\">\n        <button class=\"login-button\" type=\"button\">Login</button>\n    </form>\n    </div>";
  addAbilityToLogin();
}
function renderChatPage(activeUser, messageList) {
  contentEl.innerHTML = "<h1>Online Users</h1>" + "<ul class=\"users\">" + activeUser.map(function (username) {
    return "\n      <li>\n        <div class=\"user\">\n          <span class=\"username\">".concat(username, "</span>\n        </div>\n      </li>\n    ");
  }).join('') + "</ul>" + "<h1>Chat Messages</h1>" + "<ul class=\"messages\">" + Object.values(messageList).map(function (message) {
    return "\n        <li>\n        <div class=\"message\">  \n            <div class=\"sender-info\">\n            <span class=\"username\">".concat(message.sender, "</span>\n            </div>\n            <p class=\"message-text\">").concat(message.text, "</p>\n        </div>\n        </li>\n        ");
  }).join('') + "</ul>" + "<div class=\"outgoing\">\n        <form action=\"#\">\n        <input class=\"to-send\" placeholder=\"Enter message to send\"/>\n        <button class=\"send-button\" type=\"submit\">Send</button>\n        </form>\n    </div> " + "\n    <button class=\"logout-button\">Logout</button>\n    ";
  addAbilityToLogout();
  addAbilityToSend();
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map