import {StyleSheet} from "react-native";
import { width, height } from "../Util/Constant";
const styles = StyleSheet.create({
    viewTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: width - 40
    },
    TextTitle: {
        marginLeft: 10,
        fontFamily: "Arial",
        fontWeight: "700",
        color: "black",
        fontSize: 20
    },
    settingIcon: {
        color: "black",
        fontSize: 25,
        marginLeft: 10
    },
    safeView: {
        backgroundColor: "#fff",
        width: width,
        height: height
    },
    viewChatList: {
        height:height - 100
    },
    iconAdd: {
        color: "#FFF"
    },
    ViewText: {
        marginLeft: 10,
        marginRight: 68
    },
    viewButton: {
        justifyContent: "flex-end",
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

export default styles;