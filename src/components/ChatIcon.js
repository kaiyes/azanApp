import React from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {Icon} from 'react-native-elements';

export default function IconWithBadge({
  name,
  badgeCount = 0,
  color,
  size,
  type,
}) {
  return (
    <View style={{width: 24, height: 24, margin: 5}}>
      <Icon name={name} type={type} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 13,
            height: 13,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 8, fontWeight: 'bold'}}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}
