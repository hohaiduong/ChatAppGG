import QRCodeScanner from "react-native-qrcode-scanner"
import database from '@react-native-firebase/database';
import { Alert } from 'react-native'
const Scanner = ({ route }) => {
    const { id, name, email, photo } = route.params;

    const friendsRequest = (data) => {
        let myData = {
            id: id,
            photo: photo,
            name: name,
        }
        database()
            .ref('/friendsRequest/' + data + "/" + id)
            .update(myData)
            .then(() => {
                Alert.alert("Đã gửi lời mời kết bạn")
            });
    }
    return (
        <QRCodeScanner
            reactivate={true}
            reactivateTimeout={5000}
            onRead={({ data }) => {
                friendsRequest(data)
            }}
        />
    )
}

export default Scanner;