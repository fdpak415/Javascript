/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	let Router = __webpack_require__(1);
	let Inbox = __webpack_require__(2);
	let Sent = __webpack_require__(4);
	let Compose = __webpack_require__(5);


	let routes = {
	  inbox: Inbox,
	  sent: Sent,
	  compose: Compose
	}

	document.addEventListener("DOMContentLoaded", () => {
	  let content = document.querySelector(".content");
	  router = new Router(content, routes);
	  router.start();
	  window.location.hash = "#inbox";
	  let navItems = Array.from(document.querySelectorAll(".sidebar-nav li"));
	  navItems.forEach(navItem => {
	    navItem.addEventListener("click", () => {
	      let name = navItem.innerText.toLowerCase();
	      location.hash = name;
	    });
	  });
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Router {
	  constructor(node, routes) {
	    this.node = node;
	    this.routes = routes;
	  }

	  start() {
	    this.render();
	    window.addEventListener("hashchange", () => {
	      this.render();
	    });
	  }

	  render() {
	    this.node.innerHTML = "";
	    let component = this.activeRoute();
	    if (component) {
	      this.node.appendChild(component.render());
	    }
	  }

	  activeRoute() {
	    let hash = window.location.hash.substr(1);
	    let component = this.routes[hash]
	    return component;
	  }
	}

	module.exports = Router;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(3);

	module.exports = {
	  renderMessage(message) {
	    let messageEl = document.createElement("li");
	    messageEl.className = "message";
	    messageEl.innerHTML =`
	    <span class='from'>From: ${message.from}</span>
	    <span class="subject">Subject: ${message.subject}</span> -
	    <span class="body">Body: ${message.body}</span>
	    `;
	    return messageEl;
	  },
	  render() {
	    let container = document.createElement("ul");
	    container.className = "messages";
	    let messages = MessageStore.getInboxMessages();
	    messages.forEach(message => {
	      container.appendChild(this.renderMessage(message));
	    });
	    return container;
	  }


	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	class Message {
	  constructor(from, to = "", subject = "", body = "") {
	    this.from = from;
	    this.to = to;
	    this.subject = subject;
	    this.body = body;

	  }

	}

	let messageDraft = new Message();


	let messages = {
	   sent: [
	     {to: "friend@mail.com", subject: "Check this out", body: "It's so cool"},
	     {to: "person@mail.com", subject: "zzz", body: "so booring"}
	   ],
	   inbox: [
	     {from: "grandma@mail.com", subject: "Fwd: Fwd: Fwd: Check this out", body: "Stay at home mom discovers cure for leg cramps. Doctors hate her"},
	     {from: "person@mail.com", subject: "Questionnaire", body: "Take this free quiz win $1000 dollars"}
	   ]
	 };

	const MessageStore = {
	  getInboxMessages() {
	    return messages.inbox.slice();
	  },
	  getSentMessages() {
	    return messages.sent.slice();
	  },
	  updateDraftField(field, value) {
	    messageDraft[field] = value;
	  },

	  sendDraft() {
	    messages.sent.push(messageDraft);
	    messageDraft = new Message();

	  },

	  getMessageDraft() {
	    return messageDraft;
	  }
	}

	module.exports = MessageStore;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(3);

	module.exports = {
	  renderMessage(message) {
	    let messageEl = document.createElement("li");
	    messageEl.className = "message";
	    messageEl.innerHTML =`
	    <span class='to'>To: ${message.to}</span>
	    <span class="subject">Subject: ${message.subject}</span> -
	    <span class="body">Body: ${message.body}</span>
	    `;
	    return messageEl;
	  },
	  render() {
	    let container = document.createElement("ul");
	    container.className = "messages";
	    let messages = MessageStore.getSentMessages();
	    messages.forEach(message => {
	      container.appendChild(this.renderMessage(message));
	    });
	    return container;
	  }


	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(3);

	module.exports = {
	  render() {
	    let div = document.createElement("div");
	    div.className = "new-message";
	    div.innerHTML = this.renderForm();

	    div.addEventListener('change', e => {
	      let target = e.target;
	      MessageStore.updateDraftField(target.name, target.value);
	    });

	    div.addEventListener('submit', e => {
	      e.preventDefault();
	      MessageStore.sendDraft();
	      window.location.hash = "#inbox"
	    })
	    return div;
	  },


	  renderForm() {
	    let currentMessage = MessageStore.getMessageDraft();
	    let html = `
	    <p class="new-message-header">New Message</p>
	    <form class="compose-form">
	    <input
	      placeholder='Recipient'
	      name='to'
	      type="text"
	      value='${currentMessage.to}'>
	    <input
	      placeholder='Subject'
	      name='subject'
	      type="text"
	      value='${currentMessage.subject}'>
	    <textarea
	      name='body'
	      rows='20'>${currentMessage.body}</textarea>
	    <button type="submit" class="btn btn-primary submit-message">Send</button>
	    </form>
	    `;
	    return html;
	  }

	}


/***/ }
/******/ ]);