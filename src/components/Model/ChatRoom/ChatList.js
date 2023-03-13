import React, { useState, useEffect } from 'react';
import {
    Text, View, Image, FlatList
} from 'react-native';
import AnimatedStickerView from 'react-native-animated-stickers-chz/AnimatedStickerView';

import database from '@react-native-firebase/database';
import styles from '../../Styles/ChatRoomStyle';

const ListChat = ({roomID, idUser}) => {
    const [allChat, setAllChat] = useState([]);
   
    useEffect(() => {
        const onChildAdd = database()
            .ref('/messages/' + roomID)
            .on('child_added', snapshot => {
                setAllChat((state) => [snapshot.val(), ...state])
            });

        // Stop listening for updates when no longer required
        return () => database().ref('/messages/' + roomID).off('child_added', onChildAdd);
    }, []);
    
    const ItemChat = ({ item }) => {
        var messTo = item.to;
        const isMe = messTo != idUser;
        const msg = item.msg;
        const msgType = item.msgType;
        const base64 = 'data:image/png;base64,' + msg;
        return (
            <View>
                {msgType == "text" ?
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
                        (<View style={[
                            isMe ? styles.imgRightContainer : styles.imgLeftContainer
                        ]}>
                            <AnimatedStickerView
                                stickerHeight={50}
                                stickerWidth={50}
                                source={msg}
                            />
                        </View>))
                }
            </View>
        )
    }

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