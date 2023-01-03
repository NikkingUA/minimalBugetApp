import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Gesture } from 'react-native';

import { colors } from '../theme/color/color';
import {
    IconMenu,
    SpendList
} from '../ui/components';
import { calcTotal } from '../utils/calcTotal';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import moment from 'moment';


const Wallet = (props) => {

    const [dataMoney, setDataMoney] = useState([]);

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@moneyData');
            return jsonValue != null ? setDataMoney(JSON.parse(jsonValue)) : null;
        } catch (e) {
            console.log('Get data wallet error: ', e);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <View style={styled.principalContainer}>
        <View style={styled.saldoContainer}>
                <View>
                    <Text style={styled.dataText}>Today: {moment().format('MMMM Do YYYY, hh:mm')}</Text>
                </View>
                <View>
                    <Text>
                        <Text style={styled.saldoText}>Balance: </Text>
                        <Text style={ calcTotal(dataMoney) > 0 ? styled.numberMoney : styled.numberMoneyLessThan}>{`${calcTotal(dataMoney)}$`}</Text>
                    </Text>
                </View>
                <IconMenu />
            </View>
            <View style={styled.itemContainer}>
                {/* <View>
                    <Text style={styled.titleText}>Spese</Text>
                </View> */}
                <SpendList dataMoney={dataMoney} />
            </View>
            <Toast />
        </View>
    )
}

const styled = StyleSheet.create({
    principalContainer: {
        flex: 1
    },
    saldoText: {
        fontWeight: '500',
        fontSize: 25,
        color: 'white'
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 20
    },
    dataText: {
        color: colors.one.ligthWhiteText,
        fontSize: 10,
        marginBottom: 15,
        fontWeight: 'bold'
    },
    saldoContainer: {
        backgroundColor: colors.one.ligthBlue,
        marginHorizontal: 13,
        borderRadius: 25,
        marginBottom: 20,
        paddingHorizontal: 25,
        paddingVertical: 20,
        flex: 1,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 10,
        zIndex: 99
    },
    numberMoney: {
        color: colors.one.ligthGreeMoney,
        fontWeight: 'bold',
        fontSize: 23
    },
    numberMoneyLessThan: {
        color: colors.one.ligthRose,
        fontWeight: 'bold',
        fontSize: 23
    },
    itemContainer: {
        backgroundColor: colors.one.ligthBlueTrasparent,
        borderRadius: 20,
        marginHorizontal: 13,
        padding: 10,
        flex: 3
    }
})

export default Wallet;