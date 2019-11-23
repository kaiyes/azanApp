import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'
//Screens
import ListScreen from './screens/List.screen'
import DetailScreen from './screens/Details.screen'
import SplashScreen from './screens/Splash.screen'
import ChatScreen from './screens/Chat.screen'
import PaymentScreen from './screens/Payment.screen'
import MatchScreen from './screens/Match.screen'

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

function ListStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen
        name="Details"
        component={DetailScreen}
      />
    </Stack.Navigator>
  )
}

function SignUpStack() {
  return (
    <Stack.Navigator headerMode="none">
      <>
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
        />
        <Stack.Screen
          name="LogIn"
          component={LogInScreen}
        />
      </>
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
        activeTintColor: 'slateblue',
        inactiveTintColor: 'darkgrey'
      }}
    >
      <Tab.Screen name="Today" component={ListStack} />
      <Tab.Screen name="Month" component={ChatScreen} />
      <Tab.Screen name="Settings" component={MatchScreen} />
    </Tab.Navigator>
  )
}

export default function Navigator({ navigation }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isInLimbo, setLimbo] = useState(false)

  return isLoading ? Splash() : LoggedInStack()
}
