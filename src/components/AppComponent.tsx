import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {dataApp} from '../constants/data';
import tw from 'twrnc';
import {Fonts} from '../constants/font';
import useColors from '../zustand/useColor';

type Props = {
  value: string | null;
  hours: string;
  minutes: string;
  setValue: (value: string | null) => void;
  setHours: (hours: string) => void;
  setMinutes: (minutes: string) => void;
  setIsFocus: (focus: boolean) => void;
};

const AppComponent = (props: Props) => {
  const colors = useColors();

  return (
    <View style={tw`flex-row justify-between pb-3`}>
      <View>
        <Text style={[tw`text-xs`, {fontFamily: Fonts.regular}]}>App</Text>
        <View style={tw`py-1`} />
        <View style={tw`flex-row justify-start`}>
          <Dropdown
            data={dataApp}
            placeholderStyle={[tw`text-sm`, {fontFamily: Fonts.regular}]}
            selectedTextStyle={[tw`text-sm`, {fontFamily: Fonts.regular}]}
            labelField="label"
            valueField="value"
            placeholder={dataApp[0].label}
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
      </View>
      <View>
        <Text style={[tw`text-xs`, {fontFamily: Fonts.regular}]}>Hours</Text>
        <View style={tw`py-1`} />
        <View
          style={[
            tw`flex-row justify-start rounded-lg shadow-md`,
            {backgroundColor: colors.white},
          ]}>
          <TextInput
            placeholder="02"
            placeholderTextColor={colors.placeholder}
            value={props.hours}
            keyboardType="number-pad"
            onChangeText={props.setHours}
            cursorColor={colors.primary}
            style={tw`h-10 w-13 px-3`}
          />
        </View>
      </View>
      <View>
        <Text style={[tw`text-xs`, {fontFamily: Fonts.regular}]}>Minutes</Text>
        <View style={tw`py-1`} />
        <View
          style={[
            tw`flex-row justify-start rounded-lg shadow-md`,
            {backgroundColor: colors.white},
          ]}>
          <TextInput
            placeholder="49"
            placeholderTextColor={colors.placeholder}
            value={props.minutes}
            keyboardType="number-pad"
            onChangeText={props.setMinutes}
            cursorColor={colors.primary}
            style={tw`h-10 w-13 px-3`}
          />
        </View>
      </View>
    </View>
  );
};

export default AppComponent;
