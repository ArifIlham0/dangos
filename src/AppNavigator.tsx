import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BlurView} from '@react-native-community/blur';
import tw from 'twrnc';
import {CreatePostScreen} from './screens';
import {TabProps} from './types';
import usePostStore from './zustand/postStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUserStore from './zustand/userStore';
import {HomeIcon, PlusIcon, PostIcon} from '../assets/icons';
import useColors from './zustand/useColor';
import {
  CustomFloatingButton,
  CustomLoading,
  HeaderDrawer,
  UserCreateModal,
} from './components';
import {
  NavigationContainer,
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeHeader = () => {
  return <HeaderDrawer isMyPost={false} />;
};

const MyPostHeader = () => {
  return <HeaderDrawer isMyPost={true} />;
};

const HomeTabIcon = (props: TabProps) => (
  <View style={tw`items-center`}>
    <HomeIcon width={25} height={25} />
    {props.focused && (
      <View
        style={[
          tw`h-0.7 mt-1.2 rounded-sm`,
          {
            width: props.size,
            backgroundColor: props.colors.white,
          },
        ]}
      />
    )}
  </View>
);

const CreateTabButton = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [isModalVisible, setModalVisible] = useState(false);

  const handlePress = async () => {
    const storedUuid = await AsyncStorage.getItem('uuid');
    if (!storedUuid) {
      setModalVisible(true);
    } else {
      navigation.navigate('CreatePost');
    }
  };

  return (
    <View>
      <CustomFloatingButton onPress={handlePress}>
        <PlusIcon />
      </CustomFloatingButton>
      {isModalVisible && (
        <UserCreateModal
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </View>
  );
};

const MyPostTabIcon = (props: TabProps) => (
  <View style={tw`items-center`}>
    <PostIcon width={25} height={25} />
    {props.focused && (
      <View
        style={[
          tw`h-0.7 mt-1.2 rounded-sm`,
          {
            width: props.size,
            backgroundColor: props.colors.white,
          },
        ]}
      />
    )}
  </View>
);

const BottomTabNavigator: React.FC = () => {
  const colors = useColors();
  const {isLoadingPost} = usePostStore();
  const {isLoadingUser} = useUserStore();

  const renderHomeTabIcon = useCallback(
    (props: {focused: boolean; color: string; size: number}) => (
      <HomeTabIcon
        color={props.color}
        size={props.size}
        focused={props.focused}
        colors={colors}
      />
    ),
    [colors],
  );
  const renderCreateTabButton = useCallback(
    (props: any) => <CreateTabButton {...props} colors={colors} />,
    [colors],
  );
  const renderMyPostTabIcon = useCallback(
    (props: {focused: boolean; color: string; size: number}) => (
      <MyPostTabIcon
        color={props.color}
        size={props.size}
        focused={props.focused}
        colors={colors}
      />
    ),
    [colors],
  );

  return (
    <View style={tw`flex-1`}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.white,
          tabBarInactiveTintColor: colors.white,
          tabBarStyle: {
            backgroundColor: colors.tabBar,
            opacity: 0.6,
            position: 'absolute',
            left: 20,
            right: 20,
            height: 80,
            zIndex: 2,
          },
          tabBarIconStyle: {marginTop: 10},
          tabBarShowLabel: false,
          headerShown: false,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeHeader}
          options={{
            tabBarIcon: renderHomeTabIcon,
          }}
        />
        <Tab.Screen
          name="Create"
          component={CreatePostScreen}
          options={{
            tabBarButton: renderCreateTabButton,
          }}
        />
        <Tab.Screen
          name="MyPost"
          component={MyPostHeader}
          options={{
            tabBarIcon: renderMyPostTabIcon,
          }}
        />
      </Tab.Navigator>
      <BlurView
        blurType="light"
        blurAmount={5}
        style={tw`w-full h-20 absolute bottom-0 items-center z-1`}
      />
      {(isLoadingPost || isLoadingUser) && <CustomLoading />}
    </View>
  );
};

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main" component={BottomTabNavigator} />
        <Stack.Screen
          name="CreatePost"
          component={CreatePostScreen}
          options={{animation: 'slide_from_bottom'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
