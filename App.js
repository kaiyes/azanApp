import React, { Component } from 'react'
import { NavigationNativeContainer } from '@react-navigation/native'
import PushNotification from 'react-native-push-notification'
import useInterval from '@use-it/interval'

import Navigator from './src/navigation'

export default function App() {
  function localNotification() {
    PushNotification.localNotification({
      title: 'Local Notification',
      message: 'My Notification Message',
      playSound: true,
      soundName: 'default',
      actions: '["Yes", "No"]'
    })
  }

  function scheduleNotification() {
    PushNotification.localNotificationSchedule({
      date: new Date(Date.now() + 5 * 1000),
      title: 'Asr Salah',
      message: '5 minutes to Salah',
      playSound: true,
      soundName: 'default'
    })
  }

  // useInterval(() => {
  //   scheduleNotification()
  // }, 2000)

  return (
    <NavigationNativeContainer>
      <Navigator />
    </NavigationNativeContainer>
  )
}
