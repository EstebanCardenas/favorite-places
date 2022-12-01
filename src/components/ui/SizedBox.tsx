import React from 'react';
import { View } from 'react-native';

type SizedBoxProps = {
  width?: number;
  height?: number;
}

function SizedBox({
  width,
  height,
}: SizedBoxProps): JSX.Element {
  return <View style={{
    width: width,
    height: height,
  }} />;
}

export default SizedBox;
