import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import ActionButton from '../components/ui/AppButton';
import colors from '../constants/Colors';
import Place from '../data/models/Place';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useRepository } from '../store/RepositoryContext';

type PlaceDetailScreenParams = NativeStackScreenProps<RootStackParamList, 'PlaceDetail'>;

function PlaceDetailScreen({
  navigation,
  route,
}: PlaceDetailScreenParams): JSX.Element {
  const [place, setPlace] = useState<Place>();
  const repository = useRepository();

  function navigateToMapScreen() {
    if (place) {
      navigation.navigate('Map', {
        mapLocation: place.location,
      });
    }
  }

  async function retrievePlace(id: string) {
    try {
      const place = await repository.getPlace(id);
      setPlace(place);
    } catch (error) {
      console.log(error);
      Alert.alert('Failed to retrieve place.');
    }
  }

  useEffect(() => {
    const placeId = route.params.placeId;
    retrievePlace(placeId);
  }, [route.params.placeId]);

  if (!place) {
    return <View style={styles.fallbackContainer}>
      <ActivityIndicator
        size="large"
        color={colors.primary500}
      />
    </View>;
  }

  return <ScrollView>
    <Image
      source={{
        uri: place.imageUrl
      }}
      style={styles.image} />
    <View style={styles.locationContainer}>
      <View style={styles.addressContainer}>
        <Text style={styles.address}>{place.address}</Text>
      </View>
      <ActionButton
        onTap={navigateToMapScreen}
        iconName='map'
        label='View on Map' />
    </View>
  </ScrollView>;
}

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%'
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 24,
  },
  address: {
    color: colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },

});

export default PlaceDetailScreen;
