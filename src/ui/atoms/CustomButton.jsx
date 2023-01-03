import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

import PropTypes from 'prop-types';
import { colors } from '../../theme/color/color';



const CustomButton = ({ label, action, enable }) => {

    return (
        <TouchableOpacity
            style={enable ? styled.buttonContainer : [styled.buttonContainer, styled.disableButton]}
            onPress={enable ? action : null}
        >
            <Text style={styled.buttonLabel}>{label}</Text>
        </TouchableOpacity>
    );
}


export default CustomButton;


const styled = StyleSheet.create({
    buttonContainer: {
        backgroundColor: colors.one.ligthGreenButton,
        margin: 20,
        padding: 20,
        borderRadius: 25
    },
    buttonLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
    enableButton: {
        opacity: 1
    },
    disableButton: {
        opacity: 0.5
    }
})


CustomButton.propTypes = {
    label: PropTypes.string,
    action: PropTypes.func,
    backgroundColor: PropTypes.string
};