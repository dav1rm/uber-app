import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/Home";

const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;
