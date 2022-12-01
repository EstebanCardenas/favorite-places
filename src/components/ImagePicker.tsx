import React from 'react';
import { Image, Text, View } from 'react-native';
import * as Picker from 'expo-image-picker';

import { displayBoxHeight } from '../constants/Layout';
import ActionButton from './ui/AppButton';
import DisplayBox from './ui/DisplayBox';
import SizedBox from './ui/SizedBox';

type ImagePickerProps = {
  image: string | undefined;
  onImagePicked: (image: string) => void;
}

function ImagePicker({
  image,
  onImagePicked,
}: ImagePickerProps): JSX.Element {
  const [status, requestPermission] = Picker.useCameraPermissions();

  async function pickImage() {
    await requestPermission();
    if (status?.granted) {
      const result: Picker.ImagePickerResult =
        await Picker.launchCameraAsync({
          quality: 1,
        });
      if (!result.canceled) {
        onImagePicked(result.assets[0].uri);
      }
    }
  }

  function renderImage(): JSX.Element {
    if (image) {
      return <Image
        style={{
          height: displayBoxHeight,
          borderRadius: 4,
        }}
        source={{
          uri: image,
        }}
      />;
    } else {
      return <DisplayBox
        height={displayBoxHeight}
      >
        <Text>No image taken yet.</Text>
      </DisplayBox>;
    }
  }

  return <View>
    {renderImage()}
    <SizedBox height={8} />
    <ActionButton
      onTap={pickImage}
      iconName='camera'
      label='Take Image' />
  </View>;
}

export default ImagePicker;
