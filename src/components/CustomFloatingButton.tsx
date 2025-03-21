import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import tw from 'twrnc';

type Props = {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
};

const CustomFloatingButton = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[tw`-top-7 justify-center items-center`]}>
      <View
        style={[
          tw`w-17 h-17 rounded-full justify-center items-center`,
          styles.shadow,
        ]}>
        {props.children}
      </View>
    </TouchableOpacity>
  );
};

export default CustomFloatingButton;

export const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: 'rgba(233, 233, 235, 0.7)',
  },
});
