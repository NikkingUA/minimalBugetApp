import React from 'react';

import { View, Text, StyleSheet, TextInput } from 'react-native';
import { colors } from '../../theme/color/color';

const CustomTextArea = (props) => {
    const { 
        type,
        placeholder,
        onChange,
        backgroundColor
    } = props;
    return (
        <View style={styled.inputContainer}>
            <TextInput
                type={type}
                placeholder={placeholder}
                multiline={true}
                numberOfLines={12}
                onChangeText={(value) => onChange(value)}
                style={[styled.textArea, {backgroundColor: backgroundColor}]}
            />
        </View>
    );
}


const styled = StyleSheet.create({
    inputContainer: {

    },
    textArea: {
        backgroundColor: colors.one.ligthBlueInput,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
        borderRadius: 20,
        textAlignVertical: 'top', 
        height: 220
    }
})

export default CustomTextArea;