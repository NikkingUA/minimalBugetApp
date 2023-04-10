import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { CustomButton, CustomIcon, CustomInput } from '../ui/atoms';

import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';
import { chooseColorOfSavingMoney } from '../utils/const';
import { colors } from '../theme/color/color';



const AddSaveMoney = (props) => {
    const [savingMoney, setSavingMoney] = useState([]);
    const [newSave, setNewSave] = useState({
        label: '',
        limit: '',
        backgroundColor: ''
    });
    const navigation = useNavigation();

     const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@savingDataMoney');
            return jsonValue != null ? setSavingMoney(JSON.parse(jsonValue)) : null;
        } catch (e) {
            console.log('Get data wallet error: ', e);
        };
    };

    const addSaveMoney = async () => {
        const newDataSaveMoney = {
            id: Date.now(),
            label: newSave.label,
            limit: newSave.limit,
            actualValue: 0,
            bgColor: ''
        };
        const updatedMoneyData = [...savingMoney, newDataSaveMoney];

        await AsyncStorage.setItem('@savingDataMoney', JSON.stringify(updatedMoneyData));
        navigation.replace('SavingsMoney');
    };

    const isDisabled = () => 
        newSave.label !== '' &&
        newSave.limit !== '' 
        // newSave.backgroundColor !== ''

    useEffect(() => {
        getData();
    }, []);


// const choosedColors = chooseColorOfSavingMoney.map(item => item)

//     console.log(choosedColors);

    return (
        <View>  
            {/* <Text>Create new save money</Text> */}
            <View>
                <CustomInput
                    placeholder="Your label..."
                    type="text"
                    onChange={(value) => setNewSave({...newSave, label: value})}
                    backgroundColor={newSave?.label.length > 0 ? colors.one.ligthGreen : colors.one.ligthBlueInput}
                />
                <CustomInput
                    placeholder="Your limit..."
                    type="numeric"
                    onChange={(value) => setNewSave({...newSave, limit: value})}
                    maxLength={8}
                    backgroundColor={newSave?.limit.length > 0 ? colors.one.ligthGreen : colors.one.ligthBlueInput}
                />
                {/* <SelectDropdown
                        buttonStyle={{
                            backgroundColor: newSave?.backgroundColor.length > 0 ? colors.one.ligthGreen : colors.one.ligthBlueInput,
                            height: 60,
                            width: '90%',
                            marginHorizontal: 20,
                            marginVertical: 10,
                            padding: 10,
                            borderRadius: 20
                        }}
                        rowTextStyle={styled.dropDown}
                        selectedRowStyle={styled.dropDown}
                        buttonTextStyle={styled.buttonTextDropDown}
                        data={chooseColorOfSavingMoney}
                        defaultButtonText={'Color of box'}
                        dropdownStyle={styled.dropDownContainer}
                        renderCustomizedRowChild={(item, index) => {
                            return (
                                <View style={{
                                    backgroundColor: chooseColorOfSavingMoney.map(item => item), 
                                    width: 100, 
                                    height: 30, 
                                    borderRadius: 5
                                }}/>
                            );
                        }}
                        renderDropdownIcon={isOpened => {
                            return <CustomIcon
                                type={isOpened ? 'chevron-up' : 'chevron-down'}
                                size={15}
                                color="black"
                            />
                        }}
                        onSelect={(selectedItem, index) => {
                           setNewSave({...newSave, backgroundColor: selectedItem});
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    /> */}
            </View>
            <View>
            <CustomButton
                label="Add" 
                action={() => {
                    addSaveMoney();
                }}
                enable={isDisabled()}
            />
            </View>
        </View>
    )
};

const styled = StyleSheet.create({
    buttonTextDropDown: {
        fontSize: 14,
        textAling: 'center'
    },
    dropDown: {
        textAlign: 'center',
        color: 'white'
    },
    dropDownContainer: {
        borderRadius: 10,
        backgroundColor: colors.one.ligthBlueOne
    },
    selectContainer: {
        flexDirection: 'row',
        width: '50%'
    },
});


export default AddSaveMoney;