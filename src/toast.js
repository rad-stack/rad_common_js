export class Toast {
  static toastCount = 0;

  static success(title, message, time = 5000) {
    Toast.display(title, message, time, 'toast-success', 'polite', 'status');
  }

  static error(title, message, time = 5000) {
    Toast.display(title, message, time, 'toast-error', 'assertive', 'alert');
  }

  static display(
    title,
    message,
    time = 5000,
    toastClass,
    politeness = 'polite',
    alertType = 'alert'
  ) {
    Toast.toastCount += 1;

    const toastContainer = document.getElementById('toast-container');

    const toastElement = document.createElement('div');
    toastElement.classList.add('toast', 'shadow', 'hide');
    toastElement.setAttribute('aria-atomic', 'true');
    toastElement.setAttribute('aria-live', politeness);
    toastElement.setAttribute('role', alertType);
    toastElement.setAttribute('data-autohide', 'false');

    toastElement.style.zIndex = 1080 + Toast.toastCount;
    toastElement.style.bottom = `${(Toast.toastCount - 1) * 10}px`;
    toastElement.style.right = '0';

    toastElement.innerHTML = `
      <div class="toast-header px-3 ${toastClass}">
        <h5 class="mr-auto pt-2" style="margin: 0;">${title}</h5>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body" style="margin: 0;">
        <div class="lead p-2" style="margin: 0;">${message}</div>
      </div>
    `;

    toastContainer.appendChild(toastElement);

    const bootstrapToast = $(toastElement).toast({ autohide: false });

    bootstrapToast.toast('show');

    let hideTimeout;
    let startTime = Date.now();
    let remainingTime = time;

    function hideToast() {
      bootstrapToast.toast('hide');
    }

    function startHideTimer() {
      hideTimeout = setTimeout(hideToast, remainingTime);
      startTime = Date.now();
    }

    function pauseHideTimer() {
      clearTimeout(hideTimeout);
      remainingTime -= Date.now() - startTime;
    }

    startHideTimer();

    toastElement.addEventListener('mouseenter', () => {
      pauseHideTimer();
      toastContainer.classList.add('hovering-toast');
    });

    toastElement.addEventListener('mouseleave', () => {
      startHideTimer();
      toastContainer.classList.remove('hovering-toast');
    });

    $(toastElement).on('hidden.bs.toast', function () {
      toastElement.remove();
      Toast.toastCount -= 1;
      Toast.updateToastPositions();
    });
  }

  static updateToastPositions() {
    const toasts = document.querySelectorAll('#toast-container .toast');
    toasts.forEach((toast, index) => {
      toast.style.bottom = `${index * 10}px`;
      toast.style.zIndex = 1080 + index + 1;
    });
  }

  static setup() {
    const toastContainer = document.getElementById('toast-container');
    const successMessage = toastContainer && toastContainer.dataset.successMessage;

    if (successMessage) {
      Toast.success('Success!', successMessage);
    }

    const errorMessage = toastContainer && toastContainer.dataset.errorMessage;

    if (errorMessage) {
      Toast.error('Error!', errorMessage, 10000);
    }
  }
}
