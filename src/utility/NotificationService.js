import PushNotification from 'react-native-push-notification'

export default class NotificationService {
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

    function scheduleNotification() {
      PushNotification.localNotificationSchedule({
        date: new Date(Date.now() + 5 * 1000),
        title: 'Asr Salah',
        message: '5 minutes to Salah',
        playSound: true,
        soundName: 'default'
      })
    }

}
