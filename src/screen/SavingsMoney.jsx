import React, { useState, useEffect} from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { colors } from '../theme/color/color';
import CustomIcon from '../ui/atoms/CustomIcon';

import AsyncStorage from '@react-native-async-storage/async-storage';


const SavingsMoney = (props) => {
    const [savingMoney, setSavingMoney] = useState([]);
    const [dataMoney, setDataMoney] = useState([]);
    const [update, setUpdate] = useState(false);
    const navigation = useNavigation();

    const getDataSavingMoney = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@savingDataMoney');
            setUpdate(true);
            return jsonValue != null ? setSavingMoney(JSON.parse(jsonValue)) : null;
        } catch (e) {
            console.log('Get data saving money error: ', e);
        }
    };

      const getDataAllMoney = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@moneyData');
            return jsonValue != null ? setDataMoney(JSON.parse(jsonValue)) : null;
        } catch (e) {
            console.log('Get data all data error: ', e);
        }
    };

    function calculatePercentageOfMaxAmount(currentAmount, maxAmount) {
        if(currentAmount > maxAmount) return 100;
        return (currentAmount / maxAmount) * 100;
    };

    useEffect(() => {
        // setData();
        getDataSavingMoney();
        getDataAllMoney();
    }, [update]);

    console.log('saving money', savingMoney);

    return (
        <>
            <ScrollView style={styled.container}>
               {savingMoney.length > 0  ? (
                 <View style={styled.itemContainer}>
                    {savingMoney?.map((item, index, arr) => (
                        <TouchableOpacity 
                            key={index}
                            style={styled.itemStyle}
                            onPress={() => navigation.navigate("InfoSavingsMoney", {
                                id: item.id,
                                label: item.label,
                                limit: item.limit,
                                actualValue: item.actualValue,
                                savingMoney: arr,
                                moneyData: dataMoney,
                                percent: calculatePercentageOfMaxAmount(item.actualValue, item.limit)
                            })}
                        >
                            <Text style={styled.titleSaveMoney}>{item.label}</Text>
                            <Text style={styled.percentedAmount}>
                                {Math.floor(calculatePercentageOfMaxAmount(item.actualValue, item.limit))}%
                            </Text>
                            <View style={styled.moneyContainer}>
                                 <Text style={styled.actualValue}>
                                    {item.actualValue}$
                                </Text>
                                {item.actualValue > item.limit && <View style={{marginLeft: 5, width: 10, height: 10, borderRadius: 100, backgroundColor: 'green'}}/>}
                            </View>
                            
                        </TouchableOpacity>
                    ))}
                </View>
               ) :
               (
                <View style={styled.listEmpty}>
                    <Text style={styled.listEmptyTitle}>Your saving money list is empty...</Text>
                </View>
               )

               }
               <View
                style={styled.buttonAddContainer}
                >
                    <TouchableOpacity
                     style={styled.addSaveMoneyButtonContainer}
                     onPress={() => navigation.navigate('AddSaveMoney')}
                     >
                        <CustomIcon
                            type="add"
                            color="white"
                            size={45}
                            onAction={() => navigation.navigate('AddSaveMoney')}
                        />
                    </TouchableOpacity>
               </View>
            </ScrollView>
        </>
    )
}

const styled = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1
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
    moneyContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    percentedAmount:{
        fontSize: 45,
        fontWeight: 'bold',
        color: 'white',
    },
    titleSaveMoney: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    actualValue: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },
    itemContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    itemStyle: {
        backgroundColor: colors.one.ligthBlue,
        width: 170,
        height: 170,
        borderRadius: 40,
        margin: 8,
        padding: 20
    },
    addSaveMoneyButtonContainer:{
        backgroundColor: colors.one.ligthBlueInput,
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        borderRadius: 100,
        zIndex: 1000
    },
    buttonAddContainer:{
        width: '100%',
        justifyContent: 'center', 
        flexDirection: 'row'}
});

export default SavingsMoney;