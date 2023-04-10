import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';

import { CustomButtonSaving, CustomIcon, CustomInput } from '../atoms';

import { colors } from '../../theme/color/color';

import { useNavigation } from '@react-navigation/native';

import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ModalAddMoneySaving = ({
    visibleAdd,
    setVisibleAdd,
    label,
    moneyData,
    savingMoney,
    id
}) => {

    const [moneyValue, setMoneyValue] = useState('');
    const navigation = useNavigation();

    const addSavingMoney = async () => {
        try {
            if (moneyValue > 0) {
                const newSavingMoney = {
                    id: Date.now(),
                    title: label,
                    category: 'Saving money',
                    methodOfPayments: 'Card',
                    description: '',
                    creationDate: moment().format('MMMM Do YYYY, hh:mm'),
                    spendMoney: moneyValue,
                    addIncome: false,
                    savingMoney: true,
                    savingMoneyTitle: label,
                    valute: '$'
                };

                const updateInfoSavingMoney = savingMoney?.map(item => {
                    if (item.id === id) {
                        return { ...item, actualValue: parseInt(item.actualValue) + parseInt(moneyValue) }
                    }
                    return item;
                });
                const updatedMoneyData = [...moneyData, newSavingMoney];

                await AsyncStorage.setItem('@moneyData', JSON.stringify(updatedMoneyData));
                await AsyncStorage.setItem('@savingDataMoney', JSON.stringify(updateInfoSavingMoney));
            }

        } catch (error) {
            console.log(`Errro add avign money: ${error}`);
        }
    };

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={visibleAdd}
                onRequestClose={() => setVisibleAdd(false)}
            >
                <View style={{ marginTop: 40, marginLeft: 20 }}>
                    <CustomIcon
                        type="close"
                        color="black"
                        size={40}
                        onAction={() => setVisibleAdd(false)}
                    />
                </View>
                <Text style={styled.titleStyle}>Add money for {label}</Text>
                <View>
                    <CustomInput
                        placeholder="Money for saving..."
                        type="numeric"
                        onChange={(value) => setMoneyValue(value)}
                        maxLength={3}
                    />
                </View>
                <View style={styled.buttonContainer}>
                    <CustomButtonSaving
                        label="Add"
                        width={200}
                        height={70}
                        disabled={!moneyValue.trim() ? true : false}
                        backgroundColor={colors.one.ligthGreen}
                        onClick={() => {
                            addSavingMoney();
                            setVisibleAdd(false);
                            navigation.replace('SavingsMoney');
                        }
                        }
                    />
                </View>
            </Modal>
        </View>
    );
};

const styled = StyleSheet.create({
    titleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 50
    },
    buttonContainer: {
        alignItems: 'center',
        margin: 10
    }
});


export default ModalAddMoneySaving;