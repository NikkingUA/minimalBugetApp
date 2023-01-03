import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';


const CustomIcon = (props) => {

    const { type, size, color, onAction } = props;

    return (
        <View>
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