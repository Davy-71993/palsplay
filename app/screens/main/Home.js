import { View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useContext, useState } from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { StateContext } from '../../context/StateContext'
import { colors, styleSheet } from '../../styles'
import SearchBar from '../../components/SearchBar';

export default function HomeScreen() {
  const { theme } = useContext(StateContext)
  const { container, text, h1 } = styleSheet(theme)
  const { secondary, text: test_color } = colors(theme)
  const [activeKeyWord, setActiveKeyWord] = useState('All')

  return (
    <View  style={[ container, {
      paddingVertical: 30,
      paddingHorizontal: 10
    }]}>
        <SearchBar />
        <Text style={[h1, { textAlign: 'left', fontWeight: 'bold', marginVertical: 5 }]}>Browse</Text>

        <View style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          paddingBottom: 3,
          justifyContent: 'space-between',
        }}>
          <TouchableOpacity onPress={()=>{setActiveKeyWord('All')}}>
            <Text style={[text, {
              fontSize: 18,
              fontWeight: activeKeyWord === 'All' ? 'bold' : 'normal'
            }]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{setActiveKeyWord('New')}}>
            <Text style={[text, {
              fontSize: 18,
              fontWeight: activeKeyWord === 'New' ? 'bold' : 'normal'
            }]}>New</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{setActiveKeyWord('Popular')}}>
            <Text style={[text, {
              fontSize: 18,
              fontWeight: activeKeyWord === 'Popular' ? 'bold' : 'normal'
            }]}>Popular</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{setActiveKeyWord('Chart')}}>
            <Text style={[text, {
              fontSize: 18,
              fontWeight: activeKeyWord === 'Chart' ? 'bold' : 'normal'
            }]}>Chart</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}
