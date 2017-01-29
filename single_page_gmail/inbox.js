const MessageStore = require('./message_store');

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
