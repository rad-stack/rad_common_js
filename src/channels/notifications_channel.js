import consumer from './consumer';
import { Toast } from 'rad_common_js/src/toast';

consumer.subscriptions.create('NotificationsChannel', {
  connected() {},

  disconnected() {},

  received(data) {
    Toast.success(
      data.notification.content,
      `${data.notification.content}${data.notification.record ? `: ${data.notification.record}` : ''}`
    );
    
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
