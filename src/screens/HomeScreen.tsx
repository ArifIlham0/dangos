import {
  View,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect} from 'react';
import tw from 'twrnc';
import useThemeStore from '../zustand/themeStore';
import COLORS from '../constants/color';
import {Fonts} from '../constants/font';
import {PersonIcon} from '../../assets/icons';
import usePostStore from '../zustand/postStore';
import {PostComponent} from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 50;
  const {isDarkMode} = useThemeStore();
  const colors = COLORS(isDarkMode);
  const {isLoading, posts, fetchPosts} = usePostStore();

  useEffect(() => {
    // await AsyncStorage.setItem("uuid", );
    fetchPosts();
  }, [fetchPosts]);

  return (
    <View
      style={[
        tw`flex-1 items-center px-5`,
        {paddingTop: statusBarHeight, backgroundColor: colors.background},
      ]}>
      <View style={tw`flex-row items-center justify-between w-full`}>
        <Text style={[tw`text-xl`, {fontFamily: Fonts.semiBold}]}>Explore</Text>
        <TouchableOpacity
          style={[
            tw`py-2.5 px-3.2 rounded-full`,
            {backgroundColor: colors.secondary},
          ]}>
          <PersonIcon />
        </TouchableOpacity>
      </View>
      <View style={tw`py-1`} />
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={tw`pt-6 pb-30`}
        renderItem={({item, index}) => {
          const barWidth = 50;
          const chartWidth = Math.max(
            item.apps.length * barWidth,
            Dimensions.get('window').width - 60,
          );
          const chartData = {
            labels: item.apps.map(value => value.name),
            datasets: [{data: item.apps.map(value => value.duration)}],
          };
          return (
            <PostComponent
              item={item}
              index={index}
              chartData={chartData}
              chartWidth={chartWidth}
            />
          );
        }}
      />
      {isLoading && (
        <View
          style={[
            tw`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50`,
          ]}>
          <View
            style={[
              tw`py-6 px-9 rounded-lg`,
              {backgroundColor: colors.background},
            ]}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
