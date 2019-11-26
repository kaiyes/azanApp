import React, { useEffect, useState } from 'react'
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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import useInterval from '@use-it/interval'
//utility
import Time from '../utility/helsingborg'

export default function Month({ navigation }) {
  const [dates, setDates] = useState([])
  const [month, setMonth] = useState('')

  const salahNames = [
    'Fajr',
    'Sunrise',
    'Dhuhr',
    'Asr',
    'Maghrib',
    'Isha'
  ]

  async function getDate() {
    let today = new Date()
    let currentMonth = today.getMonth() + 1
    let monthName = today.toLocaleString('default', {
      month: 'short'
    })
    setMonth(monthName)
    let time = await Time.filter(item => {
      return item[0] == currentMonth
    })
    await setDates(time)
  }

  function whichStyle() {
    return dates[1] == new Date().getDate()
      ? 'styles.salahTimeRow'
      : `[styles.salahTimeRow, { backgroundColor: 'lightgray' }]`
  }

  useEffect(() => {
    getDate()
  }, [])

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.headline}>
          Monthly Schedule
        </Text>
        <ScrollView>
          <View style={styles.salahNameRow}>
            {salahNames.map(name => (
              <Text style={styles.salahName}>{name}</Text>
            ))}
          </View>
          {dates === [] ? (
            <Text style={styles.waitText}>
              please wait a bit while we load the dates
            </Text>
          ) : (
            dates.map(item => (
              <View
                style={
                  item[1] === new Date().getDate()
                    ? [
                        styles.salahTimeRow,
                        {
                          backgroundColor: 'lightgray',
                          height: hp('3%'),
                          alignItems: 'center'
                        }
                      ]
                    : styles.salahTimeRow
                }
                key={item[1]}
              >
                <Text style={styles.month}>
                  {item[1]} {month}
                </Text>
                <Text style={styles.salahTime}>5: 43</Text>
                <Text style={styles.salahTime}>5: 43</Text>
                <Text style={styles.salahTime}>5: 43</Text>
                <Text style={styles.salahTime}>5: 43</Text>
                <Text style={styles.salahTime}>5: 43</Text>
                <Text style={styles.salahTime}>5: 43</Text>
              </View>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'honeydew'
  },
  headline: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: hp('2%'),
    marginLeft: wp('5%')
  },
  salahNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: wp('17%'),
    marginTop: hp('1.1%'),
    marginRight: wp('2%')
  },
  salahName: {
    fontSize: 15,
    fontWeight: '600'
  },
  salahTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: hp('1.1%'),
    marginRight: wp('1.2%')
  },
  salahTime: {
    fontSize: 14,
    fontWeight: '400'
  },
  waitText: {
    fontSize: 33,
    fontWeight: '600'
  },
  month: {
    fontSize: 14,
    fontWeight: '700',
    color: 'dimgray'
  }
})
