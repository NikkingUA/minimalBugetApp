import React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { CustomIcon } from '../atoms';


const NotificationMenu = (props) => {
    return (
        <View style={styled.barContainer}>
            {/* <CustomIcon
                type="notifications-circle-outline"
                color="black"
                size={35}
                onAction={() => Alert.alert('Notification')}
            /> */}
        </View>
    );
}

export default NotificationMenu;


const styled = StyleSheet.create({
    barContainer: {
        paddingTop: 5,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10,
        marginTop: 30
    }
})