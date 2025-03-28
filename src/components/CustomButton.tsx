import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import useColors from '../zustand/useColor';
import {Fonts} from '../constants/font';

type Props = {
  disabled: string;
  onPress: () => void;
  text: string;
};

const CustomButton = (props: Props) => {
  const colors = useColors();

  return (
    <TouchableOpacity
      disabled={!props.disabled}
      onPress={props.onPress}
      style={[
        tw`py-3 px-8 rounded-3xl`,
        styles.shadow,
        {
          backgroundColor: props.disabled ? colors.primary : colors.bgModal,
          shadowColor: colors.primary,
        },
      ]}>
      <Text
        style={[
          tw`text-center text-xs`,
          {color: colors.white, fontFamily: Fonts.regular},
        ]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

export const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
});
