import { Controller } from '@hotwired/stimulus';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

export default class extends Controller {
  static targets = ['calendar', 'loaded', 'loading'];
  static values = { eventUrl: String };

  connect() {
    this.setupCalendar();
  }

  setupCalendar() {
    if (this.hasCalendarTarget) {
      this.calendar = new Calendar(this.calendarTarget, this.config());
      this.calendar.render();
    } else {
      this.showLoaded();
    }
  }

  config() {
    return {
      timeZone: 'none',
      events: (fetchInfo, successCallback, failureCallback) => {
        let url = `${this.eventUrlValue}.json?${window.location.search.replace('?', '')}`;
        url += `&start_time=${fetchInfo.startStr}&end_time=${fetchInfo.endStr}`;
        fetch(url).then(response => response.json())
          .then(events => successCallback(events))
          .catch(error => failureCallback(error));
      },
      plugins: [dayGridPlugin, bootstrapPlugin, timeGridPlugin, listPlugin, interactionPlugin],
      themeSystem: 'bootstrap',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      eventDidMount: function(info) {
        if(info.event.textColor) {
          info.el.style.color = info.event.textColor;
        }
        if(info.event.backgroundColor) {
          info.el.style.backgroundColor = info.event.backgroundColor;
        }
        if(info.event.extendedProps.icon){
          $(info.el).find('.fc-event-title').prepend(`<i class='${info.event.extendedProps.icon} mr-2 ml-2'></i>`);
        }
        if (info.event.extendedProps.description) {
          $(info.el).tooltip({ title: info.event.extendedProps.description, container: 'body' });
        }
      },
      loading: (isLoading) => this.updateLoadingStatus(isLoading),
      views: {
        dayGridMonth: {
          displayEventEnd: true
        }
      },
      height: '80vh',
      startParam: 'start_time',
      endParam: 'end_time'
    };
  }

  updateLoadingStatus(isLoading) {
    if (isLoading) {
      this.showLoading();
    } else {
      this.showLoaded();
    }
  }

  showLoaded() {
    if (this.hasLoadedTarget) this.loadedTarget.style.display = 'block';
    if (this.hasLoadingTarget) this.loadingTarget.style.display = 'none';
  }

  showLoading() {
    if (this.hasLoadedTarget) this.loadedTarget.style.display = 'none';
    if (this.hasLoadingTarget) this.loadingTarget.style.display = 'block';
  }
}
