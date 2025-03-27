import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import useColors from '../zustand/useColor';
import {Image, Text, View} from 'react-native';
import {Fonts} from '../constants/font';
import HeaderButton from './HeaderButton';
import {HomeScreen, MyPostScreen} from '../screens';
import tw from 'twrnc';
import useUserStore from '../zustand/userStore';

type Props = {
  isMyPost?: boolean;
};

const Drawer = createDrawerNavigator();

const HeaderDrawer = (props: Props) => {
  const colors = useColors();
  const {
    isLoadingUser,
    errMessage,
    succMessage,
    setErrMessage,
    setSuccMessage,
    user,
    fetchUser,
  } = useUserStore();
  const [imageUrl, setImageUrl] = useState('');

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
              <View
                style={[
                  tw`items-center p-1.5 rounded-full absolute -top-10`,
                  {backgroundColor: colors.background},
                ]}>
                {!user ||
                !user.image_url ||
                !user.image_url.startsWith('http') ? (
                  <Image
                    source={require('../../assets/images/default_profile.jpg')}
                    style={tw`w-10 h-10 rounded-full`}
                  />
                ) : (
                  <Image
                    source={{uri: user.image_url}}
                    style={tw`w-16 h-16 rounded-full`}
                  />
                )}
              </View>
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
