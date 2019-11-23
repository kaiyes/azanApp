import React, { useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity
} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { includes } from 'lodash'
import { Icon } from 'react-native-elements'
//utility
import FakeCv from '../utility/FakeCv'
import FakeData from '../utility/FakeUsers'

function renderIconContainer(userGender) {
  const [gender, setGender] = useState('female')

  return (
    <View style={styles.iconsContainer}>
      {gender === userGender ? (
        <TouchableOpacity style={styles.icon} onPress={this._onChatPress}>
          <Image
            style={{ width: 73, height: 70 }}
            source={require('../assets/icons/Chat.png')}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

function renderAvatar() {
  const { pic, currentLocation, avatar } = FakeCv

  return (
    <SafeAreaView style={styles.photoContainer}>
      <Image style={styles.avatar} source={{ uri: avatar }} />
      <View style={styles.locationRow}>
        <Icon name="dot-single" type="entypo" color="#42f125" />
        <Text style={styles.locationText}>{currentLocation}</Text>
      </View>
    </SafeAreaView>
  )
}

function renderImage() {
  const { pic, currentLocation } = FakeCv

  return (
    <View style={styles.sliderContainer}>
      <ScrollView horizontal={true}>
        {pic.map((item, index) => {
          return (
            <Image source={{ uri: item }} imgStyle={styles.image} key={index} />
          )
        })}
      </ScrollView>
      <View style={styles.locationRow}>
        <Icon name="dot-single" type="entypo" color="#42f125" />
        <Text style={styles.locationText}>{currentLocation}</Text>
      </View>
    </View>
  )
}

// function renderIconContainer2() {
//   return (
//     <View style={styles.iconsContainer}>
//       <TouchableOpacity style={styles.icon} onPress={this._onChatPress}>
//         <Image source={require('../assets/icons/Chat.png')} />
//       </TouchableOpacity>
//
//       <TouchableOpacity style={styles.icon} onPress={this._onFavPress}>
//         <Image source={require('../assets/icons/Favourite.png')} />
//       </TouchableOpacity>
//
//       <TouchableOpacity style={styles.icon} onPress={this._makePhotoReq}>
//         <Image source={require('../assets/icons/Photo.png')} />
//       </TouchableOpacity>
//     </View>
//   )
// }

export default function Details({ route, navigation }) {
  const { username, id } = route.params
  const {
    age,
    pic,
    profession,
    education,
    homeDistrict,
    currentLocation,
    beard,
    height,
    hifzLevel,
    aboutMe,
    prayer,
    gender,
    practisingSince,
    avatar,
    photoApproved
  } = FakeCv

  return (
    <ScrollView style={styles.scrollView}>
      {includes(photoApproved, id) ? renderImage() : renderAvatar()}
      {1 > 0 ? renderIconContainer(gender) : null}
      <View style={styles.badgeContainer}>
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{age}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{profession}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{education}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{homeDistrict}</Text>
          </View>
        </View>

        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{beard}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{practisingSince}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{height}</Text>
          </View>
        </View>
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{hifzLevel}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{prayer}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.heading}>About Me</Text>
      <Text style={styles.aboutMe}>{aboutMe}</Text>
    </ScrollView>
  )
}

// ************************************************
//                     Styles                     *
// ************************************************

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white'
  },
  photoContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  sliderContainer: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  text: {
    color: 'black'
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('5.3%')
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('2.5%')
  },
  badgeContainer: {
    marginTop: hp('1%'),
    marginBottom: hp('1%')
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp('.74%')
  },
  badge: {
    backgroundColor: '#5D4A8F',
    padding: hp('1%'),
    borderRadius: hp('1%'),
    marginHorizontal: wp('.4%')
  },
  badgeText: {
    color: 'white',
    fontSize: hp('2.5%'),
    fontWeight: '500'
  },
  aboutMe: {
    color: 'black',
    fontWeight: '300',
    fontSize: hp('3%'),
    fontFamily: 'Helvetica Neue',
    marginTop: hp('.45%'),
    marginHorizontal: wp('4%')
  },

  heading: {
    color: 'black',
    fontWeight: '500',
    fontSize: hp('2.5%'),
    fontFamily: 'Helvetica Neue',
    marginTop: hp('3%'),
    marginHorizontal: wp('4%')
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    width: wp('53%'),
    height: Platform.OS === 'ios' ? hp('30%') : hp('35%'),
    borderRadius: wp('5%'),
    marginTop: hp('2%')
  },
  icon: {
    width: Platform.OS === 'ios' ? wp('19.4%') : wp('22%'),
    height: Platform.OS === 'ios' ? hp('10.5%') : hp('13%'),
    marginHorizontal: Platform.OS === 'ios' ? wp('2.5%') : wp('1.5%')
  },
  image: {
    width: wp('53%'),
    height: hp('29%')
  },
  locationText: {
    fontSize: hp('2.5%'),
    color: '#6d7774'
  },
  IconButtons: { width: 73, height: 70 }
})

// <DropdownAlert
//   ref={ref => (this.dropdown = ref)}
//   closeInterval={2000}
// />

// {includes(photoApproved, id)
//   ? renderImage()
//   : renderAvatar()}

// {this.props.paid === true
//   ? this.renderIconContainer()
//   : this.renderUnSubbedView()}
