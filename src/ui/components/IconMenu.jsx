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
                    color="rgba(14, 181, 45, 1)"
                    onAction={() => navigation.navigate('AddIncome')}
                />
            </View>
            <View style={styled.iconContainer}>
                <CustomIcon
                    type={'remove-circle-outline'}
                    size={35}
                    color="rgba(207, 74, 74, 1)"
                    onAction={() => navigation.navigate('AddExpense')}
                />
            </View>
        </View>
    );
};

const styled = StyleSheet.create({
    iconContainer: {
        // backgroundColor: colors.one.ligthTransparentIcon,
        backgroundColor: 'white',
        padding: 10,
        justifyContent: 'center',
        borderRadius: 100,
        marginRight: 20
    },
    centralContainerIcon: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        backgroundColor: colors.one.ligthBlueTrasparent,
        marginTop: 20
    },
})


export default IconMenu;