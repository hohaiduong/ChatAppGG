import { View, Text } from 'react-native'
import React, {useState, useEffect}from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeChat from './Home';
import Scanner from './Scanner';
import QR_Code from './QRCode';
import { useNavigation } from '@react-navigation/native';
import CustomDrawer from './Custom';
import Auth from '../service/Auth';
export default function Drawer({route}) {
    const Drawer = createDrawerNavigator();
    const navigation = useNavigation()
    const [data, setData] = useState([]);
    useEffect(() => {
        getUser()
    }, [data])
    const getUser = async () => {
        setData(await Auth.getAccount());
    }
    const id = data.id
    return (
        <Drawer.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: "#F8D548"
            }
        }}>
            <Drawer.Screen name='Home' component={HomeChat}/>
            <Drawer.Screen name='Scaner' component={Scanner}/>
            <Drawer.Screen name='QR_Code' component={QR_Code} initialParams={data}/>
        </Drawer.Navigator>
    )
}