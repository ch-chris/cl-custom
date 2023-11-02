"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/events/list.ts
  var listItems = document.querySelectorAll(".ev_list-item");
  var listImages = document.querySelectorAll(".ev_list-image");
  var listHeadings = document.querySelectorAll(".ev_list-heading");
  listItems[0].classList.add("is--active");
  listImages[0].classList.add("is--active");
  listHeadings[0].classList.add("is--active");
  function changeFocus(trigger, i) {
    const active = document.querySelectorAll(".is--active");
    active.forEach(function(el) {
      el.classList.remove("is--active");
    });
    trigger.classList.add("is--active");
    listImages[i].classList.add("is--active");
    listHeadings[i].classList.add("is--active");
  }
  var pageHeight = function() {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
  }();
  for (let i = 0; i < listItems.length; i++) {
    document.addEventListener("scroll", function() {
      const listPos = listItems[i].getBoundingClientRect();
      if (listPos.top / pageHeight * 100 <= 13) {
        changeFocus(listItems[i], i);
      }
    });
  }
})();
//# sourceMappingURL=list.js.map
