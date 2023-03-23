import React, { useEffect, useState } from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { View, Text, Image, Dimensions } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenLogin from '../View/loginScreen';
import HomeChat from '../View/Home';
import AddChat from '../View/AddChat';
import ChatRoom from '../View/ChatRoom';
import QR_Code from '../View/QRCode';
import Auth from '../service/Auth';

const Stack = createNativeStackNavigator();

const LoginStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                height: 150,
                backgroundColor: "#F8D548"
            }
        }}>
            <Stack.Screen name='Login' component={ScreenLogin} />
            <Stack.Screen name='Home' component={HomeChat} />
            <Stack.Screen name='Search' component={AddChat}></Stack.Screen>
            <Stack.Screen name='ChatRoom' component={ChatRoom}></Stack.Screen>
            <Stack.Screen name='QR_Code' component={QR_Code}></Stack.Screen>
            
        </Stack.Navigator>
    )
}


const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                height: 150,
                backgroundColor: "#F8D548"
            }
        }}>
            <Stack.Screen name='Home' component={HomeChat} />
            <Stack.Screen name='Login' component={ScreenLogin} />
            <Stack.Screen name='Search' component={AddChat}></Stack.Screen>
            <Stack.Screen name='ChatRoom' component={ChatRoom}></Stack.Screen>
            <Stack.Screen name='QR_Code' component={QR_Code}></Stack.Screen>
        </Stack.Navigator>
    )
}
const StackNavigation = () => {
    const [Login, setLogin] = useState(true)
    useEffect(() => {
        getLogin()
    }, [Login])


    const getLogin = async () => {
        let login = await Auth.getAccount();
        if (login != null) {
            await Auth.setAccount(login)
            setLogin(false)
        } else {
            setLogin(true)
        }
    }

    return (
        <Stack.Navigator>
            {Login ?
                <Stack.Screen name="LoginStack" component={LoginStack} options={{ headerShown: false }} /> :
                <Stack.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }} />
            }
        </Stack.Navigator>
    )
}

export default StackNavigation;

