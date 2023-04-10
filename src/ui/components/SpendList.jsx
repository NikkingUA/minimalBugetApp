import moment from 'moment';
import React from 'react';

import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ScrollView
} from 'react-native';
import { colors } from '../../theme/color/color';

const SpendList = ({
    dataMoney
}) => {
    const controlStyleOfListMoney = (data) => {
        if (data?.savingMoney) {
            return styled.savingMoney;
        } else if (data.addIncome) {
            return styled.addMoney;
        } else if (!data.addIncome) {
            return styled.spendMoney;
        }
    };

    return (
        <View>
            <View style={styled.scrollContainer}>
                {dataMoney?.length > 0 ? dataMoney?.map(data => (
                    <View style={data.addIncome ? styled.itemListAdd : styled.itemListSpend} key={data.id}>
                        <View style={styled.description}>
                            <Text style={styled.titleOfItem}>{data.title}</Text>
                            <Text style={styled.category}>Category: {data.category}</Text>
                            <Text style={styled.paymentMethod}>Payment method: {data.methodOfPayments}</Text>
                        </View>
                        <View style={styled.summary}>
                            <Text style={styled.date}>{data?.creationDate}</Text>
                            <Text style={controlStyleOfListMoney(data)}>
                                {data.addIncome ? '+' : !data.addIncome ? '-' : ''}
                                {data.spendMoney}
                                {data.valute}
                            </Text>
                        </View>
                    </View>
                ))
                    :
                    (
                        <Text style={styled.emptyListMessage}>Your list is empty...</Text>
                    )
                }
            </View>
        </View>
    );
}

const styled = StyleSheet.create({
    scrollContainer: {
    },
    description: {
        justifyContent: 'space-between'
    },
    summary: {
        alignItems: 'flex-end'
    },
    itemListAdd: {
        backgroundColor: 'white',
        padding: 13,
        marginVertical: 10,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemListSpend: {
        backgroundColor: 'white',
        padding: 13,
        marginVertical: 10,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    spendMoney: {
        fontSize: 20,
        color: 'red',
        fontWeight: 'bold',
        paddingTop: 10
    },
    titleOfItem: {
        fontWeight: 'bold',
        fontSize: 17
    },
    addMoney: {
        fontSize: 20,
        color: 'green',
        fontWeight: 'bold',
        paddingTop: 10
    },
    savingMoney: {
        fontSize: 20,
        color: colors.one.ligthBlue,
        fontWeight: 'bold',
        paddingTop: 10
    },
    date: {
        fontSize: 10,
        color: 'rgba(115, 115, 115, 1)'
    },
    emptyListMessage: {
        textAlign: 'center',
        marginVertical: 30,
        color: 'white'
    },
    category: {
        fontSize: 10,
        color: 'rgba(115, 115, 115, 1)',
        marginTop: 7,
        fontWeight: 'bold'
    },
    paymentMethod: {
        fontSize: 10,
        color: 'rgba(115, 115, 115, 1)',
        marginTop: 5,
        fontWeight: 'bold'
    }
})

export default SpendList;