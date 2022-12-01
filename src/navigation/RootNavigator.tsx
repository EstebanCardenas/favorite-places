import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import colors from '../constants/Colors';
import MapScreen from '../screens/Map';
import PlaceCreationScreen from '../screens/PlaceCreation';
import PlaceListScreen from '../screens/PlaceList';
import { MapLocation } from '../data/models/Place';
import PlaceDetailScreen from '../screens/PlaceDetail';

export type RootStackParamList = {
  PlaceList: undefined;
  PlaceCreation: {
    location: MapLocation;
  } | undefined;
  Map: { mapLocation: MapLocation } | undefined;
  PlaceDetail: { placeId: string },
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator(): JSX.Element {
  return <RootStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.primary500,
      },
      headerTintColor: colors.gray700,
      contentStyle: {
        backgroundColor: colors.gray700,
      }
    }}
    initialRouteName='PlaceList'
  >
    <RootStack.Screen
      options={{
        title: 'Your Favorite Places',
      }}
      name='PlaceList'
      component={PlaceListScreen} />
    <RootStack.Screen
      options={{
        title: 'Add a new Place'
      }}
      name='PlaceCreation'
      component={PlaceCreationScreen} />
    <RootStack.Screen
      name='Map'
      component={MapScreen} />
    <RootStack.Screen
      options={{
        title: 'Place Detail',
      }}
      name='PlaceDetail'
      component={PlaceDetailScreen} />
  </RootStack.Navigator>;
}

export default RootNavigator;
