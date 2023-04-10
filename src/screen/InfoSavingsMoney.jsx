import React, {useState, useEffect} from 'react';

import {View, Text, StyleSheet, ScrollView} from 'react-native';

import { colors } from '../theme/color/color';

import {CustomButtonSaving, CustomIcon} from '../ui/atoms';
import { ModalAddMoneySaving, SpendList } from '../ui/components';
import ModalTakeMoneySaving from '../ui/components/ModalTakeMoneySaving';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const InfoSavingsMoney = ({route}) => {

    const {
        id,
        label, 
        limit, 
        actualValue, 
        savingMoney,
        moneyData,
        percent
    } = route.params;

    const [visibleAdd, setVisibleAdd] = useState(false);
    const [visibleTake, setVisibleTake] = useState(false);
    const navigation = useNavigation();

    const filteredMoneyDataList = moneyData?.filter(item => item.savingMoney === true && item.title === label);

    const handelDeleteSavingMoney = async () => {
     try{
        const deleteItemFromList = moneyData.filter(item => item.savingMoneyTitle !== label);
        const deleteSavingMoneyItem = savingMoney.filter(item => item.id !== id);

        await AsyncStorage.setItem('@moneyData', JSON.stringify(deleteItemFromList));
        await AsyncStorage.setItem('@savingDataMoney', JSON.stringify(deleteSavingMoneyItem));

        await navigation.replace('SavingsMoney');
     }catch(error){
        console.log('Error deleting saving money info: ', error)
     }
    };

    return (
        <View>
            <View style={styled.moneyContainer}>
                <Text style={styled.labelTitle}>{label}</Text>
                {actualValue > limit && <Text style={styled.congratulationLabel}>Congratulation!!!</Text>}
                <View style={styled.actualLimitContainer}>
                    <Text style={styled.actualValueTitle}>{actualValue}$</Text>
                  
                    <View style={styled.limitContainer}>
                        <Text style={styled.limitTitle}>Limit: {limit}$</Text>
                    </View>
                </View>
                 <View style={{width: '100%', backgroundColor: colors.one.lightGray, height: 10, borderRadius: 15, marginTop: 10}}>
                         <View 
                            style={{
                                backgroundColor: colors.one.ligthGreenButton,
                                width: `${percent}%`,
                                maxWidth: '100%',
                                height: 10,
                                borderRadius: 15}}
                        />
                   </View>
            </View>
            <View style={styled.statisticContainer}>
                <View>
                   {moneyData.length > 0 ? (
                     <ScrollView style={styled.itemContainer}>
                        <SpendList dataMoney={filteredMoneyDataList} />
                    </ScrollView>
                   ) :
                   (
                   <View style={styled.emptyContainer}>
                     <Text style={styled.emptyTitle}>Your list is empty...</Text>
                   </View>
                   )
                }
                </View>
            </View>
            <View style={styled.buttonContainer}>
                <View style={parseInt(actualValue) > parseInt(limit) && {opacity: 0.5}}>
                    <CustomButtonSaving
                        label="Add"
                        width={150}
                        height={50}
                        disabled={parseInt(actualValue) > parseInt(limit) ? true : false}
                        backgroundColor={colors.one.ligthGreeMoney}
                        onClick={() => setVisibleAdd(true)}
                    />
                </View>
                <View style={parseInt(actualValue) <= 0 && {opacity: 0.5}}>
                    <CustomButtonSaving
                        label="Take"
                        width={150}
                        height={50}
                        disabled={parseInt(actualValue) <= 0 ? true : false}
                        backgroundColor={colors.one.ligthBlue}
                        onClick={() => setVisibleTake(true)}
                    />
                </View>
                <View style={styled.iconContainer}>
                    <CustomIcon
                        type="ios-trash"
                        color="white"
                        size={23}
                        onAction={handelDeleteSavingMoney}
                    />
                </View>
            </View>
                <ModalAddMoneySaving
                    visibleAdd={visibleAdd}
                    setVisibleAdd={setVisibleAdd}
                    actualValue={actualValue}
                    limit={limit}
                    label={label}
                    moneyData={moneyData}
                    savingMoney={savingMoney}
                    id={id}
                />
                <ModalTakeMoneySaving
                    visibleTake={visibleTake}
                    setVisibleTake={setVisibleTake}
                    actualValue={actualValue}
                    limit={limit}
                    label={label}
                    moneyData={moneyData}
                    savingMoney={savingMoney}
                    id={id}
                />
        </View>
    )
};

const styled = StyleSheet.create({
    moneyContainer: {
        borderRadius: 15,
        padding: 15,
        margin: 8,
        backgroundColor: colors.one.ligthBlue
    },
    itemContainer: {
        backgroundColor: colors.one.ligthBlueTrasparent,
        borderRadius: 20,
        marginHorizontal: 13,
        marginVertical: 13,
        padding: 10,
        height: 335,
        position: 'relative'
    },
    emptyContainer:{
        marginHorizontal: 10,
        marginVertical: 30,
        padding: 30,
        backgroundColor: colors.one.ligthBlueOne,
        borderRadius: 20
    },
    emptyTitle: {
        textAlign: 'center',
        fontSize: 17,
        color: colors.one.ligthWhite
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    iconContainer:{
        backgroundColor: colors.one.ligthRose,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15

    },
    actualLimitContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    limitContainer:{
        justifyContent: 'flex-end'
    },
    labelTitle:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
        marginVertical: 5
    },
    actualValueTitle:{
        color: 'white',
        fontSize: 50,
        fontWeight: 'bold'
    },
    limitTitle:{
        color: 'black',
        fontSize: 15,
        fontWeight: '600',
        color: 'white'
    },
    congratulationLabel:{
        color: colors.one.ligthGreeMoney,
        fontWeight: 'bold',
        fontSize: 15,
        position: 'absolute',
        top: 27,
        right: 20
    }
});

export default InfoSavingsMoney;