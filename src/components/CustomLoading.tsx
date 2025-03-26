import {View} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import LottieView from 'lottie-react-native';
import useColors from '../zustand/useColor';

const CustomLoading = () => {
  const colors = useColors();

  return (
    <View
      style={[
        tw`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-40`,
      ]}>
      <View style={[tw`rounded-lg`, {backgroundColor: colors.background}]}>
        <LottieView
          source={require('../../assets/animations/loading.json')}
          autoPlay
          loop
          style={tw`w-30 h-30`}
        />
      </View>
    </View>
  );
};

export default CustomLoading;
