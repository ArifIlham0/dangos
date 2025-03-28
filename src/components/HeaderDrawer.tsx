import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import useColors from '../zustand/useColor';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Fonts} from '../constants/font';
import HeaderButton from './HeaderButton';
import {HomeScreen, MyPostScreen} from '../screens';
import tw from 'twrnc';
import {useThemeStore, useUserStore} from '../zustand';
import CustomButton from './CustomButton';
import {CameraIcon, CameraIconWhite} from '../../assets/icons';
import {openGallery} from '../utils/function';

type Props = {
  isMyPost?: boolean;
};

const Drawer = createDrawerNavigator();

const HeaderDrawer = (props: Props) => {
  const colors = useColors();
  const {isDarkMode} = useThemeStore();
  const [imageUrl, setImageUrl] = useState('');
  const {
    isLoadingUser,
    errMessage,
    succMessage,
    setErrMessage,
    setSuccMessage,
    user,
    fetchUser,
  } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const renderHeaderButton = () => <HeaderButton isMyPost={props.isMyPost} />;

  const renderDrawerContent = () => {
    return (
      <View {...props}>
        {props.isMyPost ? (
          <Text
            style={{
              fontFamily: Fonts.semiBold,
              fontSize: 20,
              color: colors.text,
              marginLeft: 20,
              marginTop: 20,
            }}>
            My Posts
          </Text>
        ) : (
          <View>
            <Image
              source={require('../../assets/images/paint.png')}
              style={tw`w-full h-50`}
            />
            <View style={tw`items-center`}>
              <TouchableOpacity
                onPress={() => openGallery({setImageUrl})}
                style={[
                  tw`items-center p-1.5 rounded-full absolute -top-10`,
                  {backgroundColor: colors.background},
                ]}>
                {!user ||
                !user.image_url ||
                !user.image_url.startsWith('http') ||
                imageUrl ? (
                  <Image
                    source={
                      imageUrl
                        ? {uri: imageUrl}
                        : require('../../assets/images/default_profile.jpg')
                    }
                    style={tw`w-16 h-16 rounded-full`}
                  />
                ) : (
                  <Image
                    source={{uri: user.image_url}}
                    style={tw`w-16 h-16 rounded-full`}
                  />
                )}
                <View
                  style={[
                    tw`absolute bottom-0 right-0 p-1 rounded-full items-center`,
                    {backgroundColor: colors.background},
                  ]}>
                  {isDarkMode ? <CameraIconWhite /> : <CameraIcon />}
                </View>
              </TouchableOpacity>
            </View>
            <View style={tw`py-10`} />
            <Text
              style={[
                tw`text-xl text-center px-6`,
                {fontFamily: Fonts.semiBold},
              ]}>
              {user.name}
            </Text>
            <View style={tw`py-10`} />
            <View style={tw`px-20`}>
              {imageUrl && (
                <CustomButton
                  disabled={imageUrl}
                  text="Save"
                  onPress={() => {}}
                />
              )}
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'right',
        headerRight: renderHeaderButton,
        headerTitleAlign: 'left',
        drawerStyle: {width: '70%'},
        swipeEnabled: true,
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: 'transparent',
        },
      }}
      drawerContent={renderDrawerContent}>
      <Drawer.Screen
        name={props.isMyPost ? 'My Posts' : 'Explore'}
        component={props.isMyPost ? MyPostScreen : HomeScreen}
        options={{
          headerTitleStyle: {fontFamily: Fonts.semiBold, fontSize: 20},
        }}
      />
    </Drawer.Navigator>
  );
};

export default HeaderDrawer;
