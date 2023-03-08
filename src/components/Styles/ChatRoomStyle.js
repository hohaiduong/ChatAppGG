import {StyleSheet} from "react-native";
import { width, height } from "../Util/Constant";

const violet = '#ad40af';
const orange = '#F8D548';

const styles = StyleSheet.create({
    viewTitle: {
        flexDirection: "row",
        alignItems: "center"
    },
    imgTitle: {
        width: 40,
        height: 40,
        borderRadius: 50
    },
    TextTitle: {
        marginLeft: 10,
        fontFamily: "Arial",
        fontWeight: "700",
        color: "black",
        fontSize: 20
    },
    messages: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        maxWidth: '70%',
    },

    imgMessages: {
        width: 300,
        height: 200,
        margin: 5,
        borderRadius: 10,
        maxWidth: '70%',
    },
    containerSendMess: {
        alignItems: "center",
        flexDirection: "row"
    },
    leftContainer: {
        backgroundColor: orange,
        marginLeft: 10,
        marginRight: 'auto',
    },

    rightContainer: {
        backgroundColor: violet,
        marginLeft: 'auto',
        marginRight: 10,
    },

    imgLeftContainer: {
        marginLeft: 10,
        marginRight: 'auto',
    },

    imgRightContainer: {
        marginLeft: 'auto',
        marginRight: 10,
    },

    list: {
        height: height - 100,

    },

    root: {
        padding: 10,
        height: '60%',
    },

    row: {
        flexDirection: 'row',
    },

    inputContainer: {
        backgroundColor: '#f2f2f2',
        flex: 1,
        borderWidth: 1,
        borderColor: 'lightgrey',
        marginRight: 10,
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconEmoji: {
        marginHorizontal: 15,
    },

    input: {
        flex: 1,
    },

    iconMicro: {
        marginRight: 15,
    },

    buttonContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#ad40af',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },

    container: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        maxWidth: '70%',
    },
});
export default styles;
