/**********   Libraries imports  *************/
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from 'react';
import { Audio } from 'expo-av';


/**********   My imports   *************/
import { colors } from '../styles';
import { StateContext } from '../context/StateContext';

export default function SongItem({ song, currentSong, setCurrentSong }) {

  // Get the theme and dynamically render the styles
  const { theme } = useContext(StateContext)
  const { text: text_color, secondary, inner } = colors(theme)

  /**
   * The song state
   * isPlaying: to check whether the song is playing or paused
   * isCurrentSong: to check whether it is the current song or not
   * track 
   */
  const [isCurrentSong, setIsCurrentSong] = useState(false)
  const [track, setTrack] = useState()
  const [trackStatus, setTrackStatus] = useState({})

  const handlePlayPause = async() => {
    if(isCurrentSong){
      // play or pause
      console.log('we have a song selected')

      if(!track){
        console.log('loading new track')
        try {
          const { sound } = await Audio.Sound.createAsync({
            uri: song.uri
          })
  
          setTrack(sound)
          sound.playAsync()
  
          setTrackStatus({...await sound.getStatusAsync(), isPlaying: true})
        } catch (error) {
          console.log(error)
        }
      }else{
        if(trackStatus.isPlaying){
          try {
            await track.pauseAsync()
            setTrackStatus({...trackStatus, isPlaying: false})
          } catch (error) {
            console.log(error)
          }
        }else{
          try {
            await track.playAsync()
            setTrackStatus({...trackStatus, isPlaying: true})
          } catch (error) {
            console.log(error)
          }
        }
      }
      
    }else{
      // initialize the audio and play it
      setCurrentSong(song)
      console.log('new song is selected')

      console.log('loading new track')
      const { sound } = await Audio.Sound.createAsync({
        uri: song.uri
      })

      setTrack(sound)
      sound.playAsync()

      setTrackStatus({...await sound.getStatusAsync(), isPlaying: true})

    }
  }

  useEffect(()=>{ 
    return track ? ()=> {
      console.log('unloading the audio: ', trackStatus)
      track.unloadAsync()
      setTrack(undefined)
      setTrackStatus({})
    }: undefined
  }, [track, currentSong])

  useEffect(()=>{
    /****************** Update the isCurrentSong whenever the currentSong changes *********************/
    if(currentSong){
      setIsCurrentSong(currentSong.uri === song.uri) 
    }else{
      setIsCurrentSong(false) 
    } 
  }, [currentSong])

  if(!song){
    return null
  }

  return (
    <View style={[styles.songContainer, {
      borderColor: secondary
    }]}>
      {
        song.cover ?
        <Image source={ song.cover } style={ [styles.cover, {
          backgroundColor: secondary,
          borderRadius: 5
        }] }/>
        : <View style={[styles.cover, {
          backgroundColor: secondary
        }]} ><Ionicons name='musical-note' size={30} color={text_color}/></View>
      }
      <Text style={[styles.songText,{
        color: text_color
      }]}>{ song.name }</Text>
      <View style={[styles.controls,{
        borderColor: secondary
      }]}>
        <TouchableOpacity onPress={ handlePlayPause }>
          <Ionicons name={isCurrentSong && trackStatus.isPlaying ? 'pause' : 'play-sharp'} size={30} color={text_color} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  songContainer: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderWidth: 1
  },
  cover: {
    height: 50,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  songText: {
    fontSize: 16,
    fontWeight: '200',
    maxWidth: '70%',
  },
  controls: {
    borderLeftWidth: 2,
    paddingHorizontal: 10
  }
})