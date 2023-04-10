import moment from 'moment';
import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { colors } from '../../theme/color/color';
import CustomIcon from './CustomIcon';

const DateRangePicker = ({
  showDatePiker,
  setShowDatePiker,
  setSelectedDate,
  applyDateFilters
}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({});

  const onSubmitDate = () => {
      setSelectedDate({
          startDate,
          endDate
          });
      setShowDatePiker(false);
      applyDateFilters(startDate, endDate);
  }

  const handleDayPress = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date.dateString);
      setEndDate(null);
      setMarkedDates({ [date.dateString]: { startingDay: true, color: 'blue' } });
    } else {
      let newMarkedDates = { ...markedDates };
      const range = {
        [startDate]: { startingDay: true, color: 'blue' },
        [date.dateString]: { endingDay: true, color: 'blue' },
      };
      newMarkedDates = { ...newMarkedDates, ...range };
      setEndDate(date.dateString);
      setMarkedDates(newMarkedDates);
    }
  };

  const markRange = (startDate, endDate) => {
  const range = {};
  let currentDate = moment(startDate);
  const stopDate = moment(endDate);
  while (currentDate <= stopDate) {
    const dateString = currentDate.format('YYYY-MM-DD');
    
    if(Object.keys(range).indexOf(startDate) === -1){
        range[dateString] = {startingDay: true, color: colors.one.ligthBlue, textColor: 'white'};
    }
    else if(dateString === stopDate.format('YYYY-MM-DD')){
        range[dateString] = {endingDay: true, color:colors.one.ligthBlue, textColor: 'white'};
    }
    else{
         range[dateString] = {marked: true, color: colors.one.ligthBlue, textColor: 'white' };
    }
    currentDate = currentDate.add(1, 'day');
  }
  return range;
};

  return (
        <Modal 
        animationType="fade2"
        // transparent={true}
        visible={showDatePiker}
        onRequestClose={() => {
          setShowDatePiker(!showDatePiker);
        }}
    >
      <View style={styled.iconContainer}>
        <CustomIcon
          type="close"
          size={40}
          color="black"
          onAction={() => setShowDatePiker(false)}
        />
      </View>
      <View>
      <Calendar
        markingType="period"
        markedDates={markRange(startDate, endDate)}
        onDayPress={handleDayPress}
        style={{
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        margin: 20
  }}
      />
      <View style={styled.buttonContainer}>
        {/* <Button title="Reset" onPress={() => setMarkedDates({})} />
        <Button title="Submit" onPress={() => onSubmitDate()} /> */}
        <TouchableOpacity 
          style={styled.buttonClearAll}
          onPress={() => setMarkedDates({})}
        >
          <Text style={styled.buttonLabel}>Clear all</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styled.buttonDone}
          onPress={() => onSubmitDate()}
        >
          <Text style={styled.buttonLabel}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
    </Modal>
  );
};


const styled = StyleSheet.create({
  iconContainer: {
    alignItems: 'flex-end',
    marginTop:20,
    marginRight: 20,
    marginBottom: -15
  },
  buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginRight: 20
  },
  buttonClearAll: {
    backgroundColor: colors.one.ligthRoseStatistic,
    borderRadius: 10,
    padding: 10,
    marginRight: 20
  },
  buttonDone: {
    backgroundColor: colors.one.ligthGreenButton,
    borderRadius: 10,
    padding: 10
  },
  buttonLabel: {
    color: colors.one.ligthWhiteText,
    fontWeight: 'bold'
  }
})

export default DateRangePicker;