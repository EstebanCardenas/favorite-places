import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../../constants/Colors';

type DisplayBoxProps = {
  height: number;
  children?: JSX.Element;
}

function DisplayBox({
  height,
  children,
}: DisplayBoxProps): JSX.Element {
  return <View style={[styles.box, { height: height }]} >
    {children}
  </View>;
}

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary100,
    borderRadius: 4,
  }
});

export default DisplayBox;
