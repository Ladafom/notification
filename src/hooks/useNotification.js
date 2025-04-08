import { useState, useEffect } from 'react';
import { urlBase64ToUint8Array, saveSubscription, publicVapidKey } from '../utils/pushNotifications';

export const useNotifications = () => {
  const [permission, setPermission] = useState('default');
  const [isLoading, setisLoading] = useState(false);

  async function requestPushPermission() {
    if (!('serviceWorker' in navigator)) {
      console.error('Service Worker не поддерживается');
      return null;
    }
  
    if (!('PushManager' in window)) {
      console.error('Push API не поддерживается');
      return null;
    }
  
    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        throw new Error('Разрешение не получено');
      }

      setisLoading(true)
  
      const registration = await navigator.serviceWorker.ready;
  
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
      });
  
      await saveSubscription(subscription);
      setPermission(permission);
      setisLoading(false)
      return subscription;
    } catch (error) {
      console.error('Ошибка подписки на push-уведомления:', error);
      return null;
    }
  }

  async function showNotificationWithBody() {
    const response = await fetch('http://localhost:3000/notify-all', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Новое сообщение',
        body: 'У вас новое уведомление!',
        icon: '/public/crocodile.svg'
      })
    });
    
    if (!response.ok) {
      throw new Error('Не удалось сохранить подписку');
    }
  }

  async function showNotificationWithoutBody() {
    const response = await fetch('http://localhost:3000/notify-all', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!response.ok) {
      throw new Error('Не удалось сохранить подписку');
    }
  }

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  return {
    permission,
    requestPushPermission,
    showNotificationWithBody,
    showNotificationWithoutBody,
    isSupported: 'Notification' in window,
    isLoading
  };
};
