import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { RootStackParamList } from '../navigation/RootNavigator';
import Place from '../data/models/Place';
import PlaceItem from '../components/PlaceItem';
import colors from '../constants/Colors';
import SizedBox from '../components/ui/SizedBox';
import { useRepository } from '../store/RepositoryContext';
import { useIsFocused } from '@react-navigation/native';

type PlaceListScreenProps = NativeStackScreenProps<RootStackParamList, 'PlaceList'>;

function PlaceListScreen({
  navigation,
}: PlaceListScreenProps): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [places, setPlaces] = useState<Place[]>([]);
  const isFocused = useIsFocused();
  const repository = useRepository();

  async function retrievePlaces() {
    try {
      setIsLoading(true);
      const retrievedPlaces = await repository.getPlaces();
      setIsLoading(false);
      setPlaces(retrievedPlaces);
    } catch (error) {
      console.log(error);
      Alert.alert('Failed to load places');
    }
  }

  async function removePlace(id: string) {
    try {
      const successfulRemoval = await repository.deletePlace(id);
      if (successfulRemoval) {
        const newList = [...places];
        const idx = places.findIndex(e => e.id === id);
        if (idx != -1) {
          newList.splice(idx, 1);
          setPlaces(newList);
        }
      }
    } catch {
      Alert.alert('Failed to delete place');
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <TouchableOpacity onPress={() => {
        navigation.push('PlaceCreation');
      }}>
        <Ionicons name='add' size={24} />
      </TouchableOpacity>,
    });
    if (isFocused) {
      retrievePlaces();
    }
  }, [isFocused]);

  if (isLoading) {
    return <View style={styles.fallbackContainer}>
      <ActivityIndicator 
        color={colors.primary500}
        size="large"
      />
    </View>;
  }

  if (places.length === 0) {
    return <View style={styles.fallbackContainer}>
      <Text style={styles.fallbackText}>
        No places added yet - start adding some!
      </Text>
    </View>;
  }

  return <FlatList
    style={styles.container}
    ListFooterComponent={<SizedBox height={48} />}
    data={places}
    renderItem={({ item }) => <PlaceItem
      place={item} 
      onTap={() => navigation.navigate('PlaceDetail', {
        placeId: item.id,
      })}
      onLongTap={() => removePlace(item.id)} />}
    keyExtractor={place => place.id}
    ItemSeparatorComponent={() => <SizedBox height={16} />}
  />;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: colors.primary200,
  }
});

export default PlaceListScreen;
