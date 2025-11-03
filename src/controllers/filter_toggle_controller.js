import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['collapse'];
  static values = { behavior: String };

  connect() {
    this.applyBehavior();
  }

  disconnect() {
    this.removeEventListeners();
  }

  applyBehavior() {
    try {
      if (!this.hasCollapseTarget || !this.hasBehaviorValue) return;

      if (this.behaviorValue === 'remember_state') {
        this.restoreState();
        this.setupEventListeners();
      }
    } catch { /**/ }
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
      if (this.hasCollapseTarget && this.handleShown && this.handleHidden) {
        this.collapseTarget.removeEventListener('shown.bs.collapse', this.handleShown);
        this.collapseTarget.removeEventListener('hidden.bs.collapse', this.handleHidden);
      }
    } catch { /**/ }
  }

  handleShown() {
    try {
      localStorage.setItem(this.storageKey(), 'false');
    } catch { /**/ }
  }

  handleHidden() {
    try {
      localStorage.setItem(this.storageKey(), 'true');
    } catch { /**/ }
  }

  restoreState() {
    try {
      const isCollapsed = localStorage.getItem(this.storageKey()) === 'true';
      if (isCollapsed && this.collapseTarget?.classList.contains('show')) {
        this.collapseTarget.classList.remove('show');
      }
    } catch { /**/ }
  }

  storageKey() {
    return `filter-toggle-collapsed${window.location.pathname.replaceAll('/', '-')}`;
  }
}
