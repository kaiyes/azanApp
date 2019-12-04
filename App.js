import React, { Component, useEffect } from 'react'
import { NavigationNativeContainer } from '@react-navigation/native'
import useInterval from '@use-it/interval'
import PushNotification from 'react-native-push-notification'
import {
  isBefore,
  subMinutes,
  isToday,
  isMonday,
  isWednesday,
  addDays,
  lightFormat,
  toDate,
  format
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
    let date = lightFormat(new Date(), 'yyyy-MM-dd')
    const value = await AsyncStorage.getItem(
      `@${salahName}-${date}`
    )
    if (value == null) {
      await AsyncStorage.setItem(
        `@${salahName}-${date}`,
        'set'
      )
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
    let dailyTimes = await Time.filter(item => {
      return (
        item[0] == new Date().getMonth() + 1 &&
        item[1] == new Date().getDate()
      )
    })
    let fiveSalah = dailyTimes[0].slice(2)
    let year = new Date().getFullYear()
    let month = new Date().getMonth()
    let date = new Date().getDate()
    let second = 0
    let fajr = new Date(
      year,
      month,
      date,
      fiveSalah[0].split(':')[0],
      fiveSalah[0].split(':')[1],
      second
    )
    let dhuhr = new Date(
      year,
      month,
      date,
      fiveSalah[2].split(':')[0],
      fiveSalah[2].split(':')[1],
      second
    )
    let asr = new Date(
      year,
      month,
      date,
      fiveSalah[3].split(':')[0],
      fiveSalah[3].split(':')[1],
      second
    )
    let maghrib = new Date(
      year,
      month,
      date,
      fiveSalah[4].split(':')[0],
      fiveSalah[4].split(':')[1],
      second
    )
    let isha = new Date(
      year,
      month,
      date,
      fiveSalah[5].split(':')[0],
      fiveSalah[5].split(':')[1],
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

  async function setNextFlushDay() {
    let flushDay = lightFormat(
      addDays(new Date(), 1),
      'yyyy-MM-dd'
    )
    await AsyncStorage.setItem(`@flushDay`, `${flushDay}`)
  }

  async function onReachingNextDay() {
    let today = lightFormat(new Date(), 'yyyy-MM-dd')
    let flushDay = await AsyncStorage.getItem(`@flushDay`)
    console.log(today, flushDay)
    if (today === flushDay) {
      await setTimer()
      await setNextFlushDay()
    }
  }

  async function removeLocalData(date) {
    await AsyncStorage.multiRemove([
      `@Fajr-${date}`,
      `@Dhuhr-${date}`,
      `@Asr-${date}`,
      `@Maghrib-${date}`,
      `@Isha-${date}`
    ])
  }

  useEffect(async () => {
    await setTimer()
    await onReachingNextDay()
  }, [])

  // useInterval(async () => {
  //   AsyncStorage.clear()
  //   await PushNotification.cancelAllLocalNotifications()
  //   let today = lightFormat(new Date(), 'yyyy-MM-dd')
  //   console.log(today)
  // }, 2000)

  return (
    <NavigationNativeContainer>
      <Navigator />
    </NavigationNativeContainer>
  )
}

//is it monday ?
//      yeah it is.                      // no this ain't monday
//      okay then                                   Do Nothing
//          |
//   ---------------------
//   |                   |
//  is it the           Do Nothing
//  same monday
//        |
// ----------------
// |              |
// Do Nothing     run daily Timer() & weekly timer()
