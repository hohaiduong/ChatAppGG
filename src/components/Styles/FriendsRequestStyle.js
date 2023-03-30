import {StyleSheet} from "react-native";
import { width, height } from "../Util/Constant";
const styles = StyleSheet.create({
    container: {
        width: width - 100,
        alignSelf: "center",
        marginTop: 5,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: "#F5f5f5",
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerButton: {
        alignSelf: "center",
    },
    buttonAccept: {
        color: "white",
        backgroundColor: "dodgerblue",
        padding: 5,
        fontWeight: "bold",
        borderRadius: 7,
        marginBottom: 5
    },
    buttonDel: {
        color: "white",
        backgroundColor: "gray",
        padding: 5,
        fontWeight: "bold",
        borderRadius: 7
        
    },
    
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10,
    },
    textName: {
        fontSize: 17,
        fontWeight: "bold",
        color: "black",
        fontFamily: "normal"
    },
})

export default styles;