import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import { colors } from '../styles';
import { useNavigation } from '@react-navigation/native';

export default function App({ video }) {

  const [image, setImage] = useState(null);


  const navigation = useNavigation()

  if(!video){
    return null
  }

  useEffect(()=>{
    if(video){
      setImage(video.thumbnail)
    }
  }, [video])

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <ImageBackground
          width={100}
          height={100}
          source={{ uri: image }} 
          style={{
            backgroundColor: 'red',
            height: 100,
            borderRadius: 10,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity 
            style={{
              padding: 15,
              backgroundColor: 'rgba(20, 40, 30, .8)',
              borderRadius: 20
            }}
            onPress={()=>{ navigation.navigate('Player', {video: video.uri}) }}
          >
            <Text style={{ color: colors().primary}}>Play</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 1,
  },
  playButton: {
    position: 'absolute',
    bottom: 50
  }
})
