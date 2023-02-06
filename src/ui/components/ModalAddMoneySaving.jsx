import React, {useState} from 'react';

import {View, Text, Modal, StyleSheet} from 'react-native';
import { CustomButtonSaving, CustomIcon, CustomInput } from '../atoms';
import { colors } from '../../theme/color/color';
import moment from 'moment';


const ModalAddMoneySaving = ({visible, setVisible, label, moneyData}) => {

    const [moneyValue, setMoneyValue] = useState('');

    const newDataMoney = {
                id: Date.now(),
                title: label,
                category: 'Saving money',
                methodOfPayments: 'Card',
                description: '',
                creationDate: moment().format('MMMM Do YYYY, hh:mm'),
                spendMoney: moneyValue,
                addIncome: 'savingMoney',
                savingMoney: true,
                valute: '$'
            };
            const updatedMoneyData = [...moneyData, newDataMoney];

            // await AsyncStorage.setItem('@moneyData', JSON.stringify(updatedMoneyData));

    return (
       <View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={visible}
                    onRequestClose={() => setVisible(false)}
                >
                   <View style={{alignItems: 'flex-end', margin: 20}}>
                         <CustomIcon
                            type="close"
                            color="black"
                            size={40}
                            onAction={() => setVisible(false)}
                        />
                   </View>
                    <Text style={styled.titleStyle}>Add money for {label}</Text>
                   <View style={{flex: 2}}>
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
                            backgroundColor={colors.one.ligthGreen}
                            onClick={() => setVisible(false)}
                        />
                   </View>
                </Modal> 
            </View>
    );
};

const styled = StyleSheet.create({
    titleStyle:{
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        flex: 1
    },
    buttonContainer:{
        alignItems: 'center',
        margin: 10
    }
});


export default ModalAddMoneySaving;