import React from 'react';

import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';

import { colors } from '../../theme/color/color';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
        color: 'red'
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
        color: 'green'
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
        color: 'green'
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
        color: 'green'
    }
];

const Item = ({ title }) => (
    <View style={styled.itemList}>
        <Text >{title}</Text>
    </View>
);

const renderItem = ({ item }) => (
    <Item title={item.title} />
);


const SpendList = ({
    dataMoney
}) => {
    return (
        <View>
            <ScrollView style={styled.scrollContainer}>
                {dataMoney.length > 0 ? (
                    <FlatList
                        data={dataMoney}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                )
                    :
                    <Text style={styled.emptyListMessage}>Your list is empty...</Text>
                }
            </ScrollView>
        </View>
    );
}

const styled = StyleSheet.create({
    scrollContainer: {
        height: 350
    },
    itemList: {
        backgroundColor: colors.one.ligthGreen,
        padding: 20,
        marginVertical: 10,
        borderRadius: 10
    },
    emptyListMessage: {
        textAlign: 'center',
        marginVertical: 30
    }
})

export default SpendList;