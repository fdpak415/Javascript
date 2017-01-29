let Router = require("./router");
let Inbox = require("./inbox");
let Sent = require("./sent");
let Compose = require("./compose");


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
