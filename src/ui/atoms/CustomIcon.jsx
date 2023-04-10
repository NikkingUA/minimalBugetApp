import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';


const CustomIcon = (props) => {

    const { type, size, color, onAction,  zIndex = 10 } = props;

    return (
        <View style={{zIndex: zIndex}}>
            <Icon
                onPress={() => onAction && onAction()}
                name={type}
                size={size}
                color={color}
            />
        </View>
    )
};

export default CustomIcon;

const styled = StyleSheet.create({
    notificationPin: {
        backgroundColor: 'red'
    }
})