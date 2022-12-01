import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Ionicons from '@expo/vector-icons/Ionicons';


import { RootStackParamList } from '../navigation/RootNavigator';
import colors from '../constants/Colors';
import { MapLocation } from '../data/models/Place';

type MapScreenParams = NativeStackScreenProps<RootStackParamList, 'Map'>;

function MapScreen({
  navigation,
  route,
}: MapScreenParams): JSX.Element {
  const [isLoadingLocation, setIsLoadingLocation] =
    useState<boolean>(false);
  const [currentLocation, setCurrentLocation] =
    useState<MapLocation>();
  const [selectedLocation, setSelectedLocation] =
    useState<MapLocation>();
  const mapLocation = route.params?.mapLocation;

  async function getCurrentLocation() {
    const status = await Location.requestForegroundPermissionsAsync();
    if (status.granted) {
      setIsLoadingLocation(true);
      const location: Location.LocationObject =
        await Location.getCurrentPositionAsync();
      setCurrentLocation(location.coords);
      setIsLoadingLocation(false);
    }
  }

  function onSaveTap() {
    if (selectedLocation != null) {
      navigation.navigate('PlaceCreation', {
        location: selectedLocation,
      });
    }
  }

  useEffect(() => {
    if (!mapLocation) {
      navigation.setOptions({
        headerRight: () => <TouchableOpacity onPress={onSaveTap}>
          <Ionicons name='save' size={24} />
        </TouchableOpacity>
      });
      if (currentLocation == null) {
        getCurrentLocation();
      }
    } else {
      setCurrentLocation({
        longitude: mapLocation.longitude,
        latitude: mapLocation.latitude,
      });
      setSelectedLocation(mapLocation);
    }
  }, [selectedLocation, mapLocation]);

  if (isLoadingLocation) {
    return <View style={styles.loadingContainer}>
      <ActivityIndicator
        size="large"
        color={colors.primary500}
      />
    </View>;
  }

  return <MapView
    style={styles.map}
    region={{
      longitude: currentLocation?.longitude ?? 38,
      latitude: currentLocation?.latitude ?? -120,
      longitudeDelta: 0.0421,
      latitudeDelta: 0.0922,
    }}
    onPress={mapLocation ? undefined : ({ nativeEvent }) => setSelectedLocation({
      longitude: nativeEvent.coordinate.longitude,
      latitude: nativeEvent.coordinate.latitude,
    })}
  >
    {selectedLocation && <Marker
      coordinate={{
        longitude: selectedLocation.longitude,
        latitude: selectedLocation.latitude,
      }}
    />}
  </MapView>;
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default MapScreen;
