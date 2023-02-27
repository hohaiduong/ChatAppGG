import React, { useState, useEffect } from 'react';
import {
    View, Text, SafeAreaView, TextInput, FlatList,
    StyleSheet, TouchableOpacity, Image,
    Dimensions
} from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const { width, height } = Dimensions.get("screen");

const AddChat = ({ route }) => {
    var { id, name, photo } = route.params;
    const [allUser, setAllUser] = useState([])
    const [allUserBackup, setAllUserBackup] = useState([])
    const [search, setSearch] = useState("");
    const navigation = useNavigation();
    const roomID = Math.floor(Math.random() * 999999999999);
    var photoClient = "";
    useEffect(() => {
        getAllUser()
    }, [])

    const getAllUser = () => {
        database()
            .ref('user/')
            .once('value')
            .then(snapshot => {
                // console.log('User data: ', snapshot.val().id);
                setAllUser(Object.values(snapshot.val()).filter((it) => it.id != id))
                setAllUserBackup(Object.values(snapshot.val()).filter((it) => it.id != id))
            });
    }

    const SearchUser = (val) => {
        setSearch(val);
        setAllUser(allUserBackup.filter((it) => it.name.match(val)))
    }

    const createChat = (data) => {
        let myData = {
            roomID,
            id: id,
            name: name,
            photo: photo,
            lastMSG:""
        }
        database()
            .ref('/chatlist/' + data.id + "/" + id)
            .update(myData)
            .then(() => console.log("Success"));
        data.lastMSG = "";
        data.roomID = roomID;

        database()
            .ref('/chatlist/' + id + "/" + data.id)
            .update(data)
            .then(() => console.log("Success"));

        navigation.navigate("ChatRoom", { idUser: id, idClient: data.id, roomID: data.roomID})
    }

    const ItemList = ({ item }) => {
        const id = item.id
        photo = item.photo;
        const name = item.name;
        return (
            <View style={{
                borderTopWidth: 1,
                borderTopColor: "#A9A9A9"
            }}>
                <TouchableOpacity style={styles.list}
                    onPress={() => { [createChat(item)] }}
                >
                    <Image
                        style={styles.image}
                        source={{ uri: photo }}
                    />
                    <Text style={styles.text}>{name}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <SafeAreaView>
            <View style={styles.input}>
                <MaterialIcons
                    name="search"
                    size={20}
                    color="#666"
                // style={styles.icon}
                />
                <TextInput

                    placeholder="Search by name"
                    onChangeText={val => SearchUser(val)}
                    value={search}
                    keyboardType="email-address"
                //   style={styles.textInput}
                />
                <View style={styles.viewCancel}>
                    <TouchableOpacity>
                        <Text style={styles.textCancel}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <FlatList
                    data={allUser}
                    renderItem={ItemList}
                    keyExtractor={item => `key-${item.id}`}
                ></FlatList>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        width: width,
        padding: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    list: {
        padding: 5,
        marginLeft: 10,
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
    },

    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10
    },
    text: {
        fontSize: 20
    },
    textCancel: {
        fontWeight: "bold",
        color: "#1E90FF"
    },
    viewCancel: {
        width: width - 190,
        alignItems: "flex-end"

    }
})

export default AddChat;