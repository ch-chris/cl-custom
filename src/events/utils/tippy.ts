import tippy from 'tippy.js';

tippy.setDefaultProps({ maxWidth: '500px' });
export const myTippy = function (info) {
  const myTipDept = info.event.extendedProps.department;
  const myTipTitle = info.event.title;
  const myTipDate = info.event.start.toLocaleTimeString([], { timeStyle: 'short' });
  const fragment = document.createDocumentFragment();

  const myTipContent = [myTipDept, info.event.allDay ? myTipTitle : myTipTitle + ' | ' + myTipDate];
  let count = 0;
  myTipContent.forEach((content) => {
    const div = document.createElement('div');
    div.classList.add('ev_fc-tip-' + count);
    div.textContent = content;
    fragment.appendChild(div);
    count = count + 1;
  });

  const tip = tippy(info.el, {
    theme: 'ch',
    content: fragment,
    trigger: 'click',
    animation: 'fade',
  });
};
