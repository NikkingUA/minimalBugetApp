import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

import { colors } from '../theme/color/color';

import { IconMenu, SpendList } from '../ui/components';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Wallet = (props) => {

    const [dataMoney, setDataMoney] = useState([
        {
            id: 1,
            title: 'Coca-Cola',
            category: 'Drink',
            methodOfPayments: 'CreditCard',
            description: 'Hello world'
        }
    ]);


    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@moneyData');
            return jsonValue != null ? setDataMoney(JSON.parse(jsonValue)) : null;
        } catch (e) {
            // error reading value
        }
    };




    useEffect(() => {
        getData();
        // clearAll = async () => {
        //     try {
        //         await AsyncStorage.clear()
        //     } catch (e) {
        //         // clear error
        //     }

        //     console.log('Done.')
        // }
    }, []);

    return (
        <View style={styled.principalContainer}>
            <View style={styled.saldoContainer}>
                <View>
                    <Text style={styled.dataText}>Today: 04/08/2022</Text>
                </View>
                <View>
                    <Text>
                        <Text style={styled.saldoText}>Saldo: </Text>
                        <Text style={styled.numberMoney}>1800$</Text>
                    </Text>
                </View>
            </View>
            <IconMenu />
            <View style={styled.itemContainer}>
                <View>
                    <Text style={styled.titleText}>Spese</Text>
                </View>
                <SpendList dataMoney={dataMoney} />
            </View>
        </View>
    )
}

const styled = StyleSheet.create({
    saldoText: {
        fontWeight: '500',
        fontSize: 20
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 20
    },
    dataText: {
        color: 'gray',
        fontSize: 10,
        marginBottom: 15
    },
    saldoContainer: {
        backgroundColor: colors.one.ligthGreen,
        margin: 20,
        borderRadius: 11,
        paddingHorizontal: 25,
        paddingVertical: 20
    },
    numberMoney: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: 20
    },
    itemContainer: {
        backgroundColor: colors.one.ligthGreen,
        borderRadius: 10,
        margin: 20,
        padding: 10,
        height: 390
    }
})

export default Wallet;