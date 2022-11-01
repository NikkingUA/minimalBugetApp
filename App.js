import { StyleSheet, Text, View, Dimensions } from 'react-native';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  Wallet,
  SavingsMoney,
  Statistic,
  Profile,
  AddIncome
} from './src/screen';
import BottomMenu from './src/ui/components/BottomMenu';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  }
};

export default function App() {


  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouterName="Wallet"
        screenOptions={{
          // headerShown: false,
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
      </Stack.Navigator>
      <BottomMenu />
    </NavigationContainer>
  );
}

const styled = StyleSheet.create({
  header: {
    height: 20
  }
}); 
