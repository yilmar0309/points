import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';
import {Props} from './InjectInterface';
import InjectHOC from './InjectHOC';
import HomeScreen from '@screens/Home/HomeScreen';
import DetailScreen from '@screens/Detail/DetailScreen';

enableScreens();
const Stack = createStackNavigator();
function StackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={InjectHOC<Props, any>(HomeScreen, {})}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailScreen"
        component={InjectHOC<Props, any>(DetailScreen, {})}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigation;
