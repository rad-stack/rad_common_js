export class Toast {
  static success(title, message, time = 5000, url = null) {
    document.querySelector('#toast-nav .toast-header').classList.remove('toast-error');
    document.querySelector('#toast-nav .toast-header').classList.add('toast-success');
    Toast.display(title, message, time, 'polite', 'status', url);
  }

  static error(title, message, time = 5000, url = null) {
    document.querySelector('#toast-nav .toast-header').classList.remove('toast-success');
    document.querySelector('#toast-nav .toast-header').classList.add('toast-error');
    Toast.display(title, message, time, 'assertive', 'alert', url);
  }

  static display(title, message, time = 5000, politeness = 'polite', alertType = 'alert', url = null) {
    if (url) {
      document.querySelector('#toast-nav-link').setAttribute('href', url);
      document.querySelector('#toast-nav-link').classList.remove('d-none');
    } else {
      document.querySelector('#toast-nav-link').classList.add('d-none');
    }
    document.querySelector('#toast-nav-title').innerHTML = title;
    document.querySelector('#toast-nav-message').innerHTML = message;
    
    const toastElement = document.querySelector('#toast-nav .toast');
    toastElement.setAttribute('data-delay', time);
    toastElement.setAttribute('aria-polite', politeness);
    toastElement.setAttribute('aria-alert', alertType);

    $('#toast-nav .toast').toast('show');
  }
}
