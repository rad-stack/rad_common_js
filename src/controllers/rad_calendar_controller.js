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
      this.calendar = new Calendar($(this.calendarTarget), this.config());
      this.calendar.render();
    } else {
      this.showLoaded();
    }
  }

  config() {
    return {
      events: `${this.eventUrlValue}${window.location.search}`,
      plugins: [dayGridPlugin, bootstrapPlugin, timeGridPlugin, listPlugin, interactionPlugin],
      eventContent: function(info) {
        if (info.event.extendedProps.background_color) {
          info.el.css('background-color', info.event.extendedProps.background_color);
          info.el.css('font-size', '1.2em');
        }
        if (info.event.extendedProps.icon) {
          info.el.find('.fc-title').prepend(`<i class='${info.event.extendedProps.icon} mr-2 ml-2'></i>`);
        }
        if (info.event.extendedProps.description) {
          $(info.el).tooltip({ title: info.event.extendedProps.description, container: 'body' });
        }
      },
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      loading: (isLoading) => this.updateLoadingStatus(isLoading),
      views: {
        month: {
          displayEventEnd: true
        }
      },
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
