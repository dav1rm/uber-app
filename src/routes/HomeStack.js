import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import TesteScreen from "../screens/Teste";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Teste" component={TesteScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
