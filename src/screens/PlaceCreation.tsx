import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput } from 'react-native';

import { RootStackParamList } from '../navigation/RootNavigator';
import SizedBox from '../components/ui/SizedBox';
import colors from '../constants/Colors';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';
import Place, { MapLocation } from '../data/models/Place';
import { useRepository } from '../store/RepositoryContext';

type PlaceCreationScreenProps = NativeStackScreenProps<RootStackParamList, 'PlaceCreation'>;

function PlaceCreationScreen({
  navigation,
  route,
}: PlaceCreationScreenProps): JSX.Element {
  const [title, setTitle] = useState<string>();
  const [image, setImage] = useState<string>();
  const [location, setLocation] = useState<MapLocation>();
  const [isCreatingPlace, setIsCreatingPlace] = useState<boolean>(false);
  const repository = useRepository();

  const canPlaceBeCreated = title != null
    && title?.length > 0
    && image != null
    && location != null
    && !isCreatingPlace;

  async function onSubmitted() {
    if (canPlaceBeCreated) {
      setIsCreatingPlace(true);
      const address = await repository.reverseGeocode(location);
      const newPlace = new Place(
        title.trim(),
        image,
        address,
        location
      );
      repository.insertPlace(newPlace);
      setIsCreatingPlace(false);
      navigation.navigate('PlaceList');
    }
  }

  useEffect(() => {
    const mapLocation = route.params?.location;
    if (mapLocation) {
      setLocation(mapLocation);
    }
  }, [route.params?.location]);

  return <ScrollView contentContainerStyle={styles.container}>
    <SizedBox height={16} />
    <Text style={styles.title}>Title</Text>
    <SizedBox height={8} />
    <TextInput
      cursorColor={colors.primary500}
      value={title}
      onChangeText={setTitle}
      style={styles.input}
    />
    <SizedBox height={16} />
    <ImagePicker 
      image={image}
      onImagePicked={setImage}
    />
    <SizedBox height={16} />
    <LocationPicker 
      location={location}
      onLocationFound={setLocation}
      onPickOnMapTap={() => navigation.push('Map')}
    />
    <SizedBox height={16} />
    <Pressable
      style={({ pressed }) => {
        return {
          ...styles.addButton,
          opacity: pressed && canPlaceBeCreated ? 0.6 : 1,
        };
      }}
      disabled={!canPlaceBeCreated}
      onPress={onSubmitted}
    >
      {isCreatingPlace 
        ? <ActivityIndicator size="small" color="white" />
        : <Text style={styles.addButtonLabel}>Add Place</Text>}
    </Pressable>
    <SizedBox height={16} />
  </ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  title: {
    color: colors.primary500,
    fontWeight: 'bold',
  },
  input: {
    height: 48,
    backgroundColor: colors.primary100,
    paddingHorizontal: 4,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: colors.primary800,
    alignItems: 'center',
    padding: 16,
    borderRadius: 4,
  },
  addButtonLabel: {
    color: 'white',
  }
});

export default PlaceCreationScreen;
