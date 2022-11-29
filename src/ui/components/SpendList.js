import moment from 'moment';
import React, { useEffect } from 'react';

import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';

import { colors } from '../../theme/color/color';

const Item = ({ data }) => (
    <View style={data.addIncome ? styled.itemListAdd : styled.itemListSpend}>
        <View style={styled.description}>
            <Text style={styled.titleOfItem}>{data.title}</Text>
            <Text style={styled.category}>Categori: {data.category}</Text>
            <Text style={styled.paymentMethod}>Payment method: {data.methodOfPayments}</Text>
        </View>
        <View style={styled.summary}>
            <Text style={styled.date}>{data?.creationDate}</Text>
            <Text style={data.addIncome ? styled.addMoney : styled.spendMoney}>
                {data.addIncome ? '+' : '-'}
                {data.spendMoney}
                {data.valute}
            </Text>
        </View>
    </View>
);

const renderItem = ({ item }) => (
    <Item data={item} />
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
    description: {
        justifyContent: 'space-between'
    },
    summary: {
        alignItems: 'flex-end'
    },
    itemListAdd: {
        backgroundColor: colors.one.ligthGreen,
        padding: 13,
        marginVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemListSpend: {
        backgroundColor: colors.one.ligthRose,
        padding: 13,
        marginVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    spendMoney: {
        fontSize: 20,
        color: 'red',
        paddingTop: 10
    },
    titleOfItem: {
        fontWeight: 'bold',
        fontSize: 17
    },
    addMoney: {
        fontSize: 20,
        color: 'green',
        paddingTop: 10
    },
    date: {
        fontSize: 10,
        color: 'gray'
    },
    emptyListMessage: {
        textAlign: 'center',
        marginVertical: 30
    },
    category: {
        fontSize: 10,
        color: 'gray'
    },
    paymentMethod: {
        fontSize: 10,
        color: 'gray',
        marginTop: 5
    }
})

export default SpendList;