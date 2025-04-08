import { useNotifications } from '../hooks/useNotification';
import './style.css'

export const NotificationManager = () => {
  const {
    permission,
    requestPushPermission,
    showNotificationWithBody,
    showNotificationWithoutBody,
    isSupported,
    isLoading
  } = useNotifications();

  const handleEnableNotifications = async () => {
    await requestPushPermission();
  };

  if (!isSupported) {
    return <div>Ваш браузер не поддерживает уведомления</div>;
  }

  return (
    <div>
      <h2>Тест уведомлений</h2>
      <p>Текущий статус: {permission}</p>
      
      {permission === 'granted' ? (
        <div className='btns'>
          <button onClick={showNotificationWithBody}>
            Показать тестовое уведомление
          </button>
          <button onClick={showNotificationWithoutBody}>
            Показать тестовое уведомление с дефолтными значениями
          </button>
        </div>
      ) : (
        <button onClick={handleEnableNotifications}>
          Запросить разрешение
        </button>
      )}

      {
        isLoading &&
        <div>
          Загрузка...
        </div>
      }
    </div>
  );
};