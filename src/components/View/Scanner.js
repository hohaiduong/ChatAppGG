import QRCodeScanner from "react-native-qrcode-scanner"
import database from '@react-native-firebase/database';
import { Alert } from 'react-native'
const Scanner = ({ route }) => {
    const { id, nameUser, email, photoUser } = route.params;

    const friendsRequest = (data) => {
        let myData = {
            id: id,
            photo: photoUser,
            name: nameUser,
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
            showMarker={true}
            reactivate={true}
            reactivateTimeout={5000}
            onRead={({ data }) => {
                friendsRequest(data)
                console.log(data);
            }}
        />
    )
}

export default Scanner;