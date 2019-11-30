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
import { Icon, CheckBox } from 'react-native-elements'
import Modal from 'react-native-modal'
//utility
import Time from '../utility/helsingborg'
import Months from '../utility/months'

export default function Month({ navigation }) {
  const [dates, setDates] = useState([])
  const [monthShort, setMonthShort] = useState('')
  const [monthLong, setMonthLong] = useState('')
  const [modal, setModal] = useState(false)

  const salahNames = [
    'Fajr',
    'Sunrise',
    'Dhuhr',
    'Asr',
    'Maghrib',
    'Isha'
  ]

  async function getDate() {
    let monthObject = Months.find(
      item => item.number == new Date().getMonth() + 1
    )
    console.log(monthObject)
    setMonthShort(monthObject.short)
    setMonthLong(monthObject.long)

    let time = await Time.filter(item => {
      return item[0] == new Date().getMonth() + 1
    })
    await setDates(time)
  }

  async function changeMonth(monthName) {
    let month = Months.find(item => item.long == monthName)
    setMonthShort(month.short)
    setMonthLong(month.long)
    let time = Time.filter(item => {
      return item[0] == month.number
    })
    setDates(time)
  }

  useEffect(() => {
    getDate()
  }, [])

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headline}>{monthLong}</Text>
        <TouchableOpacity
          onPress={() => {
            setModal(true)
          }}
        >
          <Icon
            name="menu"
            type="entypo"
            containerStyle={styles.menu}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.salahNameRow}>
        {salahNames.map(name => (
          <Text style={styles.salahName}>{name}</Text>
        ))}
      </View>
      <ScrollView>
        {dates === [] ? (
          <Text style={styles.waitText}>
            please wait a bit while we load the dates
          </Text>
        ) : (
          dates.map(item => (
            <View
              style={
                item[0] === new Date().getMonth() + 1 &&
                item[1] === new Date().getDate()
                  ? [
                      styles.salahTimeRow,
                      {
                        backgroundColor: 'palegreen',
                        height: hp('3%'),
                        alignItems: 'center',
                        borderRadius: wp('2%')
                      }
                    ]
                  : item[1] % 2 != 0
                  ? styles.salahTimeRow
                  : [
                      styles.salahTimeRow,
                      {
                        backgroundColor: 'gainsboro',
                        height: hp('3%'),
                        alignItems: 'center'
                      }
                    ]
              }
              key={item[1]}
            >
              <Text style={styles.month}>
                {item[1]} {monthShort}
              </Text>
              <Text style={styles.salahTime}>
                {item[2]}
              </Text>
              <Text style={styles.salahTime}>
                {item[3]}
              </Text>
              <Text style={styles.salahTime}>
                {item[4]}
              </Text>
              <Text style={styles.salahTime}>
                {item[5]}
              </Text>
              <Text style={styles.salahTime}>
                {item[6]}
              </Text>
              <Text style={styles.salahTime}>
                {item[7]}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
      <View style={styles.modalContainer}>
        <Modal
          isVisible={modal}
          onBackdropPress={() => {
            setModal(false)
          }}
        >
          <View style={styles.modal}>
            <TouchableOpacity
              onPress={() => {
                setModal(false)
              }}
            >
              <Icon
                name="closecircle"
                type="antdesign"
                containerStyle={styles.close}
              />
            </TouchableOpacity>
            {Months.map(item => (
              <View style={styles.monthRow}>
                <Text style={styles.monthNameModal}>
                  {item.long}
                </Text>
                <CheckBox
                  center
                  iconType="entypo"
                  uncheckedIcon="circle"
                  checkedIcon="controller-record"
                  checkedColor="lightgreen"
                  checked={
                    item.long === monthLong ? true : false
                  }
                  onPress={() => {
                    changeMonth(item.long)
                    setModal(false)
                  }}
                />
              </View>
            ))}
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  headline: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: wp('2%')
  },
  salahNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: wp('16%'),
    marginRight: wp('2%'),
    borderBottomWidth: 0.3,
    borderBottomColor: 'lightgray'
  },
  salahName: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  salahTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: wp('1%'),
    marginLeft: wp('1%'),
    marginRight: wp('1.2%')
  },
  salahTime: {
    fontSize: 13,
    fontWeight: '400',
    width: wp('12%'),
    textAlign: 'center'
  },
  waitText: {
    fontSize: 33,
    fontWeight: '600'
  },
  month: {
    fontSize: 12,
    fontWeight: '700',
    color: 'dimgray',
    width: wp('12%')
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('1%')
  },
  arrow: {
    marginHorizontal: wp('2%'),
    marginTop: hp('.4%')
  },
  menu: {
    marginRight: wp('3.5%')
  },
  modal: {
    width: wp('90%'),
    backgroundColor: 'white',
    paddingLeft: wp('12%'),
    paddingBottom: hp('4%'),
    marginTop: hp('1%')
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  monthNameModal: {
    fontSize: 17,
    fontWeight: '700',
    color: 'dimgray',
    width: wp('30%')
  },
  monthRow: {
    flexDirection: 'row',
    height: hp('6%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: wp('3%')
  },
  close: {
    marginLeft: wp('57%'),
    marginTop: hp('2%')
  }
})

// <>
//   <StatusBar barStyle="light-content" />
//   <SafeAreaView>
//     <View style={styles.header}>
//       <Text style={styles.headline}>{monthLong}</Text>
//       <TouchableOpacity
//         onPress={() => {
//           setModal(true)
//         }}
//       >
//         <Icon
//           name="menu"
//           type="entypo"
//           containerStyle={styles.menu}
//         />
//       </TouchableOpacity>
//     </View>
//     <View style={styles.salahNameRow}>
//       {salahNames.map(name => (
//         <Text style={styles.salahName}>{name}</Text>
//       ))}
//     </View>
