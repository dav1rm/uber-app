import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import HomeDrawer from "./HomeDrawer";
import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
      <Stack.Navigator screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#fff'
        }
      }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="HomeDrawer" component={HomeDrawer} />
      </Stack.Navigator>
  );
};

export default AuthStack;
