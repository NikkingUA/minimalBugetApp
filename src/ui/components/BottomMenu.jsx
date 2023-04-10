import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { colors } from '../../theme/color/color';
import CustomIcon from '../atoms/CustomIcon';



const BottomMenu = (props) => {

    const navigation = useNavigation();
    const [active, setActive] = useState({
        iconWallet: true,
        iconNote: false,
        iconStatistics: false,
        iconAccount: false
    });

    return (
        <View style={styled.menuContainer}>
            <View style={styled.menu}>
                <View style={styled.buttonMenu}>
                    <TouchableOpacity
                        title="Wallet"
                        style={active.iconWallet && styled.activeIcon}
                    >
                        <CustomIcon
                            type="wallet-outline"
                            size={25}
                            color={'white'}
                            onAction={() => {
                                navigation.reset({
                                    index: 0,
                                    routes: [{name: 'Wallet'}]
                                });
                                setActive({
                                    iconWallet: true,
                                    iconNote: false,
                                    iconStatistics: false,
                                    iconAccount: false
                                });
                            }
                            }
                        />
                    </TouchableOpacity>
                </View>
                <View style={styled.buttonMenu}>
                    <TouchableOpacity
                        title="Note"
                        style={active.iconNote && styled.activeIcon}
                    >
                        <CustomIcon
                            type="cash-outline"
                            size={25}
                            color={'white'}
                            onAction={() => {
                                navigation.navigate('SavingsMoney');
                                setActive({
                                    iconWallet: false,
                                    iconNote: true,
                                    iconStatistics: false,
                                    iconAccount: false
                                });
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styled.buttonMenu}>
                    <TouchableOpacity
                        title="Statistic"
                        style={active.iconStatistics && styled.activeIcon}
                    >
                        <CustomIcon
                            type="bar-chart-outline"
                            size={25}
                            color={'white'}
                            onAction={() => {
                                navigation.navigate('Statistic');
                                setActive({
                                    iconWallet: false,
                                    iconNote: false,
                                    iconStatistics: true,
                                    iconAccount: false
                                });
                            }
                            }
                        />
                    </TouchableOpacity>
                </View>
                <View style={styled.buttonMenu}>
                    <TouchableOpacity
                        title="Profile"
                        style={active.iconAccount && styled.activeIcon}
                    >
                        <CustomIcon
                            type="person-outline"
                            size={25}
                            color={'white'}
                            onAction={() => {
                                navigation.navigate('Profile');
                                setActive({
                                    iconWallet: false,
                                    iconNote: false,
                                    iconStatistics: false,
                                    iconAccount: true
                                });
                            }
                            }
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

const styled = StyleSheet.create({
    menuContainer: {
        backgroundColor: 'transparent'
    },
    menu: {
        backgroundColor: colors.one.ligthBlue,
        margin: 20,
        height: 70,
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    buttonMenu: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    activeIcon: {
        backgroundColor: colors.one.ligthTransparentIcon,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50
    }
})


export default BottomMenu;