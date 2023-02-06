import React, {useState} from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { CustomIcon, CustomInput } from '../ui/atoms';

// ios-rocket-sharp

const Profile = (props) => {

    const [name, setName] = useState('Mykyta Postoienko');
    return (
        <View style={styled.iconContainer}>
            <View >
                {/* <View style={styled.iconProfile}>
                    <CustomIcon
                        type="ios-rocket-sharp"
                        size={130}
                        color="white"
                    />  
                </View> */}
                <Text style={styled.titleName}>{name}</Text>
                <View>
                    <Text>Currency: $</Text>
                </View>
            </View>
            <View>
                <View>
                    {/* <CustomInput
                        placeholder='Name...'
                        keyboardType='text'
                        onChange={(value) => setName(value)}
                        maxLength={20}
                    />  */}
                </View>
            </View>
        </View>
    )
};

const styled = StyleSheet.create({
    iconProfile:{
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: 'gray',
        marginTop: 80,
        width: 180 ,
        borderRadius: 100,
        padding: 20
    },
    iconContainer: {
        justifyContent: 'center'
    },
    titleName:{
        textAlign: 'center',
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 10
    }
});

export default Profile;