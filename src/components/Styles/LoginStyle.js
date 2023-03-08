import { StyleSheet } from 'react-native';

const LoginStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
  
    GGButton: {
      height: 60,
      alignSelf: "center"
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

export default LoginStyles;