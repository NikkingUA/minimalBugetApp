import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { CustomButton, CustomInput } from '../ui/atoms';

import AsyncStorage from '@react-native-async-storage/async-storage';



const AddSaveMoney = (props) => {
    const [savingMoney, setSavingMoney] = useState([]);
    const [newSave, setNewSave] = useState({});
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
            id: new Date(),
            label: newSave.label,
            limit: newSave.limit,
            actualValue: 0,
            bgColor: ''
        };
        const updatedMoneyData = [...savingMoney, newDataSaveMoney];

        await AsyncStorage.setItem('@savingDataMoney', JSON.stringify(updatedMoneyData));
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <View>  
            <Text>Create new save money</Text>
            <View>
                <CustomInput
                    placeholder="Your label..."
                    type="text"
                    onChange={(value) => setNewSave({...newSave, label: value})}
                />
                <CustomInput
                    placeholder="Your limit..."
                    type="text"
                    onChange={(value) => setNewSave({...newSave, limit: value})}
                    maxLength={8}
                />
            </View>
            <View>
            <CustomButton
                label="Add" 
                action={() => {
                    addSaveMoney();
                    navigation.replace('SavingsMoney');
                }}
                enable
            />
            </View>
        </View>
    )
};

const styled = StyleSheet.create({

});


export default AddSaveMoney;