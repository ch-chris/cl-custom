//console.log("ev lists");
//variables for list items
const listItems = document.querySelectorAll('.ev_list-item');
const listImages = document.querySelectorAll('.ev_list-image');
const listHeadings = document.querySelectorAll('.ev_list-heading');
//on load
listItems[0].classList.add('is--active');
listImages[0].classList.add('is--active');
listHeadings[0].classList.add('is--active');
//adds and removes active class function
function changeFocus(trigger, i) {
  const active = document.querySelectorAll('.is--active');
  active.forEach(function (el) {
    el.classList.remove('is--active');
  });
  trigger.classList.add('is--active');
  listImages[i].classList.add('is--active');
  listHeadings[i].classList.add('is--active');
}
//listener for scroll and mouseenter on each item
const pageHeight = (function () {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
})();
for (let i = 0; i < listItems.length; i++) {
  // removed mouseenter for scroll function
  // listItems[i].addEventListener("mouseenter", function () {
  //   changeFocus(this, i);
  // });
  document.addEventListener('scroll', function () {
    const listPos = listItems[i].getBoundingClientRect();
    if ((listPos.top / pageHeight) * 100 <= 13) {
      changeFocus(listItems[i], i);
      //console.log(listPos.top, pageHeight, (listPos.top / pageHeight) * 100, i);
    }
  });
}
//moves image with cursor function *removed*
// const listImageWrap = document.querySelector(".ev_list-image-wrapper");
// const listItemWrap = document.querySelector(".ev_list-item-wrapper");
// //listener for mousemove on list wrapper
// listItemWrap.addEventListener("mousemove", (e) => {
//   const y = e.clientY;
//   listImages.forEach(function (image) {
//     image.style.transform = `translate(0px,${y / 25}px)`;
//   });
// });
