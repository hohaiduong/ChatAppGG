import React, { useState, useEffect } from 'react'
import { View, FlatList, SafeAreaView, Image, Text, TouchableOpacity } from 'react-native'
import database from '@react-native-firebase/database';
import styles from '../Styles/FriendsRequestStyle';
const Friend = ({ route }) => {

    const { id } = route.params;
    const [data, setData] = useState([])
    console.log(id);
    useEffect(() => {
        getFriendList()
    }, [id])
    const getFriendList = () => {
        database()
            .ref('/friendsRequest/' + id)
            .on('value', snapshot => {
                if (snapshot.val() != null) {
                    setData(Object.values(snapshot.val()))
                }else{
                    setData([])
                }
            });
    }
    
    const accept = async(idRequest) => {
        await database()
        .ref('/friendsRequest/' + id + '/' + idRequest)
        .remove()
        // getFriendList()
    }
    const Item = ({ item }) => {
        const photoClient = item.photo;
        const Name = item.name;
        const id = item.id;
        return (
            <SafeAreaView style={{ flexDirection: "row"}}>
                <View style={styles.container}>
                    <View>
                        <Image
                            style={styles.image}
                            source={{ uri: photoClient }}
                        ></Image>
                    </View>
                    <View style={styles.ViewText}>
                        <Text style={styles.textName}>{Name}</Text>
                    </View>
                </View>
                <View style={styles.containerButton}>
                    <TouchableOpacity onPress={() => {accept(id)}}>
                        <Text style={styles.buttonAccept}>
                            Chấp nhận
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.buttonDel}>
                            Từ Chối
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
    return (
        <View>
            <FlatList
                data={data}
                renderItem={Item}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false} />
        </View>
    )
}

export default Friend;