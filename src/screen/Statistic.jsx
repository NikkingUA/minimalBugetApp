import React, {useState, useEffect} from 'react';
import { Text, StyleSheet, Dimensions, View } from 'react-native';

import { colors } from '../theme/color/color';
import { colorArray } from '../utils/const';

import { PieChart } from "react-native-chart-kit";
import AsyncStorage from '@react-native-async-storage/async-storage';

const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientTo: "white",
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 3,
  barPercentage: 0.5
};

const Statistic = (props) => {

      const [dataMoney, setDataMoney] = useState([]);

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@moneyData');
            return jsonValue != null ? setDataMoney(JSON.parse(jsonValue)) : null;
        } catch (e) {
            console.log('Get data wallet error: ', e);
        }
    };

        const filteredArrayIncome =  dataMoney
            .map(e => e['category'])
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter(obj=> dataMoney[obj])
            .map(e => dataMoney[e]).filter(income => income.addIncome === true);

        const filteredArrayExpense =  dataMoney
            .map(e => e['category'])
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter(obj=> dataMoney[obj])
            .map(e => dataMoney[e]).filter(income => income.addIncome === false);

        console.log(filteredArrayExpense);
    
        const dataIncome = filteredArrayIncome.map(item => ({ 
            name: item.category,
            spendMoney: parseInt(item.spendMoney),
            color: colorArray[Math.floor(Math.random() * colorArray.length)],
            legendFontColor: "white",
            legendFontSize: 13
        }));

        const dataExpense = filteredArrayExpense.map(item => ({ 
            name: item.category,
            spendMoney: parseInt(item.spendMoney),
            color: colorArray[Math.floor(Math.random() * colorArray.length)],
            legendFontColor: "white",
            legendFontSize: 13
        }));

    useEffect(() => {
        getData();
    }, []);

    return (
        <View style={styled.chartContainer}>
               {/* {dataExpense.length > 0 && dataIncome.length > 0 ? ( */}
                   <>
                    <View>
                        <Text style={styled.incomeExpenseTitle}>Income</Text>
                        <PieChart
                                data={dataIncome}
                                width={370}
                                height={230}
                                chartConfig={chartConfig}
                                accessor={"spendMoney"}
                                backgroundColor={colors.one.ligthBlue}
                                center={[10, 0]}
                                absolute
                                style={styled.barChart}
                        />
                    </View>
                   <View style={{marginTop: 40}}>
                         <Text style={styled.incomeExpenseTitle}>Expense</Text>
                        <PieChart
                                data={dataExpense}
                                width={370}
                                height={230}
                                chartConfig={chartConfig}
                                accessor={"spendMoney"}
                                backgroundColor={colors.one.ligthBlue}
                                center={[10, 0]}
                                absolute
                                style={styled.barChart}
                        />
                    </View>
                   </>
                {/* ) : ( */}
                {/* <Text style={styled.emptyTitle}>There are no statistics...</Text> */}
                {/* ) */}
            {/* } */}
        </View>
    )
}

const styled = StyleSheet.create({
    barChart:{
        borderRadius: 20,
        marginTop: 10
    },
    statisticTitle: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold"
    },
    emptyTitle: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20
    },
    chartContainer: {
        margin: 10,
        flex: 1
    },
    incomeExpenseTitle:{
        fontSize: 15,
        fontWeight: "bold"
    }
})

export default Statistic;