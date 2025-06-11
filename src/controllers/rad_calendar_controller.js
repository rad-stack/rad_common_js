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
      endParam: 'end_time',
      ...this.configOverrides()
    };
  }

  configOverrides() {
    return {};
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
