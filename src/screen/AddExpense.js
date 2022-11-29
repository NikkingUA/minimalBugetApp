import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet } from 'react-native';

import SelectDropdown from 'react-native-select-dropdown'
import { colors } from '../theme/color/color';

import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    CustomButton,
    CustomIcon,
    CustomInput,
    CustomTextArea
} from '../ui/atoms';
import { paymentMethod } from '../utils/const';


const AddExpense = (props) => {

    const navigation = useNavigation();

    const [addExpense, setAddExpense] = useState({});
    const [moneyList, setMoneyList] = useState(null);
    const [enable, setEnable] = useState(false);

    const handleClick = async () => {
        try {
            const money = await AsyncStorage.getItem('@moneyData');
            console.log('array');
            const newDataMoney = JSON.parse(money).concat([{
                id: new Date(),
                title: addExpense.title,
                category: 'Drink',
                methodOfPayments: addExpense.paymentMethod,
                description: addExpense.description,
                creationDate: moment().format('MMMM Do YYYY, h:mm:ss a'),
                spendMoney: addExpense.money,
                addExpense: true,
                valute: '$'
            }]);
            await AsyncStorage.setItem('@moneyData', JSON.stringify(newDataMoney));
        } catch (error) {
            console.log('Error -> addExpense');
        }
        navigation.navigate('Wallet')
    }

    useEffect(() => {
        // getMoneyList();
        if (addExpense.money && addExpense.description && addExpense.title && addExpense.paymentMethod) {
            if (addExpense.money !== '' || addExpense.description !== '' || addExpense.title !== '') {
                setEnable(true)
            }
        } else {
            setEnable(false)
        }
    }, [addExpense.money, addExpense.description, addExpense.label]);

    return (
        <View style={styled.container}>
            <View>
                <View>
                    <CustomInput
                        placeholder="100$"
                        type="numeric"
                        onChange={(value) => setAddExpense({
                            ...addExpense,
                            money: value
                        })}
                    />
                </View>
                <View>
                    <SelectDropdown
                        buttonStyle={styled.input}
                        rowTextStyle={styled.dropDown}
                        selectedRowStyle={styled.dropDown}
                        buttonTextStyle={styled.buttonTextDropDown}
                        data={paymentMethod}
                        renderDropdownIcon={isOpened => {
                            return <CustomIcon
                                type={isOpened ? 'chevron-up' : 'chevron-down'}
                                size={25}
                                color="black"
                            />
                        }}
                        onSelect={(selectedItem, index) => {
                            setAddExpense({
                                ...addExpense,
                                paymentMethod: selectedItem
                            })
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                </View>
                <View>
                    <CustomInput
                        placeholder="Label"
                        type="default"
                        onChange={(value) => setAddExpense({
                            ...addExpense,
                            title: value
                        })}
                    />
                </View>
                <View>
                    <CustomTextArea
                        type="default"
                        placeholder="Insert hear your description..."
                        onChange={(value) => setAddExpense({
                            ...addExpense,
                            description: value
                        })}
                    />
                </View>
            </View>
            <View>
                <CustomButton
                    label="ADD"
                    action={() => handleClick()}
                    enable={enable}
                />
            </View>
        </View>
    )
}

const styled = StyleSheet.create({
    container: {
        margin: 5,
        justifyContent: 'space-between'
    },
    input: {
        backgroundColor: colors.one.ligthGreen,
        height: 60,
        width: '90%',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
        borderRadius: 10
    },
    buttonTextDropDown: {
        fontSize: 14,
        marginRight: 260
    },
    dropDown: {
        textAlign: 'left'
    }
})
export default AddExpense;