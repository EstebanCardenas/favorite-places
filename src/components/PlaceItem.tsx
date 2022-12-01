import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../constants/Colors';

import Place from '../data/models/Place';

type PlaceItemProps = {
  place: Place;
  onTap?: () => void;
  onLongTap?: () => void;
};

function PlaceItem({
  place,
  onTap,
  onLongTap,
}: PlaceItemProps): JSX.Element {
  return <Pressable
    onPress={onTap}
    onLongPress={onLongTap}
    style={({pressed}) => [styles.item, pressed && styles.pressed]}
  >
    <Image
      style={styles.image}
      source={{
        uri: place.imageUrl,
      }}
    />
    <View style={styles.info}>
      <Text style={styles.title}>{place.title}</Text>
      <Text style={styles.address}>{place.address}</Text>
    </View>
  </Pressable>;
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 6,
    backgroundColor: colors.primary500,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.gray700,
  },
  address: {
    fontSize: 12,
    color: colors.gray700,
  }
});

export default PlaceItem;
