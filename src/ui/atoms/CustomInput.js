import React from 'react';

import { View, TextInput, StyleSheet, Text } from 'react-native';

import { colors } from '../../theme/color/color';


const CustomInput = (props) => {

    const { placeholder, type, onChange, error } = props;

    return (
        <View>
            <TextInput
                style={styled.input}
                placeholder={placeholder}
                keyboardType={type}
                onChangeText={(value) => onChange(value)}
            />
        </View>
    );
}

const styled = StyleSheet.create({
    inputContainer: {

    },
    input: {
        backgroundColor: colors.one.ligthGreen,
        height: 60,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
        borderRadius: 10
    }
})

export default CustomInput;