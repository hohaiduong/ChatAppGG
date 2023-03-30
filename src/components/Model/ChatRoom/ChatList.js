import React, { useState, useEffect } from 'react';
import {
    Text, View, Image, FlatList, Pressable
} from 'react-native';
import AnimatedStickerView from 'react-native-animated-stickers-chz/AnimatedStickerView';

import database from '@react-native-firebase/database';
import styles from '../../Styles/ChatRoomStyle';
import TEst from '../../View/TEst';

const ListChat = ({ roomID, idUser }) => {
    var [allChat, setAllChat] = useState([]);
    useEffect(() => {
        const onChildAdd = database()
            .ref('/messages/' + roomID)
            .on('child_added', snapshot => {
                setAllChat((state) => [snapshot.val(), ...state])
            });
        // Stop listening for updates when no longer required
        return () => database().ref('/messages/' + roomID).off('child_added', onChildAdd);
    }, [roomID]);

    const ItemChat = ({ item }) => {
        var messTo = item.to;
        const isMe = messTo != idUser;
        const msg = item.msg;
        const msgType = item.msgType;
        const base64 = 'data:image/png;base64,' + msg;
        return (
            <View>
                {
                    msgType == "text" ?
                        <View style={[styles.messages,
                        isMe ? styles.rightContainer : styles.leftContainer
                        ]}>
                            <Text>{msg}</Text>
                        </View> :

                        (msgType == "image" ?
                            <View style={[
                                isMe ? styles.imgRightContainer : styles.imgLeftContainer
                            ]}>
                                <Image source={{ uri: base64 }} style={styles.imgMessages}></Image>

                            </View> :
                            (msgType == "sticker" ?
                                <View style={[
                                    isMe ? styles.imgRightContainer : styles.imgLeftContainer
                                ]}>
                                    <AnimatedStickerView
                                        stickerHeight={50}
                                        stickerWidth={50}
                                        source={msg}
                                    />
                                </View> :
                                (
                                    <View
                                        style={[
                                            isMe ? styles.imgRightContainer : styles.imgLeftContainer
                                        ]}>
                                        <View style={{
                                            flexDirection: "row", alignItems: "center",
                                            justifyContent: "center", backgroundColor: "#696969", padding: 10, borderRadius: 25, marginTop: 10
                                        }}>
                                            <View>
                                                <Image source={{ uri: "https://www.freepnglogos.com/uploads/lokasi-logo-png/lokasi-logo-ubicaci-puntero-pasador-mapa-ficos-vectoriales-9.png" }}
                                                    style={{ width: 25, height: 25, resizeMode: "contain" }}
                                                />

                                            </View>
                                            <View>
                                                <Text style={{ color: "white" }}>Đã chia sẻ vị trí</Text>
                                                <Pressable onPress={() => {
                                                    TEst.setIDMess(item.id)
                                                }}
                                                    style={{ backgroundColor: "wheat", borderRadius: 25, alignItems: "center", marginTop: 5 }}
                                                >
                                                    <Text style={{ color: "black" }}>Lấy vị trí</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </View>
                                )
                            )
                        )
                }
            </View>
        )
    }

    useEffect(() => {
        const interval = setInterval(() => {
            TEst.getIDMess()
            database()
                .ref('/messages/' + roomID + '/' + TEst.getIDMess())
                .on('value', snapshot => {
                    if(snapshot.val() != null){
                    TEst.setData(snapshot.val().msg)
                    }
                });
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <View>
            <FlatList
                data={allChat}
                keyExtractor={(item, index) => index}
                renderItem={ItemChat}
                scrollEnabled={true}
                inverted
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default ListChat;