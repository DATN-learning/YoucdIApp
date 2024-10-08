import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Notifications} from 'react-native-notifications';
import {createDeviceToken} from '../api/authLogin';
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFCMToken();
  }
}

const GetFCMToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
    try {
      let fcmToken = await messaging().getToken();
      if (fcmToken) {
        try {
          const date = new Date();
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const datetoken = `${day}${month}${year}${fcmToken[0]}`;
          const res = await createDeviceToken(datetoken, fcmToken);
          if (res.status === 200) {
            if (res.data.status) {
              AsyncStorage.setItem('fcmToken', fcmToken);
            }
          }
        } catch (error) {
          console.log('error', error);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  } else {
    console.log('fcmToken okok', fcmToken);
  }
};

const NotificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    if (remoteMessage.notification) {
      let someLocalNotification = Notifications.postLocalNotification({
        badge: 1,
        identifier: 'someLocalNotification',
        title: remoteMessage.notification.title
          ? remoteMessage.notification.title
          : 'Title',
        body: remoteMessage.notification.body
          ? remoteMessage.notification.body
          : 'Body',
        type: 'local',
        payload: {
          someData: 'goes here',
        },
        sound: 'chime.aiff',
        thread: 'thread1',
      });
      // custom icon for local notification
    }
  });
};

export {requestUserPermission, GetFCMToken, NotificationListener};
