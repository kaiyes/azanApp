import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'
//Screens
import TodayScreen from './screens/Today.screen'
import MonthScreen from './screens/Month.screen'
import SplashScreen from './screens/Splash.screen'
import SettingScreen from './screens/Settings.screen'

//components
import IconWithBadge from './components/ChatIcon'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function Splash() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
      />
    </Stack.Navigator>
  )
}

function LoggedInStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size = 22 }) => {
          let iconName

          switch (route.name) {
            case 'Today':
              iconName = 'clockcircleo'
              break
            case 'Month':
              iconName = 'calendar'
              break
            case 'Settings':
              iconName = 'setting'
              break

              break
            default:
          }

          // You can return any component that you like here!
          return (
            <IconWithBadge
              name={iconName}
              type={'antdesign'}
              size={22}
              color={color}
              badgeCount={0}
            />
          )
        }
      })}
      tabBarOptions={{
        activeTintColor: 'seagreen',
        inactiveTintColor: 'dimgray'
      }}
    >
      <Tab.Screen name="Today" component={TodayScreen} />
      <Tab.Screen name="Month" component={MonthScreen} />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
      />
    </Tab.Navigator>
  )
}

export default function Navigator({ navigation }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return isLoading ? Splash() : LoggedInStack()
}
