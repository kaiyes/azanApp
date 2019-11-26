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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

//utility

export default function Month({ navigation }) {
  const salahNames = [
    'Fajr',
    'Sunrise',
    'Dhuhr',
    'Asr',
    'Maghrib',
    'Isha'
  ]
  const dates = new Array(30).fill('1st May')

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
          {dates.map(() => (
            <View style={styles.salahTimeRow}>
              <Text style={styles.salahName}>01 May</Text>
              <Text style={styles.salahTime}>5: 43</Text>
              <Text style={styles.salahTime}>5: 43</Text>
              <Text style={styles.salahTime}>5: 43</Text>
              <Text style={styles.salahTime}>5: 43</Text>
              <Text style={styles.salahTime}>5: 43</Text>
              <Text style={styles.salahTime}>5: 43</Text>
            </View>
          ))}
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
    marginTop: hp('1%'),
    marginRight: wp('2%')
  },
  salahName: {
    fontSize: 15,
    fontWeight: '600'
  },
  salahTimeRow: {
    flexDirection: 'row',

    justifyContent: 'space-around',
    marginTop: hp('1.2%'),
    marginRight: wp('1.2%')
  },
  salahTime: {
    fontSize: 14,
    fontWeight: '400'
  }
})
