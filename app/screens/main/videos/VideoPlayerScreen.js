import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

import VideoPlayer from '../../../components/VideoPlayer'

export default function VideoPlayerScreen({ navigation }) {
  const route = useRoute()
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <VideoPlayer video={route.params.video} />
    </View>
  )
}