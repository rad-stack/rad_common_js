import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['collapse'];

  static STORAGE_KEY = 'filters-collapsed';

  connect() {
    this.restoreState();
    this.setupEventListeners();
  }

  disconnect() {
    this.removeEventListeners();
  }

  setupEventListeners() {
    try {
      if (this.hasCollapseTarget) {
        this.handleShown = this.handleShown.bind(this);
        this.handleHidden = this.handleHidden.bind(this);

        this.collapseTarget.addEventListener('shown.bs.collapse', this.handleShown);
        this.collapseTarget.addEventListener('hidden.bs.collapse', this.handleHidden);
      }
    } catch { /**/ }
  }

  removeEventListeners() {
    try {
      if (this.hasCollapseTarget) {
        this.collapseTarget.removeEventListener('shown.bs.collapse', this.handleShown);
        this.collapseTarget.removeEventListener('hidden.bs.collapse', this.handleHidden);
      }
    } catch { /**/ }
  }

  handleShown() {
    try {
      localStorage.setItem(this.constructor.STORAGE_KEY, 'false');
    } catch { /**/ }
  }

  handleHidden() {
    try {
      localStorage.setItem(this.constructor.STORAGE_KEY, 'true');
    } catch { /**/ }
  }

  restoreState() {
    try {
      const isCollapsed = localStorage.getItem(this.constructor.STORAGE_KEY) === 'true';
      if (isCollapsed && this.collapseTarget?.classList.contains('show')) {
        this.collapseTarget.classList.remove('show');
      }
    } catch { /**/ }
  }
}
