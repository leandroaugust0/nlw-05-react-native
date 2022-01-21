import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import * as Notifications from "expo-notifications";
import Routes from './src/routes'
import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost';
import { PlantProps } from './src/libs/storage';
import * as Brightness from 'expo-brightness';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular, Jost_600SemiBold
  });


  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === 'granted') {
        Brightness.setSystemBrightnessAsync(1.0);
      }
    })();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.plant as PlantProps;
        console.log(data);
      });

    return () => subscription.remove();

    //async function notifications() {
    // await Notifications.cancelAllScheduledNotificationsAsync();
    //const data = await Notifications.getAllScheduledNotificationsAsync();
    //console.log("##### Notificações Agendadas #####")
    //console.log(data)

    // }

    // notifications();
  }, [])

  if (!fontsLoaded)
    return <AppLoading />


  return (
    <Routes />
  )
}
