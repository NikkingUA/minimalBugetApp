import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet, ScrollView } from 'react-native';

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
import { category, paymentMethod } from '../utils/const';
import { Toast } from 'react-native-toast-message/lib/src/Toast';


const AddIncome = (props) => {

    const navigation = useNavigation();

    const [addIncome, setAddIncome] = useState({});
    const [moneyList, setMoneyList] = useState(null);
    const [enable, setEnable] = useState(false);

    const handleClick = async () => {
        try {
            const money = await AsyncStorage.getItem('@moneyData');
            console.log('array');
            const newDataMoney = JSON.parse(money).concat([{
                id: Date.now(),
                title: addIncome.title,
                category: 'Drink',
                methodOfPayments: addIncome.paymentMethod,
                description: addIncome.description,
                creationDate: moment().format('MMMM Do YYYY, h:mm'),
                spendMoney: addIncome.money,
                addIncome: true,
                valute: '$'
            }]);
            await AsyncStorage.setItem('@moneyData', JSON.stringify(newDataMoney));
            Toast.show({
                type: 'success',
                text1: 'Add income',
                text2: 'Income add with success',
                position: 'top',
                topOffset: 10
            });
        } catch (error) {
            console.log('Error -> addIncome');
            Toast.show({
                type: 'error',
                text1: 'Add income',
                text2: 'Error add income',
                position: 'top',
                topOffset: 10
            });
        }
        navigation.navigate('Wallet');
    }

    useEffect(() => {
        // getMoneyList();
        if (addIncome.money && addIncome.description && addIncome.title && addIncome.paymentMethod) {
            if (addIncome.money !== '' || addIncome.description !== '' || addIncome.title !== '') {
                setEnable(true)
            }
        } else {
            setEnable(false)
        }
    }, [addIncome.money, addIncome.description, addIncome.label]);

    return (
        <View style={styled.container}>
            <View>
                <View>
                    <CustomInput
                        placeholder="100$"
                        type="numeric"
                        onChange={(value) => setAddIncome({
                            ...addIncome,
                            money: value
                        })}
                    />
                </View>
                <View style={styled.selectContainer}>
                    <SelectDropdown
                        buttonStyle={styled.input}
                        rowTextStyle={styled.dropDown}
                        selectedRowStyle={styled.dropDown}
                        defaultButtonText={'Payment method'}
                        buttonTextStyle={styled.buttonTextDropDown}
                        dropdownStyle={styled.dropDownContainer}
                        data={paymentMethod}
                        renderDropdownIcon={isOpened => {
                            return <CustomIcon
                                type={isOpened ? 'chevron-up' : 'chevron-down'}
                                size={25}
                                color="black"
                            />
                        }}
                        onSelect={(selectedItem, index) => {
                            setAddIncome({
                                ...addIncome,
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
                    <SelectDropdown
                        buttonStyle={styled.input}
                        rowTextStyle={styled.dropDown}
                        selectedRowStyle={styled.dropDown}
                        buttonTextStyle={styled.buttonTextDropDown}
                        data={category}
                        defaultButtonText={'Category'}
                        dropdownStyle={styled.dropDownContainer}
                        renderDropdownIcon={isOpened => {
                            return <CustomIcon
                                type={isOpened ? 'chevron-up' : 'chevron-down'}
                                size={25}
                                color="black"
                            />
                        }}
                        onSelect={(selectedItem, index) => {
                            setAddIncome({
                                ...addIncome,
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
                        onChange={(value) => setAddIncome({
                            ...addIncome,
                            title: value
                        })}
                    />
                </View>
                <View>
                    <CustomTextArea
                        type="default"
                        placeholder="Insert hear your description..."
                        onChange={(value) => setAddIncome({
                            ...addIncome,
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
        width: '80%',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
        borderRadius: 10
    },
    buttonTextDropDown: {
        fontSize: 14,
        // marginRight: 260,
        textAling: 'left'
    },
    dropDown: {
        textAlign: 'left'
    },
    dropDownContainer: {
        borderRadius: 10
    },
    selectContainer: {
        flexDirection: 'row',
        width: '50%'
        // paddingHorizontal: '3%'
    }
})
export default AddIncome;