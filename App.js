import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Keyboard } from 'react-native';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translation/en.json';
import it from './translation/it.json';
import ru from './translation/ru.json';
import ua from './translation/ua.json';
import fr from './translation/fr.json';
import sp from './translation/sp.json';

import {
  Wallet,
  SavingsMoney,
  Statistic,
  Profile,
  AddIncome,
  AddExpense,
  AddSaveMoney,
  InfoSavingsMoney
} from './src/screen';

import BottomMenu from './src/ui/components/BottomMenu';
import { NotificationMenu } from './src/ui/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();


export default function App() {

  const [keyboardVisible, setKeyboardVisible] = useState(true);
  const [lang, setLang] = useState('en');

  const getLang = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@language');
      return jsonValue != null && setLang(jsonValue);
    } catch (e) {
      console.log('Get data wallet error: ', e);
    }
  };

  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      it: { translation: it },
      fr: { translation: fr },
      sp: { translation: sp },
      ru: { translation: ru },
      ua: { translation: ua }
    },
    compatibilityJSON: 'v3',
    lng: lang,
    fallbackLng: lang,
    interpolation: {
      escapeValue: false,
    },
  });

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    }
  };

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

  useEffect(() => {
    getLang();
  }, [lang, getLang]);


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
        <Stack.Screen
          name="AddSaveMoney"
          component={AddSaveMoney}
        />
        <Stack.Screen
          name="InfoSavingsMoney"
          component={InfoSavingsMoney}
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
