import React from 'react';
import useColors from '../zustand/useColor';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';
import {GearIcon, PersonIcon} from '../../assets/icons';

type Props = {
  isMyPost?: boolean;
};

const HeaderButton = (props: Props) => {
  const colors = useColors();
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  if (props.isMyPost) {
    return (
      <View style={tw`mr-4`}>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={[
            tw`py-1.5 px-1.7 rounded-full`,
            {backgroundColor: colors.secondary},
          ]}>
          <GearIcon width={25} height={25} />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={tw`mr-4`}>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={[
            tw`py-2.5 px-3.2 rounded-full`,
            {backgroundColor: colors.secondary},
          ]}>
          <PersonIcon />
        </TouchableOpacity>
      </View>
    );
  }
};

export default HeaderButton;
