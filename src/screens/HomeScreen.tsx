import {
  View,
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import usePostStore from '../zustand/postStore';
import {NoDataComponent, PostComponent} from '../components';
import useColors from '../zustand/useColor';

const HomeScreen = () => {
  const colors = useColors();
  const {isLoadingPost, posts, fetchPosts} = usePostStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  return (
    <View
      style={[
        tw`flex-1 items-center px-5`,
        {backgroundColor: colors.background},
      ]}>
      <View style={tw`py-1.5`} />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }>
        <FlatList
          data={posts}
          keyExtractor={item => item.id.toString()}
          overScrollMode="never"
          scrollEnabled={false}
          bounces={true}
          contentContainerStyle={tw`pt-2 pb-30`}
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
        {posts.length === 0 && !isLoadingPost && (
          <View style={tw`pt-20`}>
            <NoDataComponent text="No post found" />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
