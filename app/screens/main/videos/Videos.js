import { View, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { usePermissions } from 'expo-media-library'

import { StateContext } from '../../../context/StateContext'
import { styleSheet } from '../../../styles'
import SearchBar from '../../../components/SearchBar';
import VideoThumbnail from '../../../components/VideoThumbnail'
import { getAssets } from '../../../utils/db'

export default function HomeScreen() {
  const { theme } = useContext(StateContext)
  const { container } = styleSheet(theme)
  
  
  const [videos, setVideos] = useState([])
  const [permissionResponse, requestPermission] = usePermissions()

  const getAllVideos = async () => {
    if(!permissionResponse){
      requestPermission()
    }else if(permissionResponse.granted){
      const res = await getAssets('video')
      setVideos(res)
    }
  }

  // useEffect(()=>{ console.log(videos)}, [videos])


  useEffect(()=>{
    getAllVideos()
  }, [permissionResponse])

  return (
    <View  style={[ container, {
      paddingVertical: 30,
      paddingHorizontal: 10
    }]}>
      <SearchBar />
      <FlatList
        numColumns={2}
        data={videos}
        renderItem={(vid)=><VideoThumbnail key={vid.index} video={vid.item} />}
      />
      
    </View>
  )
}