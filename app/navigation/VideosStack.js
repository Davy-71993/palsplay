import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Videos from '../screens/main/videos/Videos'
import PlayerScreen from '../screens/main/videos/VideoPlayerScreen'

const Stack = createNativeStackNavigator()

export default function VideosStack() {
  return (
    <Stack.Navigator screenOptions={{
      header: ()=> null
    }}>
      <Stack.Screen name='Thumbnails' component={Videos} />
      <Stack.Screen name='Player' component={PlayerScreen} />
    </Stack.Navigator>
  )
}