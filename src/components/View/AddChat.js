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
import styles from '../Styles/AddChatStyle';

const AddChat = ({ route }) => {
    var { id, nameUser, photo} = route.params;
    roomID = Math.floor(Math.random() * 999999999999);
    const [allUser, setAllUser] = useState([])
    const [allUserBackup, setAllUserBackup] = useState([])
    const [search, setSearch] = useState("");
    const navigation = useNavigation();
    console.log(photo);
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

    const addChat = (data) => {
        let myData = {
            roomID,
            id: id,
            photo: photo,
            name: nameUser,
            lastMSG: "",
            
        }
        database()
            .ref('/chatlist/' + data.id + "/" + id)
            .update(myData)
            .then(() => console.log("Success"));

        data.lastMSG= "";
        data.roomID = roomID;

        database()
            .ref('/chatlist/' + id + "/" + data.id)
            .update(data)
            .then(() => console.log("Success"));
        navigation.navigate("ChatRoom", {
            idUser: id, idClient: data.id,
            photoUser: photo, photoClient: data.photo, 
            nameUser: nameUser, nameClient: data.name, 
            roomID: roomID
        })
    }

    const ItemList = ({ item }) => {
        const name = item.name;
        photoClient = item.photo;
        nameClient = item.name;
        return (
            <View style={{
                borderTopWidth: 1,
                borderTopColor: "#A9A9A9"
            }}>
                <TouchableOpacity style={styles.list}
                    onPress={() => { addChat(item) }}
                >
                    <Image
                        style={styles.image}
                        source={{ uri: photoClient }}
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
                {/* <View style={styles.viewCancel}>
                    <TouchableOpacity onPress={() => {navigation.goBack()}}>
                        <Text style={styles.textCancel}>Cancel</Text>
                    </TouchableOpacity>
                </View> */}
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



export default AddChat;