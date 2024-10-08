import {NativeModules} from 'react-native';
import React, {FC, Suspense} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import InnerApp from './InnerApp';
import {
  Notifications,
  Registered,
  RegistrationError,
} from 'react-native-notifications';
import {PersistGate} from 'redux-persist/integration/react';
import {
  NotificationListener,
  requestUserPermission,
} from './utils/pushnotification_helper';
import {AuthProvider} from './configs/AuthProvider';
import {Provider} from 'react-redux';
import {store, persistor} from './redux/store';
import Splashscreen from './screens/Splashscreen';
import {SocketProvider} from './configs/SocketProvider';
const App: FC = () => {
  React.useEffect(() => {
    console.log('App.tsx');
    Notifications.registerRemoteNotifications();
    Notifications.events().registerRemoteNotificationsRegistered(
      (event: Registered) => {
        // TODO: Send the token to my server so it could send back push notifications...
        console.log('Device Token Received', event.deviceToken);
      },
    );
    Notifications.events().registerRemoteNotificationsRegistrationFailed(
      (event: RegistrationError) => {
        console.error(event);
      },
    );
    requestUserPermission();
    NotificationListener();
  }, []);
  return (
    //fallback UI
    <Suspense fallback={<Splashscreen />}> 
      <NavigationContainer>
        <SocketProvider>
          <AuthProvider>
            <Provider store={store}>
              <PersistGate loading={<Splashscreen />} persistor={persistor}>
                <PaperProvider>
                  <InnerApp />
                </PaperProvider>
              </PersistGate>
            </Provider>
          </AuthProvider>
        </SocketProvider>
      </NavigationContainer>
    </Suspense>
  );
};

export default App;
