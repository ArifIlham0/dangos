import {Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import tw from 'twrnc';
import {Fonts} from '../constants/font';

type Props = {
  text: string;
};

const NoDataComponent = (props: Props) => {
  return (
    <View>
      <LottieView
        source={require('../../assets/animations/no_data.json')}
        autoPlay
        loop
        style={tw`w-50 h-50`}
      />
      <Text style={[tw`text-lg text-center`, {fontFamily: Fonts.regular}]}>
        {props.text}
      </Text>
    </View>
  );
};

export default NoDataComponent;
