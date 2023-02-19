import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

import { colors, styleSheet } from '../styles'
import { StateContext } from '../context/StateContext'

export default function SearchBar({ onTextChanged, onExtraClicked }) {
    const { theme } = useContext(StateContext)
    const { text: text_color, secondary } = colors(theme)
    const { searchContainer } = styles
    const [searchWith, setSearchWidth] = useState(50)

    const showHideSearch = () => {
        searchWith === 50 ? setSearchWidth('90%') : setSearchWidth(50)
    }
  return (
    <View style={[searchContainer, {
        backgroundColor: secondary
      }]}>
        <View style={{
          paddingVertical: 3,
          paddingHorizontal: 10,
          flexDirection: 'row-reverse',
          width: searchWith,
        }}>
          <TouchableOpacity onPress={ showHideSearch }>
            <Ionicons name="search-outline" size={30} color={text_color} style={{
              fontWeight: 'bold'
            }} />
          </TouchableOpacity>
          <TextInput 
            onChangeText={onTextChanged}
            style={{
              flex: 1,
              borderBottomWidth: 1,
              borderColor: text_color
            }}/>
        </View>
        <TouchableOpacity onPress={ onExtraClicked }>
          <MaterialCommunityIcons name="dots-vertical" size={30} color={ text_color } />
        </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
    searchContainer: {
      borderRadius: 10,
      padding:5,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row'
    }
  })