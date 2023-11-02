import { Calendar } from '@fullcalendar/core';
import { cs } from '@fullcalendar/core/internal-common';
//import { render } from '@fullcalendar/core/preact';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import rrulePlugin from '@fullcalendar/rrule';

import { renderListContent } from '$utils/props';
import { renderGridContent } from '$utils/props';
import { myTippy } from '$utils/tippy';
import { type Event } from '$utils/types';

window.Webflow ||= [];
window.Webflow.push(() => {
  const gridCalendarEl = document.querySelector<HTMLElement>('[ev-element = "grid-view"]');
  if (!gridCalendarEl) return;
  const listCalendarEl = document.querySelector<HTMLElement>('[ev-element = "list-view"]');
  if (!listCalendarEl) return;

  const getEvents = (): Event[] => {
    const scripts = document.querySelectorAll<HTMLScriptElement>('[ev-element = "event-data"]');
    const events = [...scripts].map((script) => {
      //this function removes empty objects in JSON data, otherwise it breaks
      function remover(property, value) {
        if (value === '' || value === ' ' || JSON.stringify(value) === '{}') {
          return undefined; // change empty string to undefined
        }
        return value; // return unchanged
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const event: Event = JSON.parse(script.textContent!, remover);
      if (event.title.includes('&amp;')) {
        event.title = event.title.replace('&amp;', '&');
      }
      if (event.hasOwnProperty('rrule')) {
        //console.log(event.rrule.dtstart);
        event.rrule.dtstart = new Date(event.rrule.dtstart).toJSON();
        event.rrule.until = new Date(event.rrule.until).toJSON();
      }
      // event.exdate.forEach((date) => {
      //   date = new Date(date).toJSON();
      //   return date;
      // });
      return event;
    });
    return events;
  };
  const events = getEvents();
  console.log(events);

  //grid calendar
  const gridCalendar = new Calendar(gridCalendarEl, {
    plugins: [rrulePlugin, dayGridPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'title',
      center: '',
      right: 'prev,next',
    },
    events,
    displayEventTime: false,
    eventClick: function (info) {
      info.el.style.backgroundColor = 'var(--fc-button-active-bg-color)';
      info.el.style.color = '#fff';
    },
    eventMouseLeave: function (info) {
      info.el.style.backgroundColor = info.event.backgroundColor;
      info.el.style.color = info.event.textColor;
    },
    datesSet: function (info) {
      syncCalendar(listCalendar, info.view.currentStart);
    },
    eventDidMount: function (info) {
      renderGridContent(info);
      myTippy(info);
    },
  });

  //list calendar
  const listCalendar = new Calendar(listCalendarEl, {
    plugins: [rrulePlugin, listPlugin],
    initialView: 'listMonth',
    headerToolbar: {
      left: '',
      center: '',
      right: 'prev,next',
    },
    events,
    displayEventTime: true,
    eventTimeFormat: {
      year: '2-digit',
    },
    datesSet: function (info) {
      syncCalendar(gridCalendar, info.view.currentStart);
    },
    eventDidMount: renderListContent,
  });

  gridCalendar.render();
  listCalendar.render();
  //sync both calendars
  function syncCalendar(otherCalendar: Calendar, startDate: Date) {
    if (otherCalendar.getDate().toDateString() !== startDate.toDateString()) {
      otherCalendar.gotoDate(startDate);
    }
  }
  //add custom header in list el
  const listHeaderEl = document.createElement('h3');
  listHeaderEl.textContent = 'Upcoming Events';
  listHeaderEl.classList.add('ev_fc-list-heading');
  listCalendarEl.querySelector('.fc-toolbar-chunk').append(listHeaderEl);
});
