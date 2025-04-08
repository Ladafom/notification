import { useEffect } from 'react';

export function useServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('ServiceWorker зарегистрирован: ', registration.scope);
          })
          .catch(err => {
            console.log('Ошибка регистрации ServiceWorker: ', err);
          });
      });
    }
  }, []);
}