
export const publicVapidKey = 'BN7CbYBCrB_v82JEJiWV27C0_QsDtQZdGy9HTIlvnsT9Q_Ekg5BAqgKR0lOgvnfosTrCsJ2uqV3AmaonDRrLMMQ';

export function urlBase64ToUint8Array(base64String) {

  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  try {

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  } catch (error) {
    console.error('Ошибка декодирования Base64:', error);
    throw new Error('Неверный формат VAPID ключа');
  }
}

export async function saveSubscription(subscription) {

  const response = await fetch('http://localhost:3000/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription),
  });
  
  if (!response.ok) {
    throw new Error('Не удалось сохранить подписку');
  }
}