import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import SizedBox from './SizedBox';
import colors from '../../constants/Colors';

type AppButtonProps = {
  iconName: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  width?: number,
  onTap?: () => void;
}

function ActionButton({
  iconName,
  label,
  width,
  onTap,
}: AppButtonProps): JSX.Element {
  return <TouchableOpacity onPress={onTap} style={[styles.button, {width: width}]}>
    <Ionicons name={iconName} size={24} color={colors.primary500} />
    <SizedBox width={8} />
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>;
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary500,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  label: {
    color: colors.primary500,
  }
});

export default ActionButton;
