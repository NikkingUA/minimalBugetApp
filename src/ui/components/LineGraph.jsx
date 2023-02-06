import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { colors } from '../../theme/color/color';


const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Otto', 'Nov', 'Dic'],
    datasets: [
      {
        data: [20, 45, 28, 80, 70, 99, 150, 55, 30, 31, 25, 45],
      },
    ],
  };

const LineGraph = () => {
  return (
    <View>
      <LineChart
        data={data}
        width={Dimensions.get('window').width}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: colors.one.ligthBlue,
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default LineGraph;