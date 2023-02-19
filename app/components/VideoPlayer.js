import { useContext, useRef } from 'react';
import { View } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';

import { StateContext } from '../context/StateContext'
import { colors, styleSheet } from '../styles';

export default function App({ video }) {

  const { theme } = useContext(StateContext)
  const { container } = styleSheet(theme)



  const player = useRef(null);


  return (
    <View style={[container, {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    }]}>
      <Video
        style={{
          borderColor: colors().secondary,
          minHeight: 300,
          width: '100%'
        }}
        ref={player}
        source={{
          uri: video,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        shouldPlay
      />
    </View>
  );
}
