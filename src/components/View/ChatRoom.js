import React, { useState, useEffect, useRef } from 'react';
import {
    Button,
    Text, View, TextInput, Pressable, FlatList, SafeAreaView, Keyboard,
    StyleSheet, Image, Alert, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Platform
} from 'react-native';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EmojiSelector from 'react-native-emoji-selector';
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AnimatedStickerChz from 'react-native-animated-stickers-chz';
import AnimatedStickerKeyboard from 'react-native-animated-stickers-chz/AnimatedKeyBoard';
import AnimatedStickerView from 'react-native-animated-stickers-chz/AnimatedStickerView';


import styles from '../Styles/ChatRoomStyle';


const ChatRoom = ({ route }) => {

    const StickerInit = {
        app_name: 'ChatApp', //--> Your app name that can tag on copyright text and many more place.... //--> false if your are not using custom sticker
    }

    AnimatedStickerChz.InitialApp(StickerInit)
    const [location, setLocation] = useState([])

    const idUser = route.params.idUser;
    const idClient = route.params.idClient;
    const roomID = route.params.roomID;
    const nameClient = route.params.nameClient;
    const photoClient = route.params.photoClient;
    const [mess, setMess] = useState("");
    const [allChat, setAllChat] = useState([]);

    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    const [vis, setVis] = useState(false)
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

                    (msgType == "image" ?
                        <View style={[
                            isMe ? styles.imgRightContainer : styles.imgLeftContainer
                        ]}>
                            <Image source={{ uri: base64 }} style={styles.imgMessages}></Image>

                        </View> :
                        <View style={[
                            isMe ? styles.imgRightContainer : styles.imgLeftContainer
                        ]}>
                            <AnimatedStickerView
                                stickerHeight={50}
                                stickerWidth={50}
                                source={msg}
                            />
                        </View>)
                }
            </View>
        )
    }


    const handleBackButtonClick = async () => {
        if (vis) {
            setVis(false)
        } else {
            BackHandler.exitApp()
            //Other think when backPress on invisible keyboard
            return true
        }
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

    const postMess = (msg, msgType, lastMSG) => {
        let msgData = {
            roomID: roomID,
            msg: msg,
            from: idUser,
            to: idClient,
            msgType: msgType
            // sendTime: moment().fomart()
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

    const sendMSG = () => {
        if (mess !== "") {
            postMess(mess, "text", mess)
        } else {
            Alert.alert("Error")
        }
    }

    const openCamera = () => {
        var images = "";
            const options = {
            storageOptions: {
                path: 'images',
                mediaType: 'photo',
                saveToPhotos: true,
                quality: 1
            },
            includeBase64: true,
        };
        launchCamera(options, response => {
            images = response;
            const msgType = "image"
            const lastMSG = "Đã gửi một ảnh";
            postMess(images.assets[0].base64, msgType, lastMSG)
        })
        
    }

    const openImageLib = async () => {
        const options = {
            selectionLimit: 1,
            mediaType: 'photo',
            quality: 1,
            includeBase64: true,
        };
        const images = await launchImageLibrary(options);
        const msgType = "image"
        const lastMSG = "Đã gửi một ảnh";
        postMess(images.assets[0].base64, msgType, lastMSG)
       
    }
    const sendSticker = (data) => {
        const msg = data;
        const msgType = "sticker"
        const lastMSG = "Đã gửi một nhãn dán";
        postMess(msg, msgType, lastMSG)
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
                                color="black"
                                style={styles.iconEmoji}
                            />
                        </Pressable>

                        <Pressable
                            onPress={() => [
                                setVis(!vis),
                                Keyboard.dismiss(),
                            ]}>
                            <Ionicons
                                name="bulb-outline"
                                size={24}
                                color="black"
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
                                color="black"
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
                <AnimatedStickerKeyboard
                    textButtonColor={'#000'}
                    infoText={false}
                    visibility={vis}
                    onSend={(uri) => { [sendSticker(uri), setVis(!vis)] }}
                    keyBoardStyle={{ backgroundColor: '#FFDEAD' }}
                    menuButtonStyle={{ backgroundColor: '#00000010' }}
                    onBackPress={() => { handleBackButtonClick() }}
                    textColor={'black'}
                    hideDes={true}
                    hideFooter={true}
                    placeHolderColor={'#00000010'}
                />

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}


export default ChatRoom;