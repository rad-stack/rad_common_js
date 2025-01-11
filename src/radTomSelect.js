import TomSelect from 'tom-select';

export class RadTomSelect {
  static setup() {
    document.querySelectorAll('.selectpicker').forEach((el) => {
      if (el.tomselect) {
        return;
      }
      const plugins = ['dropdown_input'];
      if (el.multiple) {
        plugins.push('remove_button');
      }

      new TomSelect(el, {
        create: el.dataset.tsCreate === 'true',
        placeholder: 'Start typing to search',
        plugins,
        searchField: 'text',
        allowEmptyOption: !el.multiple
      });
    });

    document.querySelectorAll('.selectpicker-search').forEach((el) => {
      const plugins = ['dropdown_input'];
      if (el.multiple) {
        plugins.push('remove_button');
      }

      new TomSelect(el, {
        placeholder: 'Start typing to search',
        valueField: 'id',
        labelField: 'label',
        searchField: [],
        plugins,
        allowEmptyOption: true,
        create: false,

        load: function(query, callback) {
          if (!query.length) return callback();

          const searchScope = el.dataset.globalSearchScope || null;
          const excludedIds = el.dataset.excludedIds ? el.dataset.excludedIds.replaceAll(' ', ',') : '';
          const searchMode = el.dataset.searchMode;

          const params = new URLSearchParams({
            term: query,
            global_search_scope: searchScope,
            search_mode: searchMode,
            excluded_ids: excludedIds
          });

          fetch(`/global_search?${params.toString()}`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
          })
            .then(response => response.json())
            .then((data) => {
              this.clearOptions();
              this.clear();

              const results = data.map((item) => {
                return {
                  ...item,
                  subtext: item.columns ? item.columns.join(' ') : null
                };
              });

              if (!this.getValue()) {
                results.unshift({
                  id: '',
                  label: 'None',
                  subtext: null
                });
              }

              callback(results);
            })
            .catch(() => {
              callback();
            });
        },

        render: {
          option: function(item, escape) {
            const label = escape(item.label || '');
            const subtext = this.input.dataset.subtext === 'true' && item.subtext ?
              `<small class="text-muted">${escape(item.subtext)}</small>` :
              '';
            return `
              <div>
                <span>${label}</span>
                ${subtext ? ' &mdash; ' + subtext : ''}
              </div>
            `;
          },
          item: function(item, escape) {
            return `<div>${escape(item.label || '')}</div>`;
          }
        }
      });
    });
  }
}
