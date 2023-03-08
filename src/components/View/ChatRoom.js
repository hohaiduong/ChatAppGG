import React, { useState, useEffect } from 'react';
import {
    Text, View, TextInput, Pressable, FlatList, SafeAreaView, Keyboard,
    StyleSheet, Image, Alert, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Platform
} from 'react-native';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EmojiSelector from 'react-native-emoji-selector';
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import styles from '../Styles/ChatRoomStyle';


const ChatRoom = ({ route }) => {
    const idUser = route.params.idUser;
    const idClient = route.params.idClient;
    const roomID = route.params.roomID;
    const nameClient = route.params.nameClient;
    const photoClient = route.params.photoClient;
    const [mess, setMess] = useState("");
    const [allChat, setAllChat] = useState([]);
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

    const navigation = useNavigation();

    navigation.setOptions(
        {
            headerTitle: () => (
                <View style={styles.viewTitle}>
                    <Image style={styles.imgTitle} source={{ uri: photoClient }} />
                    <Text style={styles.TextTitle}>{nameClient}</Text>
                </View>
            )
        }
    )
    // navigation.setOptions()

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

                    <View style={[
                        isMe ? styles.imgRightContainer : styles.imgLeftContainer
                    ]}>
                        <Image source={{ uri: base64 }} style={styles.imgMessages}></Image>

                    </View>
                }
            </View>
        )
    }

    useEffect(() => {
        const onChildAdd = database()
            .ref('/messages/' + roomID)
            .on('child_added', snapshot => {
                setAllChat((state) => [snapshot.val(), ...state])
            });

        // Stop listening for updates when no longer required
        return () => database().ref('/messages/' + roomID).off('child_added', onChildAdd);
    }, []);

    const sendMSG = () => {
        if (mess !== "") {
            let msgData = {
                roomID: roomID,
                msg: mess,
                from: idUser,
                to: idClient,
                msgType: "text"
                // sendTime: moment().fomart()
            }
            const newReference = database().ref('/messages/' + roomID).push();

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

                    database()
                        .ref('/chatlist/' + idUser + "/" + idClient)
                        .update(chatListUpdate)
                });
        } else {
            Alert.alert("Error")
        }
    }

    const openCamera = () => {
        const options = {
            storageOptions: {
              path: 'images',
              mediaType: 'photo',
            },
            includeBase64: true,
          };
          launchCamera(options, response => {
            console.log('response', response);
          });
    }

    const openImageLib = async () => {
        const options = {
            selectionLimit: 1,
            mediaType: 'photo',
            quality: 1,
            includeBase64: true,
        };
        const images = await launchImageLibrary(options);
        let msgData = {
            roomID: roomID,
            msg: images.assets[0].base64,
            from: idUser,
            to: idClient,
            msgType: "image"
            // sendTime: moment().fomart()
        }
        const newReference = database().ref('/messages/' + roomID).push();

        msgData.id = newReference.key;

        newReference
            .set(msgData)
            .then(() => {
                let chatListUpdate = {
                    lastMSG: "Đã gửi một hình ảnh"
                }
                database()
                    .ref('/chatlist/' + idClient + "/" + idUser)
                    .update(chatListUpdate)

                database()
                    .ref('/chatlist/' + idUser + "/" + idClient)
                    .update(chatListUpdate)
            });
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFDEAD" }}>
            <View style={[styles.list, { flex: 1 }]}>
                <FlatList
                    data={allChat}
                    keyExtractor={(item, index) => index}
                    renderItem={ItemChat}
                    scrollEnabled={true}
                    inverted
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <KeyboardAvoidingView
                style={[styles.root, { height: isEmojiPickerOpen ? '60%' : 'auto' }]}
                keyboardVerticalOffset={50}>

                <View style={styles.row}>
                    <View style={styles.inputContainer}>
                        <Pressable
                            onPress={() => [
                                setIsEmojiPickerOpen(currentValue => !currentValue),
                                Keyboard.dismiss(),
                            ]}>
                            <Icon
                                name="emotsmile"
                                size={24}
                                color="grey"
                                style={styles.iconEmoji}
                            />
                        </Pressable>

                        <TextInput
                            keyboardAppearance='default'
                            keyboardType='default'
                            style={styles.input}
                            value={mess}
                            onChangeText={setMess}
                            placeholder="Type your message..."
                        />
                        <Pressable onPress={() => openImageLib()}>
                            <Ionicons
                                name="image-outline"
                                size={24}
                                color="grey"
                                style={styles.iconMicro}
                            />
                        </Pressable>
                    </View>

                    <Pressable onPress={() => { mess ? [sendMSG(), setMess(""), setIsEmojiPickerOpen(false), Keyboard.dismiss()] : openCamera() }} style={styles.buttonContainer}>
                        {mess ? (
                            <Ionicons name="send-sharp" size={18} color="#fff" />
                        ) : (
                            <Ionicons name="camera-outline" size={24} color="#fff" />
                        )}
                    </Pressable>
                </View>

                {isEmojiPickerOpen && (
                    <EmojiSelector
                        onEmojiSelected={emoji =>
                            setMess(currentMessage => currentMessage + emoji)
                        }
                        columns={8}
                        showSearchBar={false}
                    />
                )}

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}


export default ChatRoom;