export class RadSearch {
  static setup() {
    $(document).ready(function() {
      $('#save_and_apply_filters').click(function(e) {
        e.preventDefault();
        let filterName = window.prompt('Enter a filter name', '');
        if (filterName) {
          $('#search_saved_name').val(filterName);
        } else {
          window.alert('Name was not provided, filter could not be saved.');
        }
        $('.simple_form.search').submit();
      });

      var options = {
        ajax: {
          url: '/global_search',
          type: 'GET',
          dataType: 'json'
        },
        preprocessData: function(data) {
          let opts = [];
          const template = this.plugin.options.template;
          const showSubtext = this.plugin.options.subtext;
          if (!!template && !!template.clear_option && !this.plugin.selectpicker.val()) {
            opts.push(
              $.extend(true, { class: 'border-bottom' }, {
                text: this.plugin.options.template.clear_option,
                value: null
              })
            );
          }
          if (data.length) {
            data.forEach((item) =>
              opts.push($.extend(true, item, {
                text: item.label,
                value: item.id,
                data: {
                  subtext: showSubtext && !!item.columns ? item.columns.join(' ') : null
                }
              }))
            );
          }
          return opts;
        },
        preserveSelected: true,
        preserveSelectedPosition: 'before',
        locale: {
          statusInitialized: '',
          searchPlaceholder: 'Start typing to search',
          emptyTitle: 'Nothing selected'
        }
      };
      $('.selectpicker-search').selectpicker({ liveSearch: true }).ajaxSelectPicker(options);
    });
  }
}
