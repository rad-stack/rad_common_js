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
      calendarEl = document.getElementById(this.calendarTarget)
      this.calendar = new Calendar(calendarEl, this.config());
      this.calendar.render();
    } else {
      this.showLoaded();
    }
  }

  config() {
    return {
      events: `${this.eventUrlValue}${window.location.search}`,
      plugins: [dayGridPlugin, bootstrapPlugin, timeGridPlugin, listPlugin, interactionPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      loading: (isLoading) => this.updateLoadingStatus(isLoading),
      views: {
        dayGridMonth: {
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
