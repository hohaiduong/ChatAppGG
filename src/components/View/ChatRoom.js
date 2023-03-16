import React, { useState, useEffect } from 'react';
import {
    Button,
    Text, View, TextInput, Pressable, FlatList, SafeAreaView, Keyboard,
    StyleSheet, Image, Alert, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Platform
} from 'react-native';
import database from '@react-native-firebase/database';

import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EmojiSelector from 'react-native-emoji-selector';

import { useNavigation } from '@react-navigation/native';
import AnimatedStickerChz from 'react-native-animated-stickers-chz';

import GetLocation from 'react-native-get-location';
import ImageMessages from '../controller/ChatRoom/ImageMessages';
import GetMessages from '../controller/ChatRoom/GetMessages';
import SendMap from '../controller/ChatRoom/SendMap';

import styles from '../Styles/ChatRoomStyle';
import ListChat from '../Model/ChatRoom/ChatList';
import KeyBoardSticker from '../Model/ChatRoom/KeyBoardSticker';
import TEst from './TEst';
import Map from '../Model/ChatRoom/Map';
import { height, width } from '../Util/Constant';

const ChatRoom = ({ route }) => {

    useEffect(() => {
        getLocation()
    }, [])
    const StickerInit = {
        app_name: 'ChatApp', //--> Your app name that can tag on copyright text and many more place.... //--> false if your are not using custom sticker
    }

    AnimatedStickerChz.InitialApp(StickerInit)

    const getLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
            .then(location => {
                console.log(location);
                setLocation(location)
            })
            .catch(err => {
                const { code, message } = err;
                console.warn(code, message);
            })
    }
    
    useEffect (() => {
        const interval = setInterval(() => {
            getLocation()
        }, 4000);
        return () => clearInterval(interval)
    })

    const idUser = route.params.idUser;
    const idClient = route.params.idClient;
    const roomID = route.params.roomID;
    const nameClient = route.params.nameClient;
    const photoClient = route.params.photoClient;

    const [mess, setMess] = useState("");

    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    const [vis, setVis] = useState(false)
    const [showMap, setShowMap] = useState(false)
    const [optionsMap, setOptionsMap] = useState(false)
    const [optionMapCancel, setOptionMapCancel] = useState(false)


    const [location, setLocation] = useState([])

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
    const sendMSG = () => {
        if (mess !== "") {
            GetMessages.getMess(roomID, mess, idUser, idClient, "text", mess)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFDEAD" }}>
            <View style={[styles.list, { flex: 1 }]}>
                <ListChat roomID={roomID} idUser={idUser} />
            </View>
            <KeyboardAvoidingView
                style={[styles.root, { height: isEmojiPickerOpen ? '60%' : 'auto' }]}
                keyboardVerticalOffset={50}>

                <View style={styles.row}>
                    <View style={styles.inputContainer}>
                        <Pressable
                            onPress={() => [
                                setIsEmojiPickerOpen(currentMessage => !currentMessage),
                                setVis(false),
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
                                setIsEmojiPickerOpen(false),
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
                            style={styles.input}
                            value={mess}
                            onChangeText={setMess}
                            placeholder="Type your message..."
                        />
                        <Pressable onPress={() => ImageMessages.openImageLib(roomID, idUser, idClient)}>
                            <Ionicons
                                name="image-outline"
                                size={24}
                                color="black"
                                style={styles.iconMicro}
                            />
                        </Pressable>
                        <Pressable onPress={() => { setOptionsMap(!optionsMap) }}>
                            <Ionicons
                                name="navigate-circle-outline"
                                size={25}
                                color="black"
                                style={styles.iconMicro}
                            />
                        </Pressable>
                    </View>

                    <Pressable onPress={() => {
                        mess ? [sendMSG(), setMess(""), setIsEmojiPickerOpen(false), Keyboard.dismiss()]
                            :
                            ImageMessages.openCamera(roomID, idUser, idClient)
                    }} style={styles.buttonContainer}>
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
                <KeyBoardSticker
                    roomID={roomID} idUser={idUser} idClient={idClient} getVis={vis} />

            </KeyboardAvoidingView>
            {showMap &&
                <Map latitude={location.latitude} longitude={location.longitude} />
            }

            {optionsMap &&
                (
                    <View style={{
                        position: "absolute",
                        padding: 10,
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        alignSelf: "flex-end",
                        marginTop: height - 205,

                    }}>
                        <Pressable onPress={() => { setShowMap(true), setOptionsMap(false), setOptionMapCancel(true) }}
                            style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            <Ionicons
                                name="navigate-circle-outline"
                                size={20}
                                color="black"
                                style={styles.iconMicro}
                            />
                            <Text style={{ color: "black" }}>Xem vị trí</Text>
                        </Pressable>
                        <Pressable onPress={() => { SendMap.sendMap(location, roomID, idUser, idClient) }}
                            style={{ flexDirection: "row", alignItems: "center" }}>
                            <Ionicons
                                name="location-outline"
                                size={20}
                                color="black"
                                style={styles.iconMicro}
                            />
                            <Text style={{ color: "black" }}>Gửi vị trí</Text>
                        </Pressable>
                    </View>
                )
            }
            {
                optionMapCancel && (
                    <Pressable onPress={() => { setShowMap(false), setOptionMapCancel(false) }}
                        style={{ position: "absolute", backgroundColor: "darkgray", borderRadius: 50, width: 20, height: 20, alignItems: "center" }}>
                        <Text style={{ color: "black", fontSize: 13 }}>X</Text>
                    </Pressable>
                )
            }
        </SafeAreaView>
    )
}


export default ChatRoom;
