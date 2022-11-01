import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet } from 'react-native';

import SelectDropdown from 'react-native-select-dropdown'
import { colors } from '../theme/color/color';

import {
    CustomButton,
    CustomInput,
    CustomTextArea
} from '../ui/atoms';


const AddIncome = (props) => {

    const newIncomeData = [];
    const countries = ["Egypt", "Canada", "Australia", "Ireland"]

    const [addIncome, setAddIncome] = useState({});
    const [mineyList, setMoneyList] = useState(null);
    const [enable, setEnable] = useState(false);

    const getMoneyList = async () => {
        try {
            const moneyList = await AsyncStorage.getItem('@moneyData');
            setMoneyList(moneyList);
        } catch (error) {
            console.log('error -> add income', error);
        }
    }

    const handleClick = async () => {
        try {
            const jsonValue = JSON.stringify(addIncome);
            await AsyncStorage.setItem('@moneyData', jsonValue);
        } catch (error) {
            console.log('Error -> addIncome');
        }
    }

    useEffect(() => {
        getMoneyList();
        if (addIncome.money && addIncome.description && addIncome.label) {
            if (addIncome.money !== '' || addIncome.description !== '' || addIncome.label !== '') {
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
                <View>
                    <SelectDropdown
                        buttonStyle={styled.input}
                        data={countries}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
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
                            label: value
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
        width: '90%',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
        borderRadius: 10
    }
})
export default AddIncome;