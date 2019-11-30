import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { Avatar } from 'react-native-elements'
//utility
import PushNotification from 'react-native-push-notification'
import useInterval from '@use-it/interval'
import {
  toDate,
  parse,
  parseISO,
  lightFormat
} from 'date-fns'
import moment from 'moment'

export default function Settings({ navigation }) {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <TouchableOpacity>
          <Text style={styles.textContainer}>Settings</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    // backgroundColor: '#E3D5FC',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 5,
    marginTop: 5
  }
})
