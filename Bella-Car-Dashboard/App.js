// import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, ImageBackground, Image, StatusBar } from 'react-native';
import { useDeviceOrientation } from '@react-native-community/hooks'; // Correctly import
import Constants from 'expo-constants'; // Import Constants from expo-constants
import HomeScreen from './app/screens/HomeScreen';
export default function App() {
  return(
    <HomeScreen/>
  );
}
