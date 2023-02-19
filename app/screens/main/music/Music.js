import { View, StyleSheet, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { getDocumentAsync } from 'expo-document-picker'

import { StateContext } from '../../../context/StateContext'
import { styleSheet } from '../../../styles'
import SearchBar from '../../../components/SearchBar'
import SongItem from '../../../components/SongItem'
import { getAssets, saveAsset } from '../../../utils/db'
import { searchYoutube } from '../../../utils/helpers';

export default function Songs() {
  const { theme } = useContext(StateContext)
  const { container } = styleSheet(theme)

  const [songs, setSongs] = useState([])
  const [currentSong, setCurrentSong] = useState()

  /**
   * Get all music from the device.
   * And set the songs to the obtained list
   */
  const getAllMusic = async() => {
    const assets = await getAssets('audio')
    setSongs(assets)

    const more = await searchYoutube('play dead')
    setSongs([...songs, ...more])
  }

  /**
   * Select and add song to the database using expo document picker.
   */
  const addMusic = async() => {
    const { name, uri, cover } = await getDocumentAsync({
      type: 'audio/*',
      copyToCacheDirectory: false
    })
    
    await saveAsset({
      name: name,
      uri: uri,
      duration: null,
      type: 'audio',
      cover: cover || null
    })

    await getAllMusic();
  }

  useEffect(()=>{
    getAllMusic()
  }, [])

  return (
    <View  style={[ container, {
      padding: 10
    }]}>
      <SearchBar onExtraClicked={addMusic}/>
      <View style={styles.player} >
        <FlatList
          data={songs}
          renderItem={(song) =>(
            <SongItem 
              song={song.item} 
              currentSong={currentSong} 
              setCurrentSong={setCurrentSong} 
            />
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  player: {
    flex: 1,
    width: '100%',
    paddingVertical: 10,
  },
  addBtn: {
    position: 'absolute',
    top: 10,
    right: 0,
    padding: 10,
    borderRadius: 5,
  }
})