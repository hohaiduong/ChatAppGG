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
import { MapMarker, enableLatestRenderer, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-maps';

import ImageMessages from '../controller/ChatRoom/ImageMessages';
import GetMessages from '../controller/ChatRoom/GetMessages';

import styles from '../Styles/ChatRoomStyle';
import ListChat from '../Model/ChatRoom/ChatList';
import KeyBoardSticker from '../Model/ChatRoom/KeyBoardSticker';

const ChatRoom = ({ route }) => {

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
            })
            .catch(err => {
                const { code, message } = err;
                console.warn(code, message);
            })
    }
    const idUser = route.params.idUser;
    const idClient = route.params.idClient;
    const roomID = route.params.roomID;
    const nameClient = route.params.nameClient;
    const photoClient = route.params.photoClient;

    const [mess, setMess] = useState("");

    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    const [vis, setVis] = useState(false)
    var [showMap, setShowMap] = useState(true)
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
            // navigation.setOptions()
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
                                // getLocation().
                                // setShowMap(true)
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
                {/* {showMap && 
                <MapView
                style={{height: 50, width: 50, position: "absolute"}} 
                initialRegion={{
                    latitude:16.548209,
                    longitude: 107.456722
                }}
                ></MapView>
            } */}
            </KeyboardAvoidingView>
        </SafeAreaView>
    )

    // return (
    //     <View> 
    //         {showMap && (
    //         <MapView
    //             provider={PROVIDER_GOOGLE}
    //             style={{ height: 300, width: 400 }}
    //             showsUserLocation={true}
    //             showsTraffic={true}
    //             zoomControlEnabled={true}
    //             followsUserLocation = {true}
    //             region={{
    //                 latitude: 16.4487305,
    //                 longitude: 107.6047668,
    //                 latitudeDelta: 0.000000001,
    //                 longitudeDelta: 0.000000015,
    //             }}
    //         >
    //             <MapMarker
    //                 coordinate={{
    //                     latitude: 17.4487305,
    //                     longitude: 107.6047668
    //                 }}
    //             />
    //         </MapView>)
    //     }
    //     </View>
    // )
}


export default ChatRoom;