import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons, Fontisto, SimpleLineIcons } from '@expo/vector-icons';

import { HomeScreen, SearchScreen } from '../screens/main/index'
import { colors } from '../styles';
import { StateContext } from '../context/StateContext';
import VideosStack from './VideosStack';
import MusicStack from './MusicStack';

const Tabs = createBottomTabNavigator()

export default function AppTabs() {
  const { theme, setTheme } = useContext(StateContext)

  useEffect(()=>{
    theme === undefined ? setTheme('light') : setTheme(theme)
  }, [])

  /**
   * The function to help us get the appropriate icon name
   * @param {string} route The route name
   * @param {bool} focused Whether the tab is focused or not
   * @returns string
   */
  const getIconName = (route, focused) => {
    if(route.name === 'Home'){
      // From IonIcons
      return focused ? 'home' : 'home-outline'
    }
    if(route.name === 'Search'){
      // From IonIcons
      return focused ? 'search-outline' : 'search-sharp'
    }
    if(route.name === 'Music'){
      // From IonIcons
      return focused ? 'musical-notes-sharp' : 'musical-notes-outline'
    }
    if(route.name === 'Videos'){
      // From Fontisto for focused and SimpleLineIcons for unfocused
      return focused ? 'videocam' : 'videocam-outline'
    }
  }
  return (
    <Tabs.Navigator screenOptions={({ route })=>({
      headerShown: false,
      tabBarActiveTintColor: colors(theme).blue,
      tabBarInactiveTintColor: colors(theme).text,
      tabBarLabelStyle: {
        fontSize: 12
      },
      tabBarStyle: {
        backgroundColor: colors(theme).inner,
        width: '90%',
        position: 'absolute',
        bottom: 2,
        left: 20,
        borderRadius: 10,
        marginTop: 0,
        borderTopWidth: 0,
        paddingBottom: 10,
        height: 70,
        marginBottom: 15
      },
      tabBarIcon: ({ color, focused })=> {
        const name = getIconName(route, focused)
        return name === 'equalizer' ? 
          focused ? 
          <Fontisto name='equalizer' size={24} color={ color }/> 
          : <SimpleLineIcons name='equalizer' size={24} color={ color } /> 
          : <Ionicons name={name} size={24} color={color} />
      }
    })}>
      <Tabs.Screen name='Home' component={HomeScreen}/>
      <Tabs.Screen name='Music' component={MusicStack} />
      <Tabs.Screen name='Videos' component={VideosStack} />
      <Tabs.Screen name='Search' component={SearchScreen} />
    </Tabs.Navigator>
  )
}