import React, { useState, useEffect } from 'react';
import { ImageBackground, Platform, Text, StyleSheet, View, Dimensions, Image, StatusBar, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Font from 'expo-font';
import Geocoder from 'react-native-geocoder';
// Load the Crimson Font
const loadFonts = async () => {
  await Font.loadAsync({
    'Crimson-Regular': require('../assets/fonts/CrimsonText-Regular.ttf'),
    'Crimson-Bold': require('../assets/fonts/CrimsonText-Bold.ttf'),
  });
};

// Default screen size (1024x600)
const DEFAULT_WIDTH = 1024;
const DEFAULT_HEIGHT = 600;

// Get the current screen size 
const { width, height } = Dimensions.get('window');

// Calculate the icon size based on the screen width
const ICON_SIZE = width * 0.045; // Change this multiplier to adjust icon size
const fontScaleFactor = 0.0245; // For example, 5% of screen width
const row1Scalefactor = 0.275
function HomeScreen(props) {
  // State to track if fonts are loaded
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Location states
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Variables for city and country
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');

  // Date and time hooks
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  // Request permission to access location
  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    // Get the current location
    let currentLocation = await Location.getCurrentPositionAsync({});
    const { longitude, latitude } = currentLocation.coords; // Extracting longitude and latitude from coords

    // Store the longitude and latitude
    setLongitude(longitude);
    setLatitude(latitude);
    setErrorMsg(null); // Clear error message if permission is granted
  };

  // Get the location of the user
  const getLocation = async (latitude, longitude) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
    const data = await response.json();
    
    const city = data.address.city || data.address.town || data.address.village;
    const region = data.address.state || data.address.region;
    setCity(city)
    setRegion(region)
    };


  // Getting date and time
  const getDayTime = () => {
    const date = new Date();

    // Format the date
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    
    // Months of the year
    const monthsOfYear = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    const month = monthsOfYear[date.getMonth()]
    let dayOfMonth = date.getDate();
    let year = date.getFullYear();

    // Format the time
    let hours = date.getHours();
    let minutes = date.getMinutes();

    const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}`;
    const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;

    setCurrentDate(formattedDate);
    setCurrentTime(formattedTime);
  };

  const getWeatherData = async(latitude, longitude) =>{
    response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m`)

    if (!response.ok){
        throw new Error('Network issue');
    }
    const data = await response.json(); 
    // console.log(data)
    
    const datas = Math.ceil(data.current.temperature_2m)
    console.log(datas)

    // Get the current temperature
    
  }


//   getWeatherData(latitude, longitude)
  useEffect(() => {
    getDayTime();
    const intervalId = setInterval(getDayTime, 1000); // Update every second
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Load fonts when component mounts
    loadFonts().then(() => setFontsLoaded(true));
    
    // Request location permission and get location
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (longitude && latitude) {
      getLocation(latitude, longitude);
    }
  }, [longitude, latitude]);

  // Predefined navigation icons
  const navIcons = [
    require('../assets/media/icons/nav_icons/1.png'),
    require('../assets/media/icons/nav_icons/2.png'),
    require('../assets/media/icons/nav_icons/3.png'),
    require('../assets/media/icons/nav_icons/4.png'),
    require('../assets/media/icons/nav_icons/5.png'),
    require('../assets/media/icons/nav_icons/6.png'),
    require('../assets/media/icons/nav_icons/7.png'),
    require('../assets/media/icons/nav_icons/8.png'),
  ];

  // Calculate total height for the sideNav
  const totalHeight = navIcons.length * ICON_SIZE;
  const onPress = (key) => { console.log(`Pressed here ${key}`); };

  // Show a loading spinner until the fonts are loaded
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/media/backgrounds/darkTheme.jpg')}
    >
      <SafeAreaView style={styles.container}>
        <View style={[styles.sideNav, { height: totalHeight }]}>
          <ScrollView
            contentContainerStyle={styles.iconContainer}
            showsVerticalScrollIndicator={false}
          >
            {navIcons.map((icon, index) => (
              <TouchableOpacity key={index} onPress={() => onPress(index)}>
                <Image
                  key={index}
                  source={icon}
                  style={[styles.navIcon, { width: ICON_SIZE, height: ICON_SIZE }]}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Side View - Next to Nav Panel*/}
        <SafeAreaView style={styles.mainContent}>
            {/* Date, Location and Time Box */}
          <View style={styles.mainContentRow1}>
            <Text style={styles.date}>{currentDate}</Text>
            <Text style={styles.time}>{currentTime}</Text>
            <Text style={styles.location}>{city}, {region}</Text>
          </View>

          {/* Temperature Box */}
          <View style={styles.mainContentRow1}>

          </View>

          {/* Spotify Box */}
          <View style={styles.mainContentRow1}>

          </View>
        </SafeAreaView>

        {/* Temperature View */}

        <SafeAreaView></SafeAreaView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    width: width,
    height: height,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideNav: {
    backgroundColor: 'rgba(240, 240, 240, 0.5)',
    borderRadius: 10,
    width: '6%',
    justifyContent: 'center',
    marginLeft: Platform.OS === 'ios' ? 0 : 10,
    marginTop: Platform.OS === "ios" ? 20 : 0,
  },
  navIcon: {
    aspectRatio: 1,
    marginVertical: 13,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
    height: '100%',
    marginTop: Constants.statusBarHeight + 100,
    marginLeft: "2.5%",
  },
  mainContentRow1: {
    backgroundColor: "rgba(240, 240, 240, 0.5)",
    height: height * row1Scalefactor + 10, // Later change this using scaling factor
    marginRight: "3%", 
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: width * row1Scalefactor,
    position: 'relative',
  },
  date: {
    fontSize: width * fontScaleFactor, 
    fontFamily: 'Crimson-Regular'
  },
  time: {
    fontSize: width * fontScaleFactor + 35,
    fontFamily: 'Crimson-Bold',
  },
  location: {
    fontSize: width * fontScaleFactor,
    fontFamily: 'Crimson-Regular',
    position: 'absolute',
    bottom: '8%'
  },
});

export default HomeScreen;
