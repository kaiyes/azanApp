import React, { Component, useEffect } from 'react'
import { NavigationNativeContainer } from '@react-navigation/native'
import useInterval from '@use-it/interval'
import PushNotification from 'react-native-push-notification'
import { formatISO } from 'date-fns'

import Navigator from './src/navigation'
import Time from './src/utility/helsingborg'

export default function App() {
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
      console.log('TOKEN:', token)
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
      console.log('NOTIFICATION:', notification)

      // process the notification

      // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
      notification.finish(
        PushNotificationIOS.FetchResult.NoData
      )
    },

    // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: 'YOUR GCM (OR FCM) SENDER ID',

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: true
  })

  function localNotification() {
    PushNotification.localNotification({
      title: 'Local Notification',
      message: 'My Notification Message',
      playSound: true,
      soundName: 'default',
      actions: '["Yes", "No"]'
    })
  }

  function scheduleNotification(salahName, salahTime) {
    PushNotification.localNotificationSchedule({
      date: salahTime,
      title: `${salahName} Salah`,
      message: '5 minutes to Salah',
      playSound: true,
      soundName: 'default'
    })
  }

  useEffect(async () => {
    let monthlyTime = await Time.filter(item => {
      return (
        item[0] == new Date().getMonth() + 1 &&
        item[1] == new Date().getDate()
      )
    })
    let dailyTimes = monthlyTime[0].slice(2)
    let year = new Date().getFullYear()
    let month = new Date().getMonth()
    let date = new Date().getDate()
    let second = 0
    let fajr = new Date(
      year,
      month,
      date,
      dailyTimes[0].split(':')[0],
      dailyTimes[0].split(':')[1],
      second
    )
    let dhuhr = new Date(
      year,
      month,
      date,
      dailyTimes[2].split(':')[0],
      dailyTimes[2].split(':')[1],
      second
    )
    let asr = new Date(
      year,
      month,
      date,
      dailyTimes[3].split(':')[0],
      dailyTimes[3].split(':')[1],
      second
    )
    let maghrib = new Date(
      year,
      month,
      date,
      dailyTimes[4].split(':')[0],
      dailyTimes[4].split(':')[1],
      second
    )
    let isha = new Date(
      year,
      month,
      date,
      dailyTimes[5].split(':')[0],
      dailyTimes[5].split(':')[1],
      second
    )
    console.log(isha)
    scheduleNotification('Fajr', fajr)
    scheduleNotification('Dhuhr', dhuhr)
    scheduleNotification('Asr', asr)
    scheduleNotification('Isha', maghrib)
    scheduleNotification('Isha', isha)
  }, [])

  return (
    <NavigationNativeContainer>
      <Navigator />
    </NavigationNativeContainer>
  )
}

//
// useEffect(async () => {
//   let monthlyTime = await Time.filter(item => {
//     return (
//       item[0] == new Date().getMonth() + 1 &&
//       item[1] == new Date().getDate()
//     )
//   })
//   let dailyTimes = monthlyTime[0].slice(2)
//   let year = new Date().getFullYear()
//   let month = new Date().getMonth()
//   let date = new Date().getDate()
//   let second = 0
//   let fajr = new Date(year, month, date, 18, 28, second)
//   let dhuhr = new Date(year, month, date, 18, 29, second)
//   let asr = new Date(year, month, date, 18, 30, second)
//   let magr = new Date(year, month, date, 18, 31, second)
//   let isha = new Date(year, month, date, 18, 32, second)
//   scheduleNotification('Fajr', fajr)
//   scheduleNotification('Dhuhr', dhuhr)
//   scheduleNotification('Asr', asr)
//   scheduleNotification('Isha', magr)
//   scheduleNotification('Isha', isha)
// }, [])
