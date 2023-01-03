import React from 'react';

import { View, TextInput, StyleSheet, Text, Keyboard } from 'react-native';

import { colors } from '../../theme/color/color';


const CustomInput = ({ placeholder, type, onChange, error, maxLength }) => {

    return (
        <View>
            <TextInput
                style={styled.input}
                placeholder={placeholder}
                keyboardType={type}
                onChangeText={(value) => onChange(value)}
                maxLength={maxLength}
            />
        </View>
    );
}

const styled = StyleSheet.create({
    inputContainer: {

    },
    input: {
        backgroundColor: colors.one.ligthBlueInput,
        height: 60,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
        borderRadius: 20
    }
})

export default CustomInput;