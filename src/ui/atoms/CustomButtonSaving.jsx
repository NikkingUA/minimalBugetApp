import React from 'react';
import { TouchableOpacity, Text } from 'react-native';


const CustomButtonSaving = ({
    label,
    width,
    height, 
    backgroundColor, 
    disabled, 
    onClick
}) => {
    return (
        <TouchableOpacity
            onPress={onClick}
            disabled={disabled}
            style={{
                backgroundColor: backgroundColor,
                width: width,
                height: height,
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Text style={{  color: 'white', fontWeight: '600'}}>{label}</Text>
        </TouchableOpacity>
    )
};


export default CustomButtonSaving;