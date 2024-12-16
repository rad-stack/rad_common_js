export class RadCommonGlobalSearch {
  static setup() {
    $('.search-option').click(function() {
      $('.global_search_scope').val($(this).data('search-scope'));
      $('.global_search_name').focus();
      $('.global_search_name').attr('placeholder', $(this).html());
      return $('.global_search_name').val('');
    });

    $('.global-search-autocomplete').bind('autocompleteselect', function(event, ui) {
      return RadCommonGlobalSearch.select_global_search_item($(this), event, ui);
    });
    $('.content .global-search-autocomplete').bind('autocompletefocus', function(event, ui) {
      return RadCommonGlobalSearch.select_global_search_item($(this), event, ui);
    });

    const highlightMatch = (text, term) => {
      var matchStart = text.toLowerCase().indexOf(term.toLowerCase());
      if (matchStart >= 0) {
        var beforeMatch = text.slice(0, matchStart);
        var matchText = text.slice(matchStart, matchStart + term.length);
        var afterMatch = text.slice(matchStart + term.length);
        return beforeMatch + '<span class="highlighted">' + matchText + '</span>' + afterMatch;
      }
      return text;
    };

    $('.global-search-autocomplete').each(function(index, object) {
      const instance = $(object).autocomplete().autocomplete('instance');
      instance._renderItem = function(ul, item) {
        $(ul).addClass('overflow-auto global-search-ul');

        const isGlobalSearch = (item.scope_description !== void 0 && $('.super_search').val() === '1');
        const card = $('<div class="card border-0 shadow-sm position-relative">');
        const additionalCardPadding = isGlobalSearch ? ' pt-4' : '';
        const cardBody = $(`<div class="card-body p-3${additionalCardPadding} border-bottom">`).appendTo(card);

        if (isGlobalSearch) {
          $(`<span class="badge badge-info card-badge-corner">${item.human_name}</span>`).appendTo(card);
        }

        const searchTerm = $(object).val();
        const labelHighlighted = highlightMatch(item.label.toString(), searchTerm);
        const firstRow = $('<div class="d-flex justify-content-between align-items-center mb-2">').appendTo(cardBody);
        $(`<div class="search-label font-weight-bold">${labelHighlighted}</div>`).appendTo(firstRow);

        if (item.hasOwnProperty('columns') && item.columns.length > 0) {
          const columnsContainer = $('<div class="d-flex flex-wrap text-muted">').appendTo(cardBody);
          const filteredColumns = item.columns.filter(column => column);
          filteredColumns.forEach((column, index) => {
            const columnText = column ? highlightMatch(column.toString(), searchTerm) : '';
            if (index > 0 && column && filteredColumns[index - 1]) {
              columnsContainer.append('<span class="px-1">|</span>');
            }
            if (column) {
              $(`<div class="p-1">${columnText}</div>`).appendTo(columnsContainer);
            }
          });
        }

        card.appendTo(ul);
        return card;
      };
    });
  
    $('.global_search_name').on('keyup keypress', function(e) {
      let code;
      code = e.keyCode || e.which;
      if (code === 13) {
        e.preventDefault();
        return false;
      }
    });

    this.superSearchEvents();
  }

  static select_global_search_item(item, event, ui) {
    let form;
    $('input[name=global_search_id]').val(ui.item.id);
    $('input[name=global_search_model_name]').val(ui.item.model_name);
    form = item.closest('form');
    return setTimeout((function() {
      form.submit();
    }), 300);
  }

  static superSearchEvents() {
    let defaultGlobalSearchPlaceholder = $('.global-search-autocomplete').attr('placeholder');

    $('.super_search').change(function() {
      if ($(this).prop('checked')) {
        return $(this).prop('checked', confirm('Are you sure you want to do a super (combined) search? This query may take a long time, selecting a normal query is preferred to get your results quickly and not bog down the system.'));
      }
    });

    if ($('.super_search').val() === '1') {
      $('.super_search').prop('checked', true);
      $('.global-search-autocomplete').attr('placeholder', 'Super Search');
      $('.global-search-dropdown').toggle();
    }
    $('.super_search').change(function(_event) {
      if ($(this).is(':checked')) {
        $('.super_search').val('1');
        $('.global-search-autocomplete').attr('placeholder', 'Super Search');
      } else {
        $('.super_search').val('0');
        $('.global-search-autocomplete').attr('placeholder', defaultGlobalSearchPlaceholder);
      }
      return $('.global-search-dropdown').toggle();
    });
  }
}
