import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

import { displayBoxHeight } from '../constants/Layout';
import ActionButton from './ui/AppButton';
import DisplayBox from './ui/DisplayBox';
import SizedBox from './ui/SizedBox';
import { MapLocation } from '../data/models/Place';

type LocationPickerProps = {
  location: MapLocation | undefined,
  onLocationFound: (location: MapLocation | undefined) => void;
  onPickOnMapTap: () => void;
}

function LocationPicker({
  location,
  onLocationFound,
  onPickOnMapTap,
}: LocationPickerProps): JSX.Element {
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(false);
  const [status, requestPermission] = Location.useForegroundPermissions();

  async function findLocation() {
    await requestPermission();
    if (status?.granted) {
      onLocationFound(undefined);
      setIsLoadingLocation(true);
      const response = await Location.getCurrentPositionAsync();
      setIsLoadingLocation(false);
      onLocationFound({
        longitude: response.coords.longitude,
        latitude: response.coords.latitude,
      });
    }
  }

  function renderImage() {
    if (location) {
      return <MapView
        style={styles.mapContainer}
        region={{
          longitude: location.longitude,
          latitude: location.latitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            longitude: location.longitude,
            latitude: location.latitude,
          }}
        />
      </MapView>;
    } else {
      return <DisplayBox
        height={displayBoxHeight}
      >
        {isLoadingLocation
          ? <ActivityIndicator
            color="black"
            size="large"
          />
          : <Text>No location picked yet.</Text>}
      </DisplayBox>;
    }
  }

  return <View>
    {renderImage()}
    <SizedBox height={8} />
    <View style={styles.buttonsContainer}>
      <ActionButton
        onTap={findLocation}
        iconName='location'
        label='Locate User' />
      <ActionButton
        onTap={onPickOnMapTap}
        iconName='map'
        label='Pick on Map' />
    </View>
  </View>;
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  mapContainer: {
    width: '100%',
    height: displayBoxHeight,
  }
});

export default LocationPicker;
