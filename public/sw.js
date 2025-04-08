self.addEventListener('push', (event) => {
  console.log('Уведомление пришло');
  const data = event.data?.json();

  const title = data?.title || 'Новое уведомление';
  const options = {
    body: data?.body || 'Это дефолтное значение',
    data: data?.data || {},
    icon: data?.icon || 'notification.svg',
    vibrate: [200, 100, 200],
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  console.log('Уведомление было кликнуто');
  event.notification.close();
});