import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { colors } from '../../theme/color/color';
import CustomIcon from '../atoms/CustomIcon';



const BottomMenu = (props) => {

    const navigation = useNavigation();

    return (
        <View style={styled.menuContainer}>
            <View style={styled.menu}>
                <View style={styled.buttonMenu}>
                    <TouchableOpacity
                        title="Wallet"
                    >
                        {/* <Text>Wallet</Text> */}
                        <CustomIcon
                            type="wallet"
                            size={35}
                            color={'black'}
                            onAction={() => navigation.navigate('Wallet')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styled.buttonMenu}>
                    <TouchableOpacity
                        title="Note"
                    >
                        <CustomIcon
                            type="bookmark"
                            size={35}
                            color={'black'}
                            onAction={() => navigation.navigate('SavingsMoney')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styled.buttonMenu}>
                    <TouchableOpacity
                        title="Statistic"
                    >
                        <CustomIcon
                            type="bar-chart"
                            size={35}
                            color={'black'}
                            onAction={() => navigation.navigate('Statistic')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styled.buttonMenu}>
                    <TouchableOpacity
                        title="Profile"
                    >
                        <CustomIcon
                            type="person-sharp"
                            size={35}
                            color={'black'}
                            onAction={() => navigation.navigate('Profile')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

const styled = StyleSheet.create({
    menu: {
        backgroundColor: colors.one.ligthBlueOne,
        margin: 15,
        height: 70,
        borderRadius: 17,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    buttonMenu: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default BottomMenu;