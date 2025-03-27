import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import {Fonts} from '../constants/font';
import {BarChart} from 'react-native-chart-kit';
import {CommentIcon, HeartIcon, SendIcon} from '../../assets/icons';
import {Post} from '../types';
import useColors from '../zustand/useColor';
import {formatDate} from '../constants/date';

type Props = {
  item: Post;
  index: number;
  chartData: {
    labels: string[];
    datasets: {data: number[]}[];
  };
  chartWidth: number;
};

const PostComponent = (props: Props) => {
  const colors = useColors();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    if (props.item.caption.length > 84) {
      setIsTruncated(true);
    }
  }, [props.item.caption]);

  return (
    <View
      style={[
        tw`px-4 pb-4 mb-4 rounded-3xl`,
        {backgroundColor: colors.secondary},
      ]}>
      <View style={tw`flex-row items-center py-3 px-3`}>
        {!props.item.user.image_url.startsWith('http') ? (
          <Image
            source={require('../../assets/images/default_profile.jpg')}
            style={tw`w-10 h-10 rounded-full`}
          />
        ) : (
          <Image
            source={{uri: props.item.user.image_url}}
            style={tw`w-10 h-10 rounded-full`}
          />
        )}
        <View style={tw`px-2`} />
        <View>
          <Text style={[tw``, {fontFamily: Fonts.semiBold}]}>
            {props.item.user.name}
          </Text>
          <Text
            style={[
              tw``,
              styles.text,
              {
                fontFamily: Fonts.regular,
                color: colors.placeholder,
              },
            ]}>
            Posted {formatDate(props.item.created_at)}
          </Text>
        </View>
      </View>
      <View
        style={[
          tw`rounded-3xl w-full pt-5`,
          {backgroundColor: colors.background},
        ]}>
        <ScrollView horizontal={true}>
          <BarChart
            data={props.chartData}
            width={props.chartWidth}
            height={250}
            yAxisLabel={''}
            yAxisSuffix={''}
            showValuesOnTopOfBars={true}
            fromZero={true}
            withInnerLines={false}
            chartConfig={{
              backgroundGradientFrom: colors.background,
              backgroundGradientTo: colors.background,
              backgroundGradientFromOpacity: 0,
              backgroundGradientToOpacity: 0,
              color: () => colors.red,
              barPercentage: 0.7,
              useShadowColorFromDataset: false,
              decimalPlaces: 0,
            }}
          />
        </ScrollView>
        <Text style={[tw`px-4`, {fontFamily: Fonts.regular}]}>
          {props.item.device_usage}
        </Text>
        {props.item.caption !== '' && (
          <View>
            <View style={tw`py-1`} />
            <View
              style={[
                tw`h-0.3 rounded-full mx-4 items-center justify-center`,
                {backgroundColor: colors.placeholder},
              ]}
            />
            <View style={tw`py-1`} />
            <Text
              numberOfLines={isExpanded ? undefined : 2}
              ellipsizeMode="tail"
              style={[
                tw`px-4 text-xs text-justify`,
                {fontFamily: Fonts.regular},
              ]}>
              {props.item.caption}
            </Text>
            {!isExpanded && isTruncated && (
              <Text
                onPress={() => setIsExpanded(true)}
                style={[
                  tw`px-4 text-xs`,
                  {fontFamily: Fonts.semiBold, color: colors.primary},
                ]}>
                Read more
              </Text>
            )}
          </View>
        )}
        <View style={tw`py-2`} />
        <View
          style={[
            tw`flex-row items-center justify-between px-5 pt-3 pb-5 rounded-bl-3xl rounded-br-3xl`,
            {backgroundColor: colors.tabBarOpacity},
          ]}>
          <View style={tw`flex-row items-center`}>
            <CommentIcon />
            <View style={tw`px-1`} />
            <Text style={[tw``, {fontFamily: Fonts.semiBold}]}>
              {props.item.comments_count}
            </Text>
            <View style={tw`px-2`} />
            <HeartIcon />
            <View style={tw`px-1`} />
            <Text style={[tw``, {fontFamily: Fonts.semiBold}]}>
              {props.item.likes_count}
            </Text>
          </View>
          <SendIcon />
        </View>
      </View>
    </View>
  );
};

export default PostComponent;

export const styles = StyleSheet.create({
  text: {
    fontSize: 10,
  },
});
