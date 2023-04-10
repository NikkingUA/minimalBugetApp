import React, {useState, useEffect} from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

import { colors } from '../theme/color/color';

import AsyncStorage from '@react-native-async-storage/async-storage';
import PieGraph from '../ui/components/PieGraph';
import { colorOfStatistic, filterDates } from '../utils/common';
import DatePickerComponent from '../ui/atoms/DataPicker'; 

const Statistic = (props) => {

    const [dataMoney, setDataMoney] = useState([]);
    const [showDatePiker, setShowDatePiker]= useState(false);
    const [selectedDate, setSelectedDate] = useState({});
    const [resetFilters, setResetFilter] = useState(false);

    const applyDateFilters = (startDate, endDate) => {
        setDataMoney(filterDates(dataMoney, startDate, endDate));
    };

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@moneyData');
            return jsonValue != null ? setDataMoney(JSON.parse(jsonValue)) : null;
        } catch (e) {
            console.log('Get data wallet error: ', e);
        }
    };

    const calcTotalCategory = (arr, category, addIncome) => {
        if(addIncome){
             const filteredArr = arr?.filter(item => item.category === category && item.addIncome === true);
        return filteredArr.reduce((acc, obj) => {
            return parseInt(acc) + parseInt(obj.spendMoney);
        }, 0);
        }else{
            const filteredArr = arr?.filter(item => item.category === category && item.addIncome === false);
        return filteredArr.reduce((acc, obj) => {
            return parseInt(acc) + parseInt(obj.spendMoney);
        }, 0);
        }
    };

    function incomeObject(arr) {
        return arr.filter((obj, index, arr) => 
            index === arr.findIndex(item => 
                Object.keys(obj).every(key => obj.category === item.category && item.addIncome === true && item.savingMoney === false)
            )
        )
    };

    function expenseObject(arr) {
        return arr.filter((obj, index, arr) => 
            index === arr.findIndex(item => 
                Object.keys(obj).every(key => obj.category === item.category && item.addIncome === false && item.savingMoney === false)
            )
        );
    };

    const refactorDataGrapf = (arr) => {
        return arr?.map(item => ({ 
            value: item.spendMoney,
            color: colorOfStatistic(item.category)
        }));
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        getData();
        console.log('reset')
    }, [resetFilters]);


    // console.log(selectedDate);

    return (
      <>
       {dataMoney.length > 0 ?  <View style={styled.chartContainer}> 
            <View>
                <Text style={styled.statisticTitle}>Income</Text>
                <PieGraph
                    data={refactorDataGrapf(incomeObject(dataMoney))}
                    width={200}
                    height={200}
                />
            </View>
            <View>
                <Text style={styled.statisticTitle}>Expense</Text>
                <PieGraph
                    data={refactorDataGrapf(expenseObject(dataMoney))}
                    width={200}
                    height={200}
                />
           </View>
        </View> 
        : 
        <View style={styled.listEmpty}>
            <Text style={styled.listEmptyTitle}> You dont have any statistic...</Text>
        </View>
        }
        <View style={styled.filtersContainer}>
            <TouchableOpacity
                onPress={() => setShowDatePiker(true)}
                style={styled.selectDateButton}
            >
            <Text style={styled.titleSelectedDate}>{Object.keys(selectedDate).length > 0 ? `${selectedDate.startDate} - ${selectedDate.endDate}` : 'Select date'}</Text>
        </TouchableOpacity> 
        <TouchableOpacity
            onPress={() => {
                setResetFilter(!resetFilters);
                setSelectedDate({});
            }}
            style={styled.selectDateReset}
         >
            <Text style={styled.titleRest}>Reset</Text>
        </TouchableOpacity> 
        </View>
            {dataMoney.length > 0 ? (
            <>
            <View style={styled.spendListContainer}>
            <View style={styled.statisticIncomeContainer}>
                {incomeObject(dataMoney)?.map(item => (
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 5,
                        paddingHorizontal: 15,
                        paddingVertical: 5,
                        backgroundColor: colorOfStatistic(item.category),
                        borderRadius: 15
                    }}>
                        <Text style={styled.titleMoney}>{item.category}: {calcTotalCategory(dataMoney ,item.category, item.addIncome)}$</Text>
                    </View>
                ))}
            </View>
            <View style={styled.statisticExpenseContainer}>
                {expenseObject(dataMoney)?.map(item => (
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 5,
                        paddingHorizontal: 15,
                        paddingVertical: 5,
                        backgroundColor: colorOfStatistic(item.category),
                        borderRadius: 15
                    }}>
                        <Text style={styled.titleMoney}>{item.category}: {calcTotalCategory(dataMoney ,item.category, item.addIncome)}$</Text>
                    </View>
                ))}
            </View>
             </View>
            </>
            ) :
            (
                 <View style={styled.listEmpty}>
                     <Text style={styled.listEmptyTitle}> You dont have any statistic...</Text>
                </View>

            )
        }
        <DatePickerComponent
          showDatePiker={showDatePiker}
          setShowDatePiker={setShowDatePiker}
          setSelectedDate={setSelectedDate}
          applyDateFilters={applyDateFilters}
        />
      </>
    );
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
    listEmpty:{
        marginHorizontal: 10,
        marginVertical: 30,
        padding: 30,
        backgroundColor: colors.one.ligthBlue,
        borderRadius: 20
    },
    listEmptyTitle:{
        textAlign: 'center',
        fontSize: 17,
        color: colors.one.ligthWhite
    },
    emptyTitle: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15
    },
    chartContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    incomeExpenseTitle:{
        fontSize: 15,
        fontWeight: "bold"
    },
    spendListContainer:{
        borderRadius: 10,
        margin: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    statisticIncomeContainer:{
        width: '49%',
        padding: 15,
        // backgroundColor: colors.one.ligthGreenStatistic,
        // borderRadius: 10
    },
    statisticExpenseContainer: {
        width: '49%',
        padding: 15,
        // backgroundColor: colors.one.ligthRoseStatistic,
        // borderRadius: 10
    },
    titleMoney: {
        color: colors.one.ligthWhite,
        fontWeight: '500',
        fontSize: 12
    },
    titleCategConteiner: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    selectDateButton: {
        backgroundColor: colors.one.ligthBlue,
        borderRadius: 10,
        width: '70%',
        padding: 7,
        alignItems: 'center', 
    },
    selectDateReset: {
         width: '30%',
        padding: 7,
        alignItems: 'center', 
    },
    titleSelectedDate: {
        color: 'white',
        fontSize: 14
    },
    filtersContainer:{
        flexDirection: 'row',
        marginHorizontal: 25
    },
    titleRest: {
        color: 'green'
    }
});

export default Statistic;