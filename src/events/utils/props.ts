/* eslint-disable no-console */

export const renderListContent = function (info) {
  //variables
  const element = info.el;
  const dateGet = info.event.start;
  const listTimeColumn = element.querySelector('.fc-list-event-time');
  const listTitleColumn = element.querySelector('.fc-list-event-title');
  //date formats
  const day = new Intl.DateTimeFormat('en-US', { weekday: 'short' });
  const monthNumber = new Intl.DateTimeFormat('en-US', { month: 'short' });
  const dayNumber = new Intl.DateTimeFormat('en-US', { day: 'numeric' });
  const time = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' });
  //create day
  const dayEl = document.createElement('span');
  dayEl.classList.add('ev_fc-list');
  dayEl.textContent = day.format(dateGet);
  //create month
  const monthEl = document.createElement('span');
  monthEl.classList.add('ev_fc-list');
  monthEl.textContent = monthNumber.format(dateGet);
  //create day number
  const dayNumberEl = document.createElement('span');
  dayNumberEl.classList.add('ev_fc-list', 'is--number');
  dayNumberEl.textContent = dayNumber.format(dateGet);
  //create time
  const timeEl = document.createElement('span');
  //timeEl.classList.add('ev_fc-list-time');
  timeEl.textContent = ` | ${time.format(dateGet)}`;
  //create department name
  const departmentEl = document.createElement('p');
  departmentEl.classList.add('ev_fc-department');
  departmentEl.textContent = info.event.extendedProps.department;
  //append/prepend elements
  listTimeColumn.append(monthEl);
  listTimeColumn.append(dayNumberEl);
  listTimeColumn.append(dayEl);
  listTitleColumn.prepend(departmentEl);
  listTitleColumn.append(timeEl);
  //element.style.backgroundColor = info.event.backgroundColor;
};

export const renderGridContent = function (info) {
  const element = info.el;
  element.style.backgroundColor = info.event.backgroundColor;
  element.style.color = info.event.textColor;
  //element.querySelector('.fc-list-event-title').prepend(departmentEl);
};
