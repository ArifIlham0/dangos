import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../constants/font';
import tw from 'twrnc';
import useThemeStore from '../zustand/themeStore';
import COLORS from '../constants/color';
import {CrossIcon} from '../../assets/icons';
import {Dropdown} from 'react-native-element-dropdown';

type Props = {};

const data = [
  {label: '1 Day', value: 'day'},
  {label: '1 Week', value: 'week'},
];

const CreatePostScreen = (props: Props) => {
  const navigation = useNavigation();
  const {isDarkMode} = useThemeStore();
  const colors = COLORS(isDarkMode);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Modal
      visible={true}
      onRequestClose={() => navigation.goBack()}
      animationType="slide"
      presentationStyle="pageSheet">
      <View
        style={[tw`flex-1 items-center`, {backgroundColor: colors.background}]}>
        <View
          style={tw`flex-row items-center justify-between pt-4 w-full px-5`}>
          <Text style={[tw`text-lg`, {fontFamily: Fonts.semiBold}]}>
            Create Post
          </Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[
              tw`px-2.2 py-2 rounded-full`,
              {backgroundColor: colors.primary},
            ]}>
            <CrossIcon />
          </TouchableOpacity>
        </View>
        <View style={tw`py-2`} />
        <View
          style={[
            tw`flex-1 w-full h-full rounded-tl-3xl rounded-tr-3xl px-5`,
            {backgroundColor: colors.secondary},
          ]}>
          <View style={tw`py-2`} />
          <Text style={[tw`text-center`, {fontFamily: Fonts.semiBold}]}>
            Show your screen time!
          </Text>
          <View style={tw`py-4`} />
          <Text style={[tw`text-xs`, {fontFamily: Fonts.regular}]}>
            Dalam kurun waktu
          </Text>
          <View style={tw`py-1`} />
          <View style={tw`flex-row justify-start`}>
            <Dropdown
              data={data}
              placeholderStyle={[tw`text-sm`, {fontFamily: Fonts.regular}]}
              selectedTextStyle={[tw`text-sm`, {fontFamily: Fonts.regular}]}
              labelField="label"
              valueField="value"
              placeholder={data[0].label}
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              itemTextStyle={[tw`text-sm`, {fontFamily: Fonts.regular}]}
              itemContainerStyle={[
                tw`w-30 rounded-lg shadow-md`,
                {backgroundColor: colors.white},
              ]}
              containerStyle={[
                tw`w-30 rounded-lg shadow-md`,
                {backgroundColor: colors.white},
              ]}
              style={[
                tw`h-10 rounded-lg px-3 w-30 shadow-md`,
                {backgroundColor: colors.white},
              ]}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
