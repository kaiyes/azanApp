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
import FakeUsers from '../utility/FakeUsers'

export default function List({ navigation }) {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={FakeUsers}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Details', {
                  username: `${item.cv.username}`,
                  id: item._id
                })
              }>
              <View style={styles.card}>
                <Avatar
                  medium
                  rounded
                  source={{ uri: item.cv.avatar }}
                  activeOpacity={0.5}
                  containerStyle={{ marginLeft: 10 }}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.username}>{item.cv.username}</Text>
                  <Text style={{ color: '#696456' }}>{item.cv.profession}</Text>
                  <Text style={{ color: '#696456' }}>{item.cv.age}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  card: {
    // backgroundColor: '#E3D5FC',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 5,
    marginTop: 5
  },
  textContainer: {
    margin: 20
  },
  username: {
    fontWeight: '900',
    fontSize: 14,
    color: '#4990E2',
    fontFamily: 'Helvetica Neue'
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(211, 233, 240, 0.78)'
  },
  blurredText: {
    color: '#314e79',
    fontSize: 26,
    fontWeight: '700'
  }
})

// {this.props.isApproved ? null : (
//   <View style={styles.absolute}>
//     <Text style={styles.blurredText}>Please Wait for approval</Text>
//     <View style={{ marginTop: 10 }} />
//   </View>
// )}
