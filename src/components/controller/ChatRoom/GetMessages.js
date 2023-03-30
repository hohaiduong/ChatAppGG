import database from '@react-native-firebase/database';
import TEst from '../../View/TEst';

const getMess = (roomID, msg, idUser, idClient, msgType, lastMSG) => {
    if (msgType == "map") {
        let msgData = {
            roomID: roomID,
            msg: msg,
            from: idUser,
            to: idClient,
            msgType: msgType
        }
        const newReference = database().ref('/messages/' + roomID).push();

        msgData.id = newReference.key;
        TEst.setIDMess(msgData.id)
        newReference
            .set(msgData)
            .then(() => {
                let chatListUpdate = {
                    lastMSG: lastMSG
                }
                database()
                    .ref('/chatlist/' + idClient + "/" + idUser)
                    .update(chatListUpdate)

                database()
                    .ref('/chatlist/' + idUser + "/" + idClient)
                    .update(chatListUpdate)
            });
    } else {
        let msgData = {
            roomID: roomID,
            msg: msg,
            from: idUser,
            to: idClient,
            msgType: msgType
        }
        const newReference = database().ref('/messages/' + roomID).push();

        msgData.id = newReference.key;
        newReference
            .set(msgData)
            .then(() => {
                let chatListUpdate = {
                    lastMSG: lastMSG
                }
                database()
                    .ref('/chatlist/' + idClient + "/" + idUser)
                    .update(chatListUpdate)

                database()
                    .ref('/chatlist/' + idUser + "/" + idClient)
                    .update(chatListUpdate)
            });
    }
}

export default { getMess }