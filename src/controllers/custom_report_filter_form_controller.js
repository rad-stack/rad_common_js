import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['columnSelect', 'typeSelect', 'labelInput', 'defaultValueInput'];
  static values = { filterTypesMap: Object };

  connect() {
    if (this.hasColumnSelectTarget) {
      this.columnChanged({ target: this.columnSelectTarget });
    }
    this.filterTypeChanged();
  }

  columnChanged(event) {
    const select = event.target;
    const selectedOption = select.options[select.selectedIndex];

    if (!selectedOption || !selectedOption.value) {
      this.resetTypeSelect([]);
      return;
    }

    const columnType = selectedOption.dataset.columnType;
    const isForeignKey = selectedOption.dataset.isForeignKey === 'true';
    const isEnum = selectedOption.dataset.isEnum === 'true';

    if (this.hasLabelInputTarget && select.value) {
      const columnName = select.value.split('.').pop();
      this.labelInputTarget.value = this.generateLabel(columnName);
    }

    let filterTypes = this.filterTypesMapValue[columnType] || this.filterTypesMapValue['string'] || [];

    if (isEnum) {
      filterTypes = [['Enum', 'RadSearch::EnumFilter']];
    } else if (!isForeignKey) {
      filterTypes = filterTypes.filter(filter => filter[1] !== 'RadSearch::SearchFilter');
    }

    this.resetTypeSelect(filterTypes);
  }

  filterTypeChanged() {
    const select = this.typeSelectTarget;
    const selectedOption = select.options[select.selectedIndex];

    if(selectedOption && selectedOption.value === 'RadSearch::SearchFilter') {
      this.defaultValueInputTarget.parentNode.classList?.remove('d-none');
    } else {
      this.defaultValueInputTarget.parentNode.classList?.add('d-none');
    }
  }

  resetTypeSelect(filterTypes) {
    this.typeSelectTarget.options.length = 0;
    filterTypes.forEach(([label, value]) => this.typeSelectTarget.add(new Option(label, value)));
    this.typeSelectTarget.selectedIndex = 0;
    this.filterTypeChanged();
  }

  generateLabel(columnName) {
    return columnName.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
  }
}
