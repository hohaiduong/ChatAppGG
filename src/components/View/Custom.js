import { View, Text } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
const CustomDrawer = (props) => {
  const navigation = useNavigation()  
  return (
    <DrawerContentScrollView {...props}>
        <View>
            <DrawerItemList {...props}/>
            <DrawerItem 
            label={"QR_Code"}
            onPress={() => {navigation.navigate("QR_code")}}
            />
        </View>
    </DrawerContentScrollView>
  )
}

export default CustomDrawer;