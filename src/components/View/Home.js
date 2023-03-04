import React, { useEffect, useState } from 'react';
import {
    View, Text, Image, SafeAreaView, StyleSheet,
    Dimensions, FlatList, TouchableOpacity
} from "react-native";
import database from '@react-native-firebase/database';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Auth from '../service/Auth';

const { width, height } = Dimensions.get("window");
const HomeChat = ({ route }) => {
    useEffect(() => {
        getUser()
        getChatList()
    }, [data])

    const [data, setData] = useState([]);
     const getUser = async() =>{
        setData(await Auth.getAccount());
    }
    var idUser = data.id;
    console.log(idUser);
    var photoUser = data.photo;
    var nameUser = data.name;
    const [checkUser, setCheckUser] = useState(false);
    const [dataList, setDataList] = useState([]);
    const navigation = useNavigation();
    navigation.setOptions({ title: "Messages" })
    const getChatList = async () => {
        database()
            .ref('/chatlist/' + idUser)
            .on('value', snapshot => {
                if (snapshot.val() != null) {
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
                        nameClient: Name,
                        roomID: roomID
                    })
                }}>
                    <View style={styles.container}>
                        <View>
                            <Image
                                style={styles.image}
                                source={{ uri: photoClient }}
                            ></Image>
                        </View>
                        <View style={styles.ViewText}>
                            <Text style={styles.textName}>{Name}</Text>
                            <Text style={styles.textMSG} numberOfLines= {1} >{lastMSG}</Text>
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
        marginLeft: 10,
        marginRight: 68
    },
    viewButton: {
        height: height - 300,
        justifyContent: "flex-end"
    },
    container: {
        width: width - 30,
        alignSelf: "center",
        marginTop: 5,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: "#F5f5f5",
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
    },
    textName: {
        fontSize: 17,
        fontWeight: "bold",
        color: "black",
        fontFamily: "normal"
    },

    textMSG: {
        fontSize: 15,
        fontWeight: "500",
        color: "black",
        fontFamily: "normal"
    }
})

export default HomeChat;