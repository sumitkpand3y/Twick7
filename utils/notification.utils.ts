export const showNotification = (title: string, body: string, icon?: string): void => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: icon || '/favicon.ico',
    });
  }
};

export const requestNotificationPermission = async (): Promise<boolean> => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
};