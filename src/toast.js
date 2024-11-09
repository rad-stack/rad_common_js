export class Toast {
  static toastCount = 0; // Keep track of the number of toasts

  static success(title, message, time = 5000) {
    Toast.display(title, message, time, 'toast-success', 'polite', 'status');
  }

  static error(title, message, time = 5000) {
    Toast.display(title, message, time, 'toast-error', 'assertive', 'alert');
  }

  static display(title, message, time = 5000, toastClass, politeness = 'polite', alertType = 'alert') {
    // Increment the toast count
    Toast.toastCount += 1;

    // Get the toast container
    const toastContainer = document.getElementById('toast-container');

    // Create a new toast element
    const toastElement = document.createElement('div');
    toastElement.classList.add('toast', 'shadow', 'hide');
    toastElement.setAttribute('aria-atomic', 'true');
    toastElement.setAttribute('aria-live', politeness);
    toastElement.setAttribute('role', alertType);
    toastElement.setAttribute('data-delay', time);

    // Set z-index based on the toast count
    toastElement.style.zIndex = 1080 + Toast.toastCount; // Ensure it's above other elements

    // Position the toast
    toastElement.style.bottom = `${(Toast.toastCount - 1) * 10}px`; // Adjust overlap
    toastElement.style.right = '0';

    // Create the toast header
    const toastHeader = document.createElement('div');
    toastHeader.classList.add('toast-header', 'px-3', toastClass);

    const toastTitle = document.createElement('h5');
    toastTitle.classList.add('mr-auto', 'pt-2');
    toastTitle.style.margin = '0';
    toastTitle.innerHTML = title;

    const closeButton = document.createElement('button');
    closeButton.classList.add('ml-2', 'mb-1', 'close');
    closeButton.setAttribute('aria-label', 'Close');
    closeButton.setAttribute('data-dismiss', 'toast');
    closeButton.setAttribute('type', 'button');

    const closeSpan = document.createElement('span');
    closeSpan.setAttribute('aria-hidden', 'true');
    closeSpan.innerHTML = '&times;';

    closeButton.appendChild(closeSpan);
    toastHeader.appendChild(toastTitle);
    toastHeader.appendChild(closeButton);

    // Create the toast body
    const toastBody = document.createElement('div');
    toastBody.classList.add('toast-body');
    toastBody.style.margin = '0';

    const toastMessage = document.createElement('div');
    toastMessage.classList.add('lead', 'p-2');
    toastMessage.style.margin = '0';
    toastMessage.innerHTML = message;

    toastBody.appendChild(toastMessage);

    // Assemble the toast
    toastElement.appendChild(toastHeader);
    toastElement.appendChild(toastBody);

    // Append the toast to the container
    toastContainer.appendChild(toastElement);

    // Initialize and show the toast
    $(toastElement).toast('show');

    // Remove the toast from the DOM after it hides
    $(toastElement).on('hidden.bs.toast', function () {
      toastElement.remove();
      Toast.toastCount -= 1;
      Toast.updateToastPositions();
    });
  }

  // Update positions of existing toasts when one is removed
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