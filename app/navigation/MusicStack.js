import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MusicPlayerScreen from '../screens/main/music/MusicPlayer'
import MusicScreen from '../screens/main/music/Music'
import { colors, styleSheet } from '../styles'
import { StateContext } from '../context/StateContext'

const Stack = createNativeStackNavigator()

export default function MusicStack() {
  const { theme } = useContext(StateContext)
  const { text, primary } = colors(theme)
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: text,
      headerStyle: {
        backgroundColor: primary
      },
      headerLeft: ()=> null
    }}>
      <Stack.Screen name='Songs' component={MusicScreen} />
      <Stack.Screen name='Player' component={MusicPlayerScreen} />
    </Stack.Navigator>
  )
}