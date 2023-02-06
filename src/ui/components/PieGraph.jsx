import React from 'react';
import { View} from 'react-native';
import { PieChart } from 'react-native-svg-charts'

const DonutGraph = ({ data, width, height }) => {

    const pieData = data.map((item, index) => {
      return {
        key: `${index}`,
        value: item.value,
        svg: { fill: item.color },
        arc: { outerRadius: '80%', cornerRadius: 0 }
      }
    });

    return (
        <View>
        <PieChart
            style={{ height: height, width: width}}
            data={ pieData }
        />
        </View>
    )
};

export default DonutGraph;