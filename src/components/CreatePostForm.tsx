import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import tw from 'twrnc';
import {Fonts} from '../constants/font';
import {Dropdown} from 'react-native-element-dropdown';
import {dataPeriod} from '../constants/data';
import {PlusIconWhite} from '../../assets/icons';
import useColors from '../zustand/useColor';
import AppComponent from './AppComponent';
import MinusIcon from '../../assets/icons/MinusIcon';

type Props = {
  value: string | null;
  isFocus: boolean;
  hours: string;
  minutes: string;
  caption: string;
  setValue: (value: string | null) => void;
  setIsFocus: (focus: boolean) => void;
  setHours: (hours: string) => void;
  setMinutes: (minutes: string) => void;
  setCaption: (caption: string) => void;
};

const CreatePostForm = (props: Props) => {
  const colors = useColors();
  const [appComponents, setAppComponents] = useState([{}]);
  const scrollViewRef = useRef<ScrollView>(null);

  const addAppComponent = () => {
    setAppComponents(prev => [...prev, {}]);
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({animated: true});
    }, 100);
  };

  const removeAppComponent = () => {
    if (appComponents.length === 1) {
      return;
    }
    setAppComponents(prev => prev.slice(0, prev.length - 1));
  };

  return (
    <ScrollView ref={scrollViewRef}>
      <Text style={[tw`text-xs`, {fontFamily: Fonts.regular}]}>
        Period Time
      </Text>
      <View style={tw`py-1`} />
      <View style={tw`flex-row justify-start`}>
        <Dropdown
          data={dataPeriod}
          placeholderStyle={[tw`text-sm`, {fontFamily: Fonts.regular}]}
          selectedTextStyle={[tw`text-sm`, {fontFamily: Fonts.regular}]}
          labelField="label"
          valueField="value"
          placeholder={dataPeriod[0].label}
          value={props.value}
          onFocus={() => props.setIsFocus(true)}
          onBlur={() => props.setIsFocus(false)}
          itemTextStyle={[tw`text-sm`, {fontFamily: Fonts.regular}]}
          itemContainerStyle={[
            tw`w-35 rounded-lg shadow-md`,
            {backgroundColor: colors.white},
          ]}
          containerStyle={[
            tw`w-35 rounded-lg shadow-md`,
            {backgroundColor: colors.white},
          ]}
          style={[
            tw`h-10 rounded-lg px-3 w-35 shadow-md`,
            {backgroundColor: colors.white},
          ]}
          onChange={item => {
            props.setValue(item.value);
            props.setIsFocus(false);
          }}
        />
      </View>
      <View style={tw`py-4`} />
      <Text style={[tw`text-xs`, {fontFamily: Fonts.regular}]}>Caption</Text>
      <View style={tw`py-1`} />
      <View style={tw`flex-row justify-center`}>
        <TextInput
          placeholder="This is my 1 day screen time"
          placeholderTextColor={colors.placeholder}
          value={props.caption}
          keyboardType="default"
          onChangeText={props.setCaption}
          multiline
          cursorColor={colors.primary}
          style={[
            tw`h-20 w-13 px-3 pt-3 rounded-lg w-full shadow-md`,
            {backgroundColor: colors.white},
          ]}
        />
      </View>
      <View style={tw`py-4`} />
      {appComponents.map((_, index) => (
        <AppComponent key={index} {...props} />
      ))}
      <View style={tw`py-1`} />
      <View style={tw`flex-row justify-end py-4`}>
        <TouchableOpacity
          onPress={removeAppComponent}
          style={[
            tw`px-2.2 py-2 rounded-full w-10 h-10 items-center justify-center`,
            {backgroundColor: colors.primary},
          ]}>
          <MinusIcon width={20} height={20} />
        </TouchableOpacity>
        <View style={tw`px-2`} />
        <TouchableOpacity
          onPress={addAppComponent}
          style={[
            tw`px-2.2 py-2 rounded-full w-10 h-10 items-center justify-center`,
            {backgroundColor: colors.primary},
          ]}>
          <PlusIconWhite width={20} height={20} />
        </TouchableOpacity>
      </View>
      <View style={tw`py-5`} />
    </ScrollView>
  );
};

export default CreatePostForm;
