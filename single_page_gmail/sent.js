const MessageStore = require('./message_store');

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
