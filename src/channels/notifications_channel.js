import consumer from './consumer';
import { Toast } from 'rad_common_js/src/toast';

consumer.subscriptions.create('NotificationsChannel', {
  connected() {},

  disconnected() {},

  received(data) {
    let title = data.notification.content;
    const message = `${title}${data.notification.record ? `: ${data.notification.record}` : ''}`;

    if (data.notification.url) {
      title = `<a class="text-dark" href="${data.notification.url}">${title}</a>`;
    }

    Toast.success(title, message);
    
    const unreadCount = document.querySelectorAll('.unread-notification-count');
    if (unreadCount.length) {
      unreadCount.forEach((el) => {
        const newCount = Number(el.dataset.unreadCount) + 1;
        el.dataset.unreadCount = newCount;
        el.innerText = newCount;
  
        el.classList.add('badge-pulse');
  
        el.addEventListener('animationend', function handler() {
          el.classList.remove('badge-pulse');
          el.removeEventListener('animationend', handler);
        });
      });
    }
  }
});
