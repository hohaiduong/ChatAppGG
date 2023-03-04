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
// import Moment from 'react-moment';
const violet = '#ad40af';
const orange = '#F8D548';
const { width, height } = Dimensions.get("window")
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
        return (
            <View style={[styles.messages,
            isMe ? styles.rightContainer : styles.leftContainer
            ]}>
                <Text>{msg}</Text>
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
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={[styles.root, { height: isEmojiPickerOpen ? '60%' : 'auto' }]}
                keyboardVerticalOffset={100}>

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
                        <Icon
                            name="microphone"
                            size={24}
                            color="grey"
                            style={styles.iconMicro}
                        />
                    </View>

                    <Pressable onPress={() => { mess ? [sendMSG(), setMess("")] : console.log("Khong co van ban"); }} style={styles.buttonContainer}>
                        {mess ? (
                            <Ionicons name="send-sharp" size={18} color="#fff" />
                        ) : (
                            <AntDesign name="plus" size={24} color="#fff" />
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

const styles = StyleSheet.create({
    viewTitle: {
        flexDirection: "row",
        alignItems: "center"
    },
    imgTitle: {
        width: 40,
        height: 40,
        borderRadius: 50
    },
    TextTitle: {
        marginLeft: 10,
        fontFamily: "Arial",
        fontWeight: "700",
        color: "black",
        fontSize: 20
    },
    messages: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        maxWidth: '70%',
    },

    containerSendMess: {
        alignItems: "center",
        flexDirection: "row"
    },
    leftContainer: {
        backgroundColor: orange,
        marginLeft: 10,
        marginRight: 'auto',
    },

    rightContainer: {
        backgroundColor: violet,
        marginLeft: 'auto',
        marginRight: 10,
    },

    list: {
        height: height - 100,

    },

    root: {
        padding: 10,
        height: '60%',
    },

    row: {
        flexDirection: 'row',
    },

    inputContainer: {
        backgroundColor: '#f2f2f2',
        flex: 1,
        borderWidth: 1,
        borderColor: 'lightgrey',
        marginRight: 10,
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconEmoji: {
        marginHorizontal: 15,
    },

    input: {
        flex: 1,
    },

    iconMicro: {
        marginRight: 15,
    },

    buttonContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#ad40af',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },

    container: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        maxWidth: '70%',
    },
});

export default ChatRoom;