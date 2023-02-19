import MainNavigator from './app/navigation/MainNavigator'
import { StatusBar } from 'expo-status-bar';

import { StateProvider } from "./app/context/StateContext";

export default function App() {
  return (
    <StateProvider>
      <MainNavigator />
    </StateProvider>
  );
}
