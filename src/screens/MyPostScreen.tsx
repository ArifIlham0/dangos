import {
  View,
  ScrollView,
  RefreshControl,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import useColors from '../zustand/useColor';
import usePostStore from '../zustand/postStore';
import tw from 'twrnc';
import {MyPostComponent, NoDataComponent} from '../components';

const MyPostScreen = () => {
  const colors = useColors();
  const {isLoadingPost, myPosts, fetchMyPosts} = usePostStore();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMyPosts();
    setRefreshing(false);
  };
  return (
    <View
      style={[
        tw`flex-1 items-center pt-5`,
        {backgroundColor: colors.background},
      ]}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }
        style={[tw`rounded-t-3xl w-full`, {backgroundColor: colors.secondary}]}>
        <FlatList
          data={myPosts}
          keyExtractor={item => item.id.toString()}
          overScrollMode="never"
          scrollEnabled={false}
          bounces={true}
          numColumns={3}
          contentContainerStyle={tw`pt-6 pb-30 px-2`}
          columnWrapperStyle={tw`justify-between`}
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
              <View style={tw`w-1/3 p-2`}>
                <MyPostComponent
                  item={item}
                  index={index}
                  chartData={chartData}
                  chartWidth={chartWidth}
                />
              </View>
            );
          }}
        />
        {myPosts.length === 0 && !isLoadingPost && (
          <View style={tw`pt-20`}>
            <NoDataComponent text="Your not posting anything yet" />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default MyPostScreen;
