import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Keyboard } from 'react-native';

import { colors } from '../theme/color/color';
import {
    CustomButton,
    CustomIcon,
    CustomInput,
    CustomTextArea
} from '../ui/atoms';
import { categoryIncome, paymentMethod } from '../utils/const';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SelectDropdown from 'react-native-select-dropdown';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import moment from 'moment';


const AddIncome = (props) => {

    const navigation = useNavigation();

    const [addIncome, setAddIncome] = useState({});
    const [moneyList, setMoneyList] = useState([]);
    const [enable, setEnable] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@moneyData');
            return jsonValue != null && setMoneyList(JSON.parse(jsonValue));
        } catch (e) {
            console.log('Get data wallet error: ', e);
        }
    };

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    useEffect(() => {
        getData();
    }, []);

    const handleAddIncome = async () => {
        try {
            const newDataMoney = {
                id: Date.now(),
                title: addIncome.title,
                category: addIncome.category,
                methodOfPayments: addIncome.paymentMethod,
                description: addIncome.description,
                creationDate: moment().format('MMMM Do YYYY, hh:mm'),
                spendMoney: addIncome.money,
                addIncome: true,
                savingMoney: false,
                valute: '$'
            };
            const updatedMoneyData = [...moneyList, newDataMoney];

            await AsyncStorage.setItem('@moneyData', JSON.stringify(updatedMoneyData));
            Toast.show({
                type: 'success',
                text1: 'Add Income',
                text2: 'Income add with success',
                position: 'top',
                topOffset: 10
            });
        } catch (error) {
            console.log('Error -> addIncome', error);
            Toast.show({
                type: 'error',
                text1: 'Add income',
                text2: 'Error add income',
                position: 'top',
                topOffset: 10
            });
        }
        navigation.replace('Wallet');
    }

    useEffect(() => {
        if (addIncome.money && addIncome.title && addIncome.paymentMethod) {
            if (addIncome.money !== '' || addIncome.title !== '') {
                setEnable(true)
            }
        } else {
            setEnable(false)
        }
    }, [addIncome.money, addIncome.title]);

    return (
        <KeyboardAwareScrollView style={styled.container}>
            <View>
                <Text style={styled.titleAdd}>Add Income</Text>
            <View>
                <View>
                    <CustomInput
                        placeholder="100$"
                        type="numeric"
                        onChange={(value) => setAddIncome({
                            ...addIncome,
                            money: value
                        })}
                        maxLength={5}
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
                        data={categoryIncome}
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
                                category: selectedItem
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
                {!keyboardVisible ? (
                    <CustomButton
                    label="ADD"
                    action={() => handleAddIncome()}
                    enable={enable}
                />
                ) : (
                    <CustomButton
                    label="Close keyboard"
                    action={() => keyboardDidHideListener}
                    enable={true}
                />
                )}
            </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

const styled = StyleSheet.create({
    container: {
        // margin: 5,
        // justifyContent: 'space-between'
    },
    input: {
        backgroundColor: colors.one.ligthBlueInput,
        height: 60,
        width: '80%',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
        borderRadius: 20
    },
    buttonTextDropDown: {
        fontSize: 14,
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
    },
    titleAdd: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    absoluteText:{
        color: 'white',
        textAlign: 'center'
    }
})
export default AddIncome;