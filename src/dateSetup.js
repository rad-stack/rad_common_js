import moment from 'moment';

export class DateSetup {
  static setup() {
    const dateInputs = document.querySelectorAll('input[type=date]');
    dateInputs.forEach(input => {
      input.addEventListener('focus', function() {
        if (this.value === '' && !this.readOnly) {
          this.value = moment().format('YYYY-MM-DD');
          this.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    });

    const datetimeInputs = document.querySelectorAll('input[type=datetime-local]');
    datetimeInputs.forEach(input => {
      input.addEventListener('focus', function() {
        if (this.value === '' && !this.readOnly) {
          this.value = moment().format('YYYY-MM-DDTHH:mm');
          this.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    });
  }
}
