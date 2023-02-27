import React, { useEffect, useState } from 'react';
import {
    View, Text, Image, SafeAreaView, StyleSheet,
    Dimensions, FlatList, TouchableOpacity
} from "react-native";
import database from '@react-native-firebase/database';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get("screen");
const HomeChat = ({ route }) => {
    var idUser = route.params.id;
    var photo = route.params.photo;
    var name = route.params.name;
    const [checkUser, setCheckUser] = useState(false);
    const [dataList, setDataList] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        getChatList();
    }, [])

    const getChatList = () => {
        database()
            .ref('/chatlist/' + idUser)
            .on('value', snapshot => {
                if (snapshot.val != null) {
                    setCheckUser(true)
                    setDataList(Object.values(snapshot.val()))
                } else { setCheckUser(false) }
            });
    }


    const ItemList = ({ item }) => {
        const id = item.id;
        const photo = item.photo;
        const Name = item.name;
        const lastMSG = item.lastMSG;
        const roomID = item.roomID;
        return (
            <SafeAreaView>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("ChatRoom", {idUser: idUser, idClient: id, roomID: roomID})
                }}>
                    <View>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={{ uri: photo }}
                        ></Image>
                    </View>
                    <View>
                        <Text>{Name}</Text>
                    </View>
                    <View>
                        <Text>{lastMSG}</Text>
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
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false} />
            </View>
            <TouchableOpacity style={styles.addChat}
                onPress={() => {
                    navigation.navigate("Search", { id: idUser, name: name, photo: photo });
                }}>
                <Ionicons
                    name="add-outline"
                    size={30}
                    color="grey"
                    style={styles.iconAdd}
                />
            </TouchableOpacity>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    safeView: {
        backgroundColor: "#fff",
        width: width,
        height: height
    },
    container: {
        // backgroundColor: "#000",
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10,
    },

    addChat: {
        width: 50,
        height: 50,
        position: "absolute",
        alignSelf: "flex-end",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 550,
        borderRadius: 50,
        backgroundColor: "#7FFF00"
    }
})

export default HomeChat;