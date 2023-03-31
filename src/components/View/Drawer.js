import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeChat from './Home';
import Scanner from './Scanner';
import QR_Code from './QRCode';
import { useNavigation } from '@react-navigation/native';
import CustomDrawer from './Custom';
import Auth from '../service/Auth';
import Ionicons from 'react-native-vector-icons/Ionicons';

<<<<<<< UpdateDrawer
=======
export default function Drawer() {
    const Drawer = createDrawerNavigator();
    const navigation = useNavigation()
    var [data, setData] = useState([]);
    useEffect(() => {
        data
>>>>>>> main
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
    return (
        <Drawer.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: "#F8D548"
            },
            drawerActiveBackgroundColor: "violet"
            ,
            drawerActiveTintColor:"#F8e948",
            drawerInactiveTintColor: "black",
            drawerLabelStyle: {
                marginLeft: -25,
                fontSize: 15,
                fontFamily: "roboto",
            }
        }} drawerContent={props => <CustomDrawer {...props} />}>
            <Drawer.Screen name='HomeChat' component={HomeChat} options={{
                drawerIcon: ({color}) => (
                    <Ionicons
                        name="home-outline"
                        size={20}
                        color={color}
                    />
                )

            }} />
            <Drawer.Screen name='Quét mã QR' component={Scanner} initialParams={data} options={{
                drawerIcon: ({color}) => (
                    <Ionicons
                        name="scan-outline"
                        size={20}
                        color={color}
                    />
                )
            }} />
            <Drawer.Screen name='Mã QR' component={QR_Code} initialParams={data} options={{
                drawerIcon: ({color}) => (
                    <Ionicons
                        name="qr-code-outline"
                        size={20}
                        color={color}
                    />
                )
            }} />
        </Drawer.Navigator>
    )
}