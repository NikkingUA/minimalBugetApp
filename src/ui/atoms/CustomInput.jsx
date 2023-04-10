import React from 'react';

import { View, TextInput, StyleSheet, Text, Keyboard } from 'react-native';

import { colors } from '../../theme/color/color';


const CustomInput = ({ 
    placeholder, 
    type, 
    onChange, 
    error, 
    errorEnabled,
    maxLength,
    backgroundColor = colors.one.ligthBlueInput
}) => {

    return (
        <View>
            <TextInput
                style={[styled.input, {backgroundColor: backgroundColor}]}
                placeholder={placeholder}
                keyboardType={type}
                onChangeText={(value) => onChange(value)}
                maxLength={maxLength}
            />
            {errorEnabled && <Text style={styled.errorMessageStyle}>{errorMessage}</Text>}
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
    },
    errorMessageStyle:{
        fontSize: 10,
        color: colors.one.ligthRose
    }
})

export default CustomInput;