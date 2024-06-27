import moment from 'moment';
import $ from 'jquery';

export class RadSearchDateFilter {
  static setup() {
    const setDateRange = (target, range) => {
      let startDate, endDate;
      switch (range) {
      case 'today':
        startDate = moment();
        endDate = moment();
        break;
      case 'this_week':
        startDate = moment().startOf('week');
        endDate = moment().endOf('week');
        break;
      case 'this_month':
        startDate = moment().startOf('month');
        endDate = moment().endOf('month');
        break;
      case 'this_year':
        startDate = moment().startOf('year');
        endDate = moment().endOf('year');
        break;
      case 'yesterday':
        startDate = moment().subtract(1, 'days');
        endDate = moment().subtract(1, 'days');
        break;
      case 'last_week':
        startDate = moment().subtract(1, 'weeks').startOf('week');
        endDate = moment().subtract(1, 'weeks').endOf('week');
        break;
      case 'last_month':
        startDate = moment().subtract(1, 'months').startOf('month');
        endDate = moment().subtract(1, 'months').endOf('month');
        break;
      case 'last_year':
        startDate = moment().subtract(1, 'years').startOf('year');
        endDate = moment().subtract(1, 'years').endOf('year');
        break;
      }

      const parentContainer = $(target.parentElement);
      if (parentContainer.length) {
        const filter = parentContainer.data('filter-target');
        const startInput = $(`[name="search[${filter}_start]"]`);
        const endInput = $(`[name="search[${filter}_end]"]`);
        startInput.val(startDate.format('YYYY-MM-DD'););
        endInput.val(endDate.format('YYYY-MM-DD'););
      }
    }

    $('.search-date-filter .dropdown-item').on('click', function(event) {
      event.preventDefault();
      const range = $(this).data('range');
      setDateRange(this, range);
    });
  }
}
