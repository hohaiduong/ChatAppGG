import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScreenLogin from '../View/loginScreen.js';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {

    return(
        <Stack.Navigator>
            <Stack.Screen name='Login' component={ScreenLogin}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default StackNavigation;

