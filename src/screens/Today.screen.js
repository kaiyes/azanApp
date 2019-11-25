import React, { useState, useEffect } from 'react'
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
import { Icon } from 'react-native-elements'
import dayjs from 'dayjs'
import { toDate } from 'date-fns'

import { findIndex } from 'lodash'
//utility
import SalahTime from '../utility/helsingborg'

export default function Today({ navigation }) {
  const [icon, setIcon] = useState(false)
  const [time, setTime] = useState([])
  const [index, setIndex] = useState(0)

  async function getTime() {
    let month = (await dayjs().month()) + 1
    let date = await dayjs().date()
    let todaysTimeIndex = await findIndex(
      SalahTime,
      item => {
        return item[0] == month && item[1] == date
      }
    )
    await setIndex(todaysTimeIndex)
    await setTime(SalahTime[index])
  }

  function wakt(x, y) {
    let today = new Date()
    const salahTime = toDate(
      new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate(),
        x,
        y
      )
    )
    let diff = salahTime - today
    return diff
  }

  function whichWakt() {
    let salahTimes = time
      .splice(2)
      .map(item => item.split(':'))
    console.log(salahTimes)
    let ans = salahTimes.map(item => wakt(item[0], item[1]))
    let closestWakt = ans.reduce((acc, val) =>
      acc > val ? acc : val
    )
    console.log(closestWakt)
    return closestWakt
  }

  useEffect(() => {
    getTime()
    whichWakt()
  }, [index])

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.topCard}>
          <Text style={styles.salahName}>Dhuhr</Text>
          <Text style={styles.salahTime}>12:43</Text>
          <Text style={styles.timeLeft}> time to Asr </Text>
        </View>
        <View style={styles.bottomCard}>
          <View style={styles.topRow}>
            <View style={styles.dateHolder}>
              <Text style={styles.englishDate}>
                {dayjs().format('dddd, D MMM')}
              </Text>
              <Text style={styles.arabicDate}>
                {new Intl.DateTimeFormat(
                  'en-TN-u-ca-islamic',
                  {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  }
                ).format(Date.now())}
              </Text>
            </View>
          </View>
          <View style={styles.salahRow}>
            <Text style={styles.salahNameSmall}>Fajr</Text>
            <View style={styles.alarmRow}>
              <Text style={styles.salahTimeSmall}>
                {time[2]}
              </Text>
            </View>
          </View>
          <View style={styles.salahRow}>
            <Text style={styles.salahNameSmall}>
              Sunrise
            </Text>
            <View style={styles.alarmRow}>
              <Text style={styles.salahTimeSmall}>
                {time[3]}
              </Text>
            </View>
          </View>
          <View style={styles.salahRow}>
            <Text style={styles.salahNameSmall}>Dhuhr</Text>
            <View style={styles.alarmRow}>
              <Text style={styles.salahTimeSmall}>
                {time[4]}
              </Text>
            </View>
          </View>
          <View style={styles.salahRow}>
            <Text style={styles.salahNameSmall}>Asr</Text>
            <View style={styles.alarmRow}>
              <Text style={styles.salahTimeSmall}>
                {time[5]}
              </Text>
            </View>
          </View>
          <View style={styles.salahRow}>
            <Text style={styles.salahNameSmall}>
              Magrib
            </Text>
            <View style={styles.alarmRow}>
              <Text style={styles.salahTimeSmall}>
                {time[6]}
              </Text>
            </View>
          </View>
          <View style={styles.salahRow}>
            <Text style={styles.salahNameSmall}>Isha</Text>
            <View style={styles.alarmRow}>
              <Text style={styles.salahTimeSmall}>
                {time[7]}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'seagreen'
  },
  topCard: {
    backgroundColor: 'seagreen',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('43%')
  },
  bottomCard: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: wp('5%'),
    borderTopRightRadius: wp('5%'),
    alignItems: 'center'
  },
  salahName: {
    fontSize: hp('3%'),
    color: 'white',
    fontWeight: '400'
  },
  salahTime: {
    fontSize: hp('7%'),
    color: 'white',
    fontWeight: '300',
    marginVertical: hp('1%')
  },
  timeLeft: {
    fontSize: hp('2.3%'),
    color: 'white'
  },
  topRow: {
    flexDirection: 'row',
    height: hp('7%'),
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: wp('5%'),
    borderTopRightRadius: wp('5%'),
    borderBottomWidth: wp('.1%'),
    borderBottomColor: 'darkgrey',
    marginBottom: hp('1%')
  },
  directionHorizontal: {
    marginHorizontal: wp('4%')
  },
  dateHolder: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  englishDate: {
    fontWeight: '600'
  },
  arabicDate: {
    color: 'dimgray',
    marginTop: hp('.2%'),
    fontWeight: '500'
  },
  salahRow: {
    flexDirection: 'row',
    width: wp('100%'),
    justifyContent: 'space-between',
    marginVertical: hp('2%')
  },
  alarmRow: {
    flexDirection: 'row',
    marginRight: wp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('6%')
  },
  salahTimeSmall: {
    marginRight: wp('4%'),
    fontWeight: 'bold',
    fontSize: wp('3.4%')
  },
  salahNameSmall: {
    fontWeight: 'bold',
    marginLeft: wp('6%'),
    fontSize: wp('3.4%')
  }
})

//
// switch (dayjs().hour()) {
//   case parseInt(time[2].split(':')[0]) < dayjs().hour():
//     return ('fajr')
//     break
//   case parseInt(time[4].split(':')[0]) > dayjs().hour():
//     setSalah(['Dhuhr', time[3]])
//     break
//   case parseInt(time[5].split(':')[0]) < dayjs().hour():
//     setSalah(['Dhuhr', time[5]])
//     break
//   case parseInt(time[6].split(':')[0]) < dayjs().hour():
//     setSalah(['Dhuhr', time[6]])
//     break
//   case parseInt(time[7].split(':')[0]) < dayjs().hour():
//     setSalah(['Dhuhr', time[7]])
//     break
//   default:
// }
