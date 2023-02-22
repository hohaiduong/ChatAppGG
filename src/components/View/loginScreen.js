import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
  Text,
  StyleSheet,
  Keyboard,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
  "799131600584-meg43op2tfh87lgd7hprk7ml1mkv9tev.apps.googleusercontent.com",
  forceCodeForRefreshToken: true
 });

const ScreenLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [userInfo, setUserInfo] = useState(null);
  const prettyJson = (value) => {
    return JSON.stringify(value, null, 2);
  };
  const signIn = async () => {
    try {
    
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      // await GoogleSignin.signIn();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo)
    }catch(error){
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
      console.log(error);
    } 
  };



  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ paddingHorizontal: 25 }}>
          <View style={{ alignItems: 'center' }}>
            <Image
              style={styles.img}
              source={require('../assets/img/chatty.png')}
            />
          </View>
          <Text style={styles.text}>Login</Text>

          {/* Login */}
          <View style={styles.input}>
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <TextInput
              placeholder="Email ID"
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
              style={styles.textInput}
            />
          </View>

          <View style={styles.input}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <TextInput
              placeholder="Password"
              onChangeText={setPassword}
              value={password}
              style={styles.textInput}
              secureTextEntry={true}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Forgot');
              }}>
              <Text style={styles.textForgot}>Forgot?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              login();
            }}
            style={styles.btnLogin}>
            <Text style={styles.textLogin}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.textConnect}>Or, login with ...</Text>

          {/* Connection */}
          <View style={styles.connection}>
            <TouchableOpacity onPress={() => { }}>
              <Image
                style={styles.imgConnect}
                source={require('../assets/img/facebook.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { signIn() }}>
              <Image
                style={styles.imgConnect}
                source={require('../assets/img/google.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }}>
              <Image
                style={styles.imgConnect}
                source={require('../assets/img/instagram.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.connectRegister}>
            <Text>New to the app?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Register');
              }}>
              <Text style={styles.textConnectRegister}> Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  img: {
    width: 200,
    height: 200,
  },

  text: {
    fontSize: 28,
    fontWeight: '500',
    color: '#333',
    marginBottom: 30,
  },

  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
  },

  icon: {
    marginRight: 5,
  },

  textInput: {
    flex: 1,
    paddingVertical: 0,
  },

  textForgot: {
    color: '#ad40af',
    fontWeight: '700',
  },

  btnLogin: {
    backgroundColor: '#ad40af',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 10,
  },

  textLogin: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: '#fff',
  },

  textConnect: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },

  connection: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
  },

  imgConnect: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },

  connectRegister: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  textConnectRegister: {
    color: '#ad40af',
    fontWeight: '700',
  },
});

export default ScreenLogin;