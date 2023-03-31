import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, Alert } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import QRCode from 'react-native-qrcode-svg'
import { width, height } from '../Util/Constant'
import { useNavigation } from '@react-navigation/native'
const QR_Code = ({ route }) => {
    const { id, photo } = route.params;
    return (
        <SafeAreaView style={{ alignSelf: "center", alignItems: "center", justifyContent: "center", height: height - 70 }}>
            <QRCode
                size={250}
                logo={{ uri: photo }}
                value={id}
            />
        </SafeAreaView>
    )
}

export default QR_Code;