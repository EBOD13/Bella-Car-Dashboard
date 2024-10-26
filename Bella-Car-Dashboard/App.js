// import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, ImageBackground, Image, StatusBar } from 'react-native';
import { useDeviceOrientation } from '@react-native-community/hooks'; // Correctly import
import Constants from 'expo-constants'; // Import Constants from expo-constants

export default function App() {
  // Will use this to check if the screen is on landscape to perform other operations
  const { landscape } = useDeviceOrientation();
  console.log(landscape);

  // Predefined array of image sources
  const navIcons = [
    require('./assets/media/icons/nav_icons/1.png'),
    require('./assets/media/icons/nav_icons/2.png'),
    require('./assets/media/icons/nav_icons/3.png'),
    require('./assets/media/icons/nav_icons/4.png'),
    require('./assets/media/icons/nav_icons/5.png'),
    require('./assets/media/icons/nav_icons/6.png'),
    require('./assets/media/icons/nav_icons/7.png'),
  ];

  return (
    <SafeAreaProvider>
      <ImageBackground 
        source={require('./assets/media/backgrounds/darkTheme.jpg')} // Specify your image path here
        style={styles.background}
      >
        <View style={styles.sideNav}>
          {navIcons.map((icon, index) => (
            <Image 
              key={index} // Unique identifier of each icon
              source={icon}
              style={styles.navIcon} // Correctly use 'style' instead of 'styles'
            />
          ))}
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
        </View>
      </ImageBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Choose 'cover' or 'contain' depending on your preference
    justifyContent: 'center', // Center the content
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff', // Change text color for better visibility against the background
    fontSize: 24,
  },
  sideNav: {
    height: '100%',
    backgroundColor: '#0F52BA',
    width: '7.5%',
    justifyContent: 'flex-start', // Align items to start from the top
    alignItems: 'center',
    marginTop: Constants.statusBarHeight + 22,
    paddingTop: 50,
    borderRadius: 10,
  },
  navIcon: {
    marginVertical: 10,
    width: 60, // Set width for icons
    height: 60, // Set height for icons
  }
});
