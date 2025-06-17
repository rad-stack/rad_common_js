import { Controller } from '@hotwired/stimulus';
import { Calendar } from 'fullcalendar/dist/fullcalendar.min';

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
      eventTextColor: 'black',
      eventRender(event, element) {
        if (event.background_color) {
          element.css('background-color', event.background_color);
          element.css('font-size', '1.2em');
        }
        if (event.icon) {
          element.find('.fc-title').prepend(`<i class='${event.icon} mr-2 ml-2'></i>`);
        }
        if (event.description) {
          $(element).tooltip({ title: event.description, container: 'body' });
        }
      },
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
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
