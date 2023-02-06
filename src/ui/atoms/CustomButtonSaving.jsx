import React from 'react';
import { TouchableOpacity, Text } from 'react-native';


const CustomButtonSaving = ({label, width, height, backgroundColor, onClick}) => {
    return (
        <TouchableOpacity
            onPress={onClick}
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