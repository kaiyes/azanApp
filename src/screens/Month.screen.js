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

export default function Month({ navigation }) {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.topCard}>
          <Text style={styles.salahName}>asr</Text>
        </View>
        <View style={styles.bottomCard}>
          <Text style={styles.textContainer}>
            Fajr : 5.45 AM
          </Text>
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  topCard: {
    backgroundColor: 'limegreen',
    flexDirection: 'row',
    alignItems: 'center'
  }
})
