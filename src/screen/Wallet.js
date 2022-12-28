import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { colors } from '../theme/color/color';

import { IconMenu, SpendList } from '../ui/components';

import moment from 'moment';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const Wallet = ({ data, onUpdateData }) => {

    const [dataMoney, setDataMoney] = useState([]);

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@moneyData');
            return jsonValue != null ? setDataMoney(JSON.parse(jsonValue)) : null;
        } catch (e) {
            console.log('Get data wallet error: ', e);
        }
    };

    console.log('Data from stack', data);

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
                        <Text style={styled.saldoText}>Saldo: </Text>
                        <Text style={styled.numberMoney}>1800$</Text>
                    </Text>
                </View>
                <IconMenu />
            </View>
            <View style={styled.itemContainer}>
                <View>
                    <Text style={styled.titleText}>Spese</Text>
                </View>
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
        marginTop: 40,
        marginHorizontal: 20,
        borderRadius: 11,
        marginBottom: 20,
        paddingHorizontal: 25,
        paddingVertical: 20,
        flex: 1
    },
    numberMoney: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: 23
    },
    itemContainer: {
        backgroundColor: colors.one.ligthBlueTrasparent,
        borderRadius: 10,
        marginHorizontal: 20,
        padding: 10,
        flex: 3
    }
})

export default Wallet;