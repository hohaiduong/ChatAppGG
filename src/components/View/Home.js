import React, { useEffect, useState } from 'react';
import {
    View, Text, Image, SafeAreaView, StyleSheet,
    Dimensions, FlatList, TouchableOpacity
} from "react-native";
import database from '@react-native-firebase/database';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get("window");
const HomeChat = ({ route }) => {
    var idUser = route.params.id;
    var photoUser = route.params.photo;
    var nameUser = route.params.name;
    // var [roomID, setRoomID] = useState("")
    const [checkUser, setCheckUser] = useState(false);
    const [dataList, setDataList] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        getChatList();
    }, [])

    const getChatList = async () => {
        database()
            .ref('/chatlist/' + idUser)
            .on('value', snapshot => {
                if (snapshot.val() != null) {
                    setCheckUser(true)
                    setDataList(Object.values(snapshot.val()))
                } else { setCheckUser(false) }
            });
    }
    const ItemList = ({ item }) => {
        const id = item.id;
        const photoClient = item.photo;
        const Name = item.name;
        const email = item.email;
        const lastMSG = item.lastMSG;
        const roomID = item.roomID;

        return (
            <SafeAreaView>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("ChatRoom", {
                        idUser: idUser,
                        idClient: id,
                        photoUser: photoUser,
                        photoClient: photoClient,
                        nameUser: nameUser,
                        nameClient: email,
                        roomID: roomID
                    })
                }}>
                    <View style={styles.container}>
                        <View>
                            <Image
                                style={{ width: 50, height: 50 }}
                                source={{ uri: photoClient }}
                            ></Image>
                        </View>
                        <View style={styles.ViewText}>
                            <Text>{Name}</Text>
                            <Text>{lastMSG}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={styles.safeView}>
            <View>
                <FlatList
                    data={dataList}
                    renderItem={ItemList}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false} />
            </View>
            <View style={styles.viewButton}>
                <TouchableOpacity
                    style={styles.addChat}
                    onPress={() => {
                        navigation.navigate("Search",
                            {
                                id: idUser,
                                nameUser: nameUser,
                                photo: photoUser
                            });
                    }}>
                    <Ionicons
                        name="add-outline"
                        size={30}
                        color="grey"
                        style={styles.iconAdd}
                    />
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    safeView: {
        backgroundColor: "#fff",
        width: width,
        height: height
    },
    iconAdd: {
        color: "#FFF"
    },
    ViewText: {
        marginLeft: 10
    },
    viewButton: {
        height: height - 250,
        justifyContent: "flex-end"
    },
    container: {
        // backgroundColor: "#000",
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10,
    },

    addChat: {
        color: "#FFF",
        width: 50,
        height: 50,
        position: "absolute",
        alignSelf: "flex-end",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        backgroundColor: "#ad40af"
    }
})

export default HomeChat;