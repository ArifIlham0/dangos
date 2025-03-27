import {View, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {Post} from '../types';
import useColors from '../zustand/useColor';
import tw from 'twrnc';
import {BarChart} from 'react-native-chart-kit';

type Props = {
  item: Post;
  index: number;
  chartData: {
    labels: string[];
    datasets: {data: number[]}[];
  };
  chartWidth: number;
};

const MyPostComponent = (props: Props) => {
  const colors = useColors();

  return (
    <View style={[tw``]}>
      <View
        style={[
          tw`rounded-lg w-full pt-5`,
          {backgroundColor: colors.background},
        ]}>
        <ScrollView horizontal={true}>
          <BarChart
            data={props.chartData}
            width={props.chartWidth - 150}
            height={120}
            yAxisLabel={''}
            yAxisSuffix={''}
            showValuesOnTopOfBars={true}
            fromZero={true}
            withInnerLines={false}
            withVerticalLabels={false}
            style={tw`-ml-13`}
            chartConfig={{
              backgroundGradientFrom: colors.background,
              backgroundGradientTo: colors.background,
              backgroundGradientFromOpacity: 0,
              backgroundGradientToOpacity: 0,
              color: () => colors.red,
              barPercentage: 0.4,
              useShadowColorFromDataset: false,
              decimalPlaces: 0,
              formatYLabel: () => '',
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default MyPostComponent;

export const styles = StyleSheet.create({
  text: {
    fontSize: 10,
  },
});
