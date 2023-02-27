import React from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScreenLogin from '../View/loginScreen';
import HomeChat from '../View/Home';
import AddChat from '../View/AddChat';
import ChatRoom from '../View/ChatRoom';
const Stack = createNativeStackNavigator();

const StackNavigation = () => {

    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Login' component={ScreenLogin}></Stack.Screen>
            <Stack.Screen name='Home' component={HomeChat}></Stack.Screen>
            <Stack.Screen name='Search' component={AddChat}></Stack.Screen>
            <Stack.Screen name='ChatRoom' component={ChatRoom}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default StackNavigation;

