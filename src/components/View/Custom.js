
import { View, Text, Image, SafeAreaView, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import Auth from '../service/Auth'
const CustomDrawer = (props) => {
  const navigation = useNavigation()  
  var [data, setData] = useState([]);
    useEffect(() => {
        data
        getUser()
    }, [data])
    const getUser = async () => {
        setData(await Auth.getAccount());
    }
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: "#ad40af" }}>
        <View style={{ padding: 10 }}>
          <Image source={{ uri: data.photo }} style={{ height: 80, width: 80, borderRadius: 50 }} />
          <Text style={{ fontFamily: "Roboto", color: "white", marginTop: 10 }}>
            {data.name}
          </Text>
        </View>
        <View style={{ backgroundColor: "white" }}>
          <DrawerItemList {...props} />

        </View>
      </DrawerContentScrollView>
      <SafeAreaView>
        <Text>
          123
        </Text>
      </SafeAreaView>
    </View>
  )
}

export default CustomDrawer;