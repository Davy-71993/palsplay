import { useContext, useEffect, useState } from 'react'
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'

import { colors, styleSheet } from '../../styles'
import { StateContext } from '../../context/StateContext'
import { LinearGradient } from 'expo-linear-gradient'
import { sequelize, saveAsset, getAssets } from '../../utils/db'
import { getAllAssets, prepareAssetForSaving } from '../../utils/helpers'

export default function WelcomeScreen({ navigation }) {

  const { theme } = useContext(StateContext)
  const { container, h1, center, content, text } = styleSheet(theme)
  const { slate_100 } = colors()

  const [loading, setLoading] = useState(false)
  const { setAuth } = useContext(StateContext)

  useEffect(() => {
    (async()=>{
      setLoading(true)
      await sequelize.sync({
        force: true
      })
      const assets = await getAllAssets('video')

      assets.map(async(asset) => {
        const preparedAsset = await prepareAssetForSaving(asset)
        
        await saveAsset(preparedAsset)
      })
      setLoading(false)
    })()
  }, [])
  

  const getStarted = async() => {
    setAuth({
      user: null,
      ready: true
    })
  }

  return (
    <View style={ container }>
      <ImageBackground blurRadius={5} source={require('../../assets/headphones.jpg')} style={[ content, center  ]}>
        <View style={{
          height: '70%',
          width: '100%',
          padding: 20,
          alignSelf: 'baseline',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <View>
            <Text style={ [h1, {
              fontWeight: 'bold',
              fontSize: 40,
              color: slate_100
            }] }>PalsPlay</Text>
            <Text style={[ text, {
              marginTop: -8,
              letterSpacing: 5,
              color: slate_100
            }]}>music with pals</Text>
          </View>
          <View>
            <Text style={[ text, {
              textAlign: 'center',
              fontSize: 16,
              color: slate_100
            }]}>
              Express your personality. Choose and organise your playlists according to your taste and mood.
            </Text>
            <TouchableOpacity onPress={ getStarted } >
              <LinearGradient colors={['#ec4899', '#6366f1']} style={{
                paddingVertical: 20,
                paddingHorizontal: 40,
                borderRadius: 10,
                marginVertical: 20,
                alignSelf: 'center'
              }}>
                <Text style={[text,{
                  color: slate_100
                }]}>{loading ? 'Loading...' : 'Get Started'}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}