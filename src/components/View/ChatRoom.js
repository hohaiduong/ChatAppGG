import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import database from '@react-native-firebase/database';

const ChatRoom = ({ route }) => {
    const idUser = route.params.idUser;
    const idClient = route.params.idClient;
    const roomID = route.params.roomID;
    const [mess, setMess] = useState("");
    const [allChat, setAllChat] = useState([]);

    const ItemChat = ({ item }) => {
        const msg = item.msg;
        return (
            <View>
                <Text>{msg}</Text>
            </View>
        )
    }

    useEffect(() => {
        const onChildAdd = database()
            .ref('/messages/' + roomID)
            .on('child_added', snapshot => {
                console.log('A new node has been added', snapshot.val());
                setAllChat((state) => [...state, snapshot.val()])
            });

        // Stop listening for updates when no longer required
        return () => database().ref('/messages/' + roomID).off('child_added', onChildAdd);
    }, [roomID]);

    const sendMSG = () => {
        if (mess !== "") {
            let msgData = {
                roomID: roomID,
                msg: mess,
                from: idUser,
                to: idClient
                // sendTime: moment().fomart()
            }
            const newReference = database().ref('/messages/' + roomID).push();

            console.log('Auto generated key: ', newReference.key);
            msgData.id = newReference.key;

            newReference
                .set(msgData)
                .then(() => {
                    let chatListUpdate = {
                        lastMSG: mess
                    }
                    database()
                        .ref('/chatlist/' + idClient + "/" + idUser)
                        .update(chatListUpdate)
                        .then(() => console.log("Success"));
                 
                    database()
                        .ref('/chatlist/' + idUser + "/" + idClient)
                        .update(chatListUpdate )
                        .then(() => console.log("Success"));
                });
        } else {
            Alert.alert("Error")
        }
    }
    return (
        <View>
          
            <View>
                <TextInput
                    placeholder='messages here'
                    value={mess}
                    onChangeText={setMess}

                />
            </View>
            <View>
                <TouchableOpacity onPress={() => sendMSG()}>
                    <Text>Send</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={allChat}
                keyExtractor={(item, index) => index}
                inverted
                renderItem={ItemChat}
            />
        </View>
    )
}

export default ChatRoom;