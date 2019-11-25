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
//utility

// setFajr(Fajr)
// setDhuhr(Dhuhr)
// setAsr(Asr)
// setMagrib(Maghrib)
// setIsha(Isha)
// setSunrise(Sunrise)
// return null
//
// let {
//   Fajr,
//   Dhuhr,
//   Isha,
//   Asr,
//   Maghrib,
//   Sunrise
// } = await getTime()

// const [dhuhr, setDhuhr] = useState('')
// const [magrib, setMagrib] = useState('')
// const [isha, setIsha] = useState('')
// const [asr, setAsr] = useState('')
// const [sunrise, setSunrise] = useState('')

export default function Today({ navigation }) {
  const [icon, setIcon] = useState(false)
  const [time, setTime] = useState('')

  async function getTime() {
    let res = await fetch(
      'https://api.pray.zone/v2/times/today.json?city=dhaka'
    )
    let parsed = await res.json()
    let time = await parsed.results.datetime[0].times
    setTime(time)
  }

  useEffect(() => {
    getTime()
  }, [])

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.topCard}>
          <Text style={styles.salahName}>Asr</Text>
          <Text style={styles.salahTime}>6.45 AM</Text>
          <Text style={styles.timeLeft}> time to Asr </Text>
        </View>
        <View style={styles.bottomCard}>
          <View style={styles.topRow}>
            <TouchableOpacity>
              <Icon
                name="left"
                type="antdesign"
                containerStyle={styles.directionHorizontal}
              />
            </TouchableOpacity>
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
            <TouchableOpacity>
              <Icon
                name="right"
                type="antdesign"
                containerStyle={styles.directionHorizontal}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.salahRow}>
            <Text style={styles.salahNameSmall}>Fajr</Text>
            <View style={styles.alarmRow}>
              <Text style={styles.salahTimeSmall}>
                {time.Fajr}
              </Text>
              {icon ? (
                <TouchableOpacity
                  onPress={() => {
                    setIcon(false)
                  }}
                >
                  <Icon
                    name="bell"
                    type="feather"
                    size={20}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setIcon(true)
                  }}
                >
                  <Icon
                    name="bell-off"
                    type="feather"
                    size={20}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.salahRow}>
            <Text style={styles.salahNameSmall}>
              Sunrise
            </Text>
            <View style={styles.alarmRow}>
              <Text style={styles.salahTimeSmall}>
                {time.Sunrise}
              </Text>
              {icon ? (
                <TouchableOpacity
                  onPress={() => {
                    setIcon(false)
                  }}
                >
                  <Icon
                    name="bell"
                    type="feather"
                    size={20}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setIcon(true)
                  }}
                >
                  <Icon
                    name="bell-off"
                    type="feather"
                    size={20}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.salahRow}>
            <Text style={styles.salahNameSmall}>Dhuhr</Text>
            <View style={styles.alarmRow}>
              <Text style={styles.salahTimeSmall}>
                {time.Dhuhr}
              </Text>
              {icon ? (
                <TouchableOpacity
                  onPress={() => {
                    setIcon(false)
                  }}
                >
                  <Icon
                    name="bell"
                    type="feather"
                    size={20}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setIcon(true)
                  }}
                >
                  <Icon
                    name="bell-off"
                    type="feather"
                    size={20}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.salahRow}>
            <Text style={styles.salahNameSmall}>Asr</Text>
            <View style={styles.alarmRow}>
              <Text style={styles.salahTimeSmall}>
                {time.Asr}
              </Text>
              {icon ? (
                <TouchableOpacity
                  onPress={() => {
                    setIcon(false)
                  }}
                >
                  <Icon
                    name="bell"
                    type="feather"
                    size={20}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setIcon(true)
                  }}
                >
                  <Icon
                    name="bell-off"
                    type="feather"
                    size={20}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.salahRow}>
            <Text style={styles.salahNameSmall}>
              Magrib
            </Text>
            <View style={styles.alarmRow}>
              <Text style={styles.salahTimeSmall}>
                {time.Maghrib}
              </Text>
              {icon ? (
                <TouchableOpacity
                  onPress={() => {
                    setIcon(false)
                  }}
                >
                  <Icon
                    name="bell"
                    type="feather"
                    size={20}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setIcon(true)
                  }}
                >
                  <Icon
                    name="bell-off"
                    type="feather"
                    size={20}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.salahRow}>
            <Text style={styles.salahNameSmall}>Isha</Text>
            <View style={styles.alarmRow}>
              <Text style={styles.salahTimeSmall}>
                {time.Isha}
              </Text>
              {icon ? (
                <TouchableOpacity
                  onPress={() => {
                    setIcon(false)
                  }}
                >
                  <Icon
                    name="bell"
                    type="feather"
                    size={20}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setIcon(true)
                  }}
                >
                  <Icon
                    name="bell-off"
                    type="feather"
                    size={20}
                  />
                </TouchableOpacity>
              )}
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
    justifyContent: 'space-between',
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
    alignItems: 'center'
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
