import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';

import { colors } from '../../theme/color/color';

import { CustomIcon } from '../atoms';


const IconMenu = (props) => {

    const navigation = useNavigation();
    return (
        <View style={styled.centralContainerIcon}>
            <View style={styled.iconContainer}>
                <CustomIcon
                    type={'add-circle-outline'}
                    size={35}
                    color="green"
                    onAction={() => navigation.navigate('AddIncome')}
                />
            </View>
            <View style={styled.iconContainer}>
                <CustomIcon
                    type={'remove-circle-outline'}
                    size={35}
                    color="red"
                    onAction={() => navigation.navigate('AddExpense')}
                />
            </View>
            <View style={styled.iconContainer}>
                <CustomIcon
                    type={'reload-outline'}
                    size={35}
                    color="blue"
                />
            </View>
            <View style={styled.iconContainer}>
                <CustomIcon
                    type={'snow'}
                    size={35}
                    color="white"
                />
            </View>
        </View>
    );
};

const styled = StyleSheet.create({
    iconContainer: {
        backgroundColor: colors.one.ligthGreen,
        padding: 10,
        borderRadius: 10
    },
    centralContainerIcon: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
})


export default IconMenu;