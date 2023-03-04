import React, { useEffect, useState } from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { View, Text, Image, Dimensions } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenLogin from '../View/loginScreen';
import HomeChat from '../View/Home';
import AddChat from '../View/AddChat';
import ChatRoom from '../View/ChatRoom';
import Auth from '../service/Auth';
// import { Image } from 'react-native/Libraries/Image/Image';
const Stack = createNativeStackNavigator();
const StackNavigation = () => {

    const [loginCheck, setLoginCheck] = useState(false)
    useEffect(() => {
        getLogin()
    }, [loginCheck])

    
    const getLogin = async () => {
        const login = await Auth.getAccount();
        await Auth.setAccount(login)
        if (login != null) { 
            setLoginCheck(true)
        } else {
            setLoginCheck(false)
        }
    }
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                height: 150,
                backgroundColor: "#F8D548"
            }
        }}>
            {loginCheck == false ?
                <Stack.Screen name='Login' component={ScreenLogin}/> :
                <Stack.Screen name='Home' component={HomeChat}/>
            }
            <Stack.Screen name='Search' component={AddChat}></Stack.Screen>
            <Stack.Screen name='ChatRoom' component={ChatRoom}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default StackNavigation;

