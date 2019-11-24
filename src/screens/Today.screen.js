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
import { Icon } from 'react-native-elements'
//utility

export default function Today({ navigation }) {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.topCard}>
          <Text style={styles.salahName}>Asr</Text>
          <Text style={styles.salahTime}>6.45 AM</Text>
          <Text style={styles.timeLeft}>- 00.05.16</Text>
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
                Dhaka, 24 November
              </Text>
              <Text style={styles.arabicDate}>
                12 Robiul Awwal
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
                15:00
              </Text>
              <Icon
                name="bell"
                type="antdesign"
                containerStyle={styles.alarmIcon}
              />
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
    height: hp('40%')
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
    fontWeight: '300'
  },
  salahTime: {
    fontSize: hp('5%'),
    color: 'white',
    fontWeight: '400'
  },
  timeLeft: {
    fontSize: hp('2%'),
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
    borderBottomColor: 'darkgrey'
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
    justifyContent: 'space-between'
  },
  alarmRow: {
    flexDirection: 'row',
    marginRight: wp('5%')
  }
})
