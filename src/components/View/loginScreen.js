import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
  Keyboard
} from 'react-native';
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import database from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';
import Auth from '../service/Auth';
import LoginStyles from '../Styles/LoginStyle';

GoogleSignin.configure({
  webClientId:
    "799131600584-meg43op2tfh87lgd7hprk7ml1mkv9tev.apps.googleusercontent.com",
  forceCodeForRefreshToken: true
});

const ScreenLogin = () => {
  var navigation = useNavigation();
  var [data, setData] = useState([])
  var [Success, setSucess] = useState(false)
  const prettyJson = (value) => {
    return JSON.stringify(value, null, 2);
  }; 
  useEffect(() => {
    getData()
  }, [])
  const getData = async() => {
    setData = await Auth.getAccount();
  }

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn()
      await Auth.setAccount(userInfo.user)
      // console.log("data2", data.id);
      database().ref("/user/" + data.id)
      .set(data)
      .then(()=> {
      console.log("Succesful"),
      navigation.replace("Home")}
      );
      
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log("statusCodes.SIGN_IN_CANCELLED ", error)
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log("statusCodes.IN_PROGRESS ", error)
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log("ERVICES_NOT_AVAILABLE ", error)
      } else {
        // some other error happened
        // console.log("else" , error)
      }
    }
  };

  return (
    <SafeAreaView style={LoginStyles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={{ alignItems: 'center' }}>
            <Image
              style={LoginStyles.img}
              source={require('../assets/img/chatty.png')}
            />
          </View>
          <GoogleSigninButton
            style={LoginStyles.GGButton}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() =>
              signIn()
            } />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ScreenLogin;