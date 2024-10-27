import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as Location from 'expo-location';

const App = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      // Request permission to access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Get the current location
      let currentLocation = await Location.getCurrentPositionAsync({});
      let {longitude, latitude} = currentLocation.coords
      console.log(longitude)
      setLocation(currentLocation);
    })();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Location:</Text>
      {errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : location ? (
        <Text>{JSON.stringify(location)}</Text>
      ) : (
        <Text>Waiting...</Text>
      )}
      <Button title="Get Location" onPress={() => console.log(location)} />
    </View>
  );
};

export default App;
