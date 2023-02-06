import React, {useState, useEffect, useRef} from 'react';

import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';

import { colors } from '../theme/color/color';

import {CustomButtonSaving, CustomIcon} from '../ui/atoms';
import { ModalAddMoneySaving } from '../ui/components';


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

    const [visible, setVisible] = useState(false);


    return (
        <View>
            <View style={styled.moneyContainer}>
                <Text style={styled.labelTitle}>{label}</Text>
                <View style={styled.actualLimitContainer}>
                    <Text style={styled.actualValueTitle}>{actualValue}$</Text>
                  
                    <View style={styled.limitContainer}>
                        <Text style={styled.limitTitle}>Limit: {limit}$</Text>
                    </View>
                </View>
                 <View style={{width: '100%', backgroundColor: colors.one.lightGray, height: 10, borderRadius: 15, marginTop: 10}}>
                         <View 
                            style={{backgroundColor: colors.one.ligthGreenButton, width: `${percent}%`, height: 10, borderRadius: 15}}
                        />
                   </View>
            </View>
            <View style={styled.statisticContainer}>
                <View>
                    {/* <LineGraph
                        // data={transformSavingMoney}
                    /> */}

                </View>
            </View>
            <View style={styled.buttonContainer}>
                <View>
                    <CustomButtonSaving
                        label="Add"
                        width={150}
                        height={50}
                        backgroundColor={colors.one.ligthGreeMoney}
                        onClick={() => setVisible(true)}
                    />
                </View>
                <View>
                    <CustomButtonSaving
                        label="Take"
                        width={150}
                        height={50}
                        backgroundColor={colors.one.ligthBlue}
                        onClick={() => console.log('button')}
                    />
                </View>
                <View style={styled.iconContainer}>
                    <CustomIcon
                        type="ios-trash"
                        color="white"
                        size={23}
                    />
                </View>
            </View>
                <ModalAddMoneySaving
                    visible={visible}
                    setVisible={setVisible}
                    label={label}
                    moneyData={moneyData}
                />
        </View>
    )
};

const styled = StyleSheet.create({
    moneyContainer: {
        borderRadius: 15,
        padding: 15,
        margin: 15,
        backgroundColor: colors.one.ligthBlue
    },
    statisticContainer:{

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
    }
});

export default InfoSavingsMoney;