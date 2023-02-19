import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { WelcomeScreen, RegisterScreen, LoginScreen } from '../screens/splash'

const Stack = createNativeStackNavigator()

export default function SplashStack() {
  return (
    <Stack.Navigator screenOptions={{
      header: ()=>null
    }}>
      <Stack.Screen name='Welcome' component={ WelcomeScreen }/>
      <Stack.Screen name='Register' component={ RegisterScreen }/>
      <Stack.Screen name='Login' component={ LoginScreen }/>
    </Stack.Navigator>
  )
}