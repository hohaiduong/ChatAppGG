import React, { useState, useEffect }from 'react'
import { View, FlatList, SafeAreaView, Image, Text, TouchableOpacity } from 'react-native'
import database from '@react-native-firebase/database';
import styles from '../Styles/HomeStyle';
const Friend = ({route}) => {
    
    const {id} = route.params;
    const [data, setData] = useState([])
    useEffect(() => {
     getFriendList()
    }, [])
    const getFriendList = () => {
        database()
            .ref('/friendsRequest/' + id)
            .on('value', snapshot => {
                if (snapshot.val() != null) {
                    setData(Object.values(snapshot.val()))
                }
            });
    }
    const Item = ({ item }) => {
        const photoClient = item.photo;
        const Name = item.name;
        return (
            <SafeAreaView>
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
                <TouchableOpacity>
                    <Text>
                        Chấp nhận
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
    return(
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