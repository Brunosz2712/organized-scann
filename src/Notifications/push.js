import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, shouldPlaySound: false, shouldSetBadge: false
  }),
});

export async function requestPushPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default', importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
  return status === 'granted';
}

export async function scheduleLocal(title, body) {
  return Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: { seconds: 3 }
  });
}
