import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { useContext } from 'react'

import SplashStack from './SplashStack'
import AppTabs from '../navigation/AppTabs'
import { StateContext } from '../context/StateContext'

export default function MainNavigator() {
  const { theme, auth } = useContext(StateContext)
  return (
    <>
      <NavigationContainer>
          { auth ? <AppTabs /> : <SplashStack />}
      </NavigationContainer>
      <StatusBar style={ theme === 'light'? 'dark' : theme === 'dark' ? 'light' : 'light' }/>
    </>
  )
}