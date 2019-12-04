import React, { Component, useEffect } from 'react'
import { NavigationNativeContainer } from '@react-navigation/native'
import useInterval from '@use-it/interval'
import PushNotification from 'react-native-push-notification'
import {
  isBefore,
  subMinutes,
  isToday,
  addDays,
  lightFormat
} from 'date-fns'
import AsyncStorage from '@react-native-community/async-storage'

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

  async function setSchedule(salahName, salahTime) {
    const value = await AsyncStorage.getItem(`@hasBeenSet`)
    if (value == null) {
      await AsyncStorage.setItem(`@${salahName}`, 'set')
      PushNotification.localNotificationSchedule({
        date: salahTime,
        title: `${salahName} Salah`,
        message: '5 minutes to Salah',
        playSound: true,
        soundName: 'default'
      })
    }
  }

  function setDelay(salahTime) {
    return subMinutes(salahTime, 5)
  }

  async function setTimer() {
    let monthlyTimes = await Time.filter(item => {
      return (
        item[0] == new Date().getMonth() + 1 &&
        item[1] == new Date().getDate()
      )
    })
    let dailyTimes = monthlyTimes[0].slice(2)
    let year = new Date().getFullYear()
    let month = new Date().getMonth()
    let date = new Date().getDate()
    let second = 0
    let fajr = new Date(
      year,
      month,
      date,
      // dailyTimes[0].split(':')[0],
      // dailyTimes[0].split(':')[1],
      11,
      20,
      second
    )
    let dhuhr = new Date(
      year,
      month,
      date,
      // dailyTimes[2].split(':')[0],
      // dailyTimes[2].split(':')[1],
      11,
      21,
      second
    )
    let asr = new Date(
      year,
      month,
      date,
      // dailyTimes[3].split(':')[0],
      // dailyTimes[3].split(':')[1],
      12,
      22,
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
      // dailyTimes[5].split(':')[0],
      // dailyTimes[5].split(':')[1],
      12,
      25,
      second
    )

    if (isBefore(new Date(), fajr)) {
      ;(await setSchedule('Fajr', setDelay(fajr))) &&
        (await setSchedule('Dhuhr', setDelay(dhuhr))) &&
        (await setSchedule('Asr', setDelay(asr))) &&
        (await setSchedule('Maghrib', setDelay(maghrib))) &&
        (await setSchedule('Isha', setDelay(isha)))
    }
    if (isBefore(new Date(), dhuhr)) {
      ;(await setSchedule('Dhuhr', setDelay(dhuhr))) &&
        (await setSchedule('Asr', setDelay(asr))) &&
        (await setSchedule('Maghrib', setDelay(maghrib))) &&
        (await setSchedule('Isha', setDelay(isha)))
    }
    if (isBefore(new Date(), asr)) {
      ;(await setSchedule('Asr', setDelay(asr))) &&
        (await setSchedule('Maghrib', setDelay(maghrib))) &&
        (await setSchedule('Isha', setDelay(isha)))
    }
    if (isBefore(new Date(), maghrib)) {
      ;(await setSchedule('Maghrib', setDelay(maghrib))) &&
        (await setSchedule('Isha', setDelay(isha)))
    }
    if (isBefore(new Date(), isha)) {
      await setSchedule('Isha', setDelay(isha))
    }
  }

  async function removeLocalData() {
    await AsyncStorage.multiRemove([
      '@Fajr',
      '@Dhuhr',
      '@Asr',
      '@Maghrib',
      '@Isha'
    ])
  }

  async function setToday() {
    let date = lightFormat(new Date(), 'yyyy-MM-dd')
    await AsyncStorage.setItem(`@today`, `${date}`)
  }

  async function checkIfToday() {
    let date = await AsyncStorage.getItem(`@today`)
    let today = lightFormat(new Date(), 'yyyy-MM-dd')
    return date === today
  }

  useEffect(async () => {
    // await removeLocalData()
    // PushNotification.cancelAllLocalNotifications()
    // await setTimer()
    console.log(await checkIfToday())
  }, [])

  // useInterval(async () => {
  //   console.log(
  //     'getstorage: ',
  //     await AsyncStorage.multiGet([
  //       '@Fajr',
  //       '@Dhuhr',
  //       '@Asr',
  //       '@Maghrib',
  //       '@Isha'
  //     ])
  //   )
  // }, 2000)

  return (
    <NavigationNativeContainer>
      <Navigator />
    </NavigationNativeContainer>
  )
}
