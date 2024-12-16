import moment from 'moment';

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
        case 'clear':
          startDate = null;
          endDate = null;
          break;
      }

      const parentContainer = $(target.parentElement);
      if (parentContainer.length) {
        const filterStart = parentContainer.data('filter-target-start');
        const filterEnd = parentContainer.data('filter-target-end');
        const form = parentContainer.closest('form');
        const startInput = form.find(filterStart);
        const endInput = form.find(filterEnd);
      
        if (startInput.length && endInput.length) {
          startInput.val(startDate ? startDate.format('YYYY-MM-DD') : '');
          endInput.val(endDate ? endDate.format('YYYY-MM-DD') : '');
        }
      }
    }

    $('.search-date-filter .dropdown-item').on('click', function(event) {
      event.preventDefault();
      const range = $(this).data('range');
      setDateRange(this, range);
    });
  }
}
