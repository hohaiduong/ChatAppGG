import React from 'react'
import { Text, View, SafeAreaView } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { width, height } from '../Util/Constant'
import { useNavigation } from '@react-navigation/native'
const QR_Code = ({route}) => {
    const {photoUser, nameUser, email} = route.params;
    return (
        <SafeAreaView style={{alignSelf: "center", alignItems: "center", justifyContent: "center", height: height - 70}}>
            <QRCode
            size={250}
            logo={{uri: photoUser}}
            value={[nameUser + "\n", email]}
            />
        </SafeAreaView>
    )
}

export default QR_Code;