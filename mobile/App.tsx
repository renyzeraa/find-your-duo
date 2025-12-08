import { useEffect, useRef } from "react";
import { StatusBar } from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from '@expo-google-fonts/inter'
import { EventSubscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';

import { Routes } from './src/routes';
import { Background } from "./src/components/Background";
import { Loading } from "./src/components/Loading";

import './src/service/notificationConfigs';
import { getPushNotificationToken } from "./src/service/getPushNotificationToken";

export default function App() {
  const getNotificationListener = useRef<EventSubscription | null>(null);
  const responseNotificationListener = useRef<EventSubscription | null>(null);

  useEffect(() => {
    getPushNotificationToken()
  }, []);

  useEffect(() => {
    getNotificationListener.current = Notifications.addNotificationReceivedListener((notification: any) => {
      console.log(notification)
    });

    responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener((response: any) => {
      console.log(response)
    });

    return () => {
      if (getNotificationListener.current && responseNotificationListener.current) {
        Notifications.removeNotificationSubscription(getNotificationListener.current);
        Notifications.removeNotificationSubscription(responseNotificationListener.current);
      }
    }
  }, []);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}

