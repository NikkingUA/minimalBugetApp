import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { CustomIcon, CustomInput } from '../ui/atoms';

import SelectDropdown from 'react-native-select-dropdown';
import { colors } from '../theme/color/color';
import { colorOfApp, language, valute } from '../utils/const';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ios-rocket-sharp

const Profile = (props) => {

    const [name, setName] = useState('Mykyta Postoienko');


    const handleChangeLanguage = async (lang) => {
        console.log(lang)
        await AsyncStorage.setItem('@language', lang);
    };

    return (
        <View style={styled.iconContainer}>
            <View>
                {/* <Text style={styled.titleSetting}>Name</Text> */}
                <View style={styled.infoContainer}>
                    <Text style={styled.titleName}>{name}</Text>
                </View>
                <View >
                    <Text style={styled.titleSetting}>Settings</Text>
                </View>
                <View style={styled.selectionContainer}>
                    <Text style={styled.titleSelection}>Curency:</Text>
                    <SelectDropdown
                        buttonStyle={styled.input}
                        rowTextStyle={styled.dropDown}
                        selectedRowStyle={styled.dropDown}
                        defaultButtonText={`Curency $`}
                        buttonTextStyle={styled.buttonTextDropDown}
                        dropdownStyle={styled.dropDownContainer}
                        data={valute}
                        renderDropdownIcon={isOpened => {
                            return <CustomIcon
                                type={isOpened ? 'chevron-up' : 'chevron-down'}
                                size={25}
                                color="black"
                            />
                        }}
                        onSelect={(selectedItem, index) => handleChangeLanguage(selectedItem)
                        }
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                </View>
                <View style={styled.selectionContainer}>
                    <Text style={styled.titleSelection}>Language:</Text>
                    <SelectDropdown
                        buttonStyle={styled.input}
                        rowTextStyle={styled.dropDown}
                        selectedRowStyle={styled.dropDown}
                        defaultButtonText={`Language IT`}
                        buttonTextStyle={styled.buttonTextDropDown}
                        dropdownStyle={styled.dropDownContainer}
                        data={language}
                        renderDropdownIcon={isOpened => {
                            return <CustomIcon
                                type={isOpened ? 'chevron-up' : 'chevron-down'}
                                size={25}
                                color="black"
                            />
                        }}
                        onSelect={(selectedItem, index) => handleChangeLanguage(selectedItem)}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                </View>
            </View>
        </View>
    )
};

const styled = StyleSheet.create({
    iconContainer: {
        justifyContent: 'center'
    },
    titleSetting: {
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 15,
        fontSize: 17,
        fontWeight: 'bold'
    },
    titleName: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: "bold",
        color: 'white',
        paddingVertical: 70,
        paddingHorizozntal: 10
    },
    infoContainer: {
        backgroundColor: colors.one.ligthBlue,
        marginHorizontal: 15,
        borderRadius: 15
    },
    dropDown: {
        textAlign: 'left'
    },
    input: {
        backgroundColor: colors.one.ligthBlueInput,
        height: 60,
        width: '90%',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
        borderRadius: 20
    },
    buttonTextDropDown: {
        fontSize: 14,
        textAling: 'left'
    },
    dropDownContainer: {
        borderRadius: 10
    },
    titleSelection: {
        marginLeft: 30,
        fontWeight: 'bold'
    }
});

export default Profile;