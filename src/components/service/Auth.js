import AsyncStorage from '@react-native-async-storage/async-storage';


const getAccount = async() => {
    try {
        const jsonValue = await AsyncStorage.getItem("account")
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
        console.log("error reading value");
    }
}

const setLogin = async(data) => {
    return AsyncStorage.setItem("login", data)
}

const getLogin = async() => {
    return AsyncStorage.getItem("login")
}
const setAccount = async(data) => {
    try {
        const jsonValue = JSON.stringify(data)
        await AsyncStorage.setItem("account", jsonValue)
    } catch (e) {
        // saving error
        console.log("saving error");
    }
}

const logout = async() => {
    await AsyncStorage.removeItem("account")
    await AsyncStorage.setItem("login", "Login")

}


export default {getAccount, setAccount, logout, setLogin};
