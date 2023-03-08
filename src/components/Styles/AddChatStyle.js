import {StyleSheet} from "react-native";
import { width, height } from "../Util/Constant";
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
export default styles;