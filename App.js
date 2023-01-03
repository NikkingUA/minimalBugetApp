import React, { useState } from 'react';
import { StyleSheet, Text, View, Keyboard } from 'react-native';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  Wallet,
  SavingsMoney,
  Statistic,
  Profile,
  AddIncome,
  AddExpense
} from './src/screen';

import BottomMenu from './src/ui/components/BottomMenu';
import { NotificationMenu } from './src/ui/components';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  }
};

export default function App() {

  const [keyboardVisible, setKeyboardVisible] = useState(true);

  const keyboardDidShowListener = Keyboard.addListener(
    'keyboardDidShow',
    () => {
      setKeyboardVisible(false); // or some other action
    }
  );
  const keyboardDidHideListener = Keyboard.addListener(
    'keyboardDidHide',
    () => {
      setKeyboardVisible(true); // or some other action
    }
  );


  return (
    <NavigationContainer
      theme={MyTheme}
    >
      <NotificationMenu />
      <Stack.Navigator
        initialRouterName="Wallet"
        screenOptions={{
          headerShown: false,
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerStyle: styled.header,
        }}
      >
        <Stack.Screen
          name="Wallet"
          component={Wallet}
        />
        <Stack.Screen
          name="SavingsMoney"
          component={SavingsMoney}
        />
        <Stack.Screen
          name="Statistic"
          component={Statistic}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
        />
        <Stack.Screen
          name="AddIncome"
          component={AddIncome}
        />
        <Stack.Screen
          name="AddExpense"
          component={AddExpense}
        />
      </Stack.Navigator>
      {keyboardVisible && <BottomMenu />}
    </NavigationContainer>
  );
}

const styled = StyleSheet.create({
  header: {
    // height: 20,
    margin: 100
  }
}); 
