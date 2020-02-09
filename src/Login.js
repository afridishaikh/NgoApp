import React, { Component } from 'react';
//import Splash from './Splash';
// import { StackNavigator } from "react-navigation";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,

} from 'react-native';
// import { StackNavigator } from "react-navigation";

// export default class login extends Component {

//   onClickListener = (viewId) => {
//     Alert.alert("Alert", "Button pressed "+viewId);
//   }
  
const DismissKeyBoard =({children})=>(
  <TouchableWithoutFeedback onPress={() =>Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
  );
  export default class Login extends Component {
    static navigationOptions =
     {
        title: 'Login',
     };
   
  constructor(props) {
   
      super(props)
    
      this.state = {
        email_id: '',
        password: ''
      }
   
    }
   
  UserLoginFunction = () =>{
   
   const { email_id }  = this.state ;
   const { password }  = this.state ;
   
  fetch('http://192.168.2.5/jewellery/code/login.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
   
      email_id: email_id,
   
      password: password
   
    })
   
  }).then((response) => response.json())
        .then((responseJson) => {
          // this.props.navigation.push('Menu');
          // this.props.navigation('Menu');
          // If server response message same as Data Matched
         if(responseJson === 'Data Matched')
          {
            // ToastAndroid.show('Login Successfull' ,ToastAndroid.SHORT);
            //Then open Profile activity and send user email to profile activity.
            this.props.navigation.navigate('Home');
            Alert.alert('success');             
          }
          else{   
            Alert.alert(responseJson);
          }
   
        }).catch((error) => {
          console.error(error);
        });
   
   
    }
  render() {
    // const {navigate}=this.props.navigation
    return (
    <DismissKeyBoard >
      <View style={styles.MainContainer}>
        <ImageBackground source={require('../images/login_page_11.jpg')} style={{width: '100%', height: '100%'}}>
        {/* <View style={{alignSelf:'flex-end'}}>
          <Text style={styles.skip}>SIGN-IN<Image style={styles.inputIcon} source={require('../images/Logo/sign_in3.png')}/></Text>

        </View> */}
        <View style={styles.MainContainer1}>        
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={require('../images/Logo/user.png')}/>
            <TextInput style={styles.inputs}
                id="email_id" 
                name="email_id" 
                placeholder="Email"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={email_id => this.setState({email_id})}/>
          </View>
          
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={require('../images/Logo/pwd.png')}/>
            <TextInput style={styles.inputs}
                id="password" 
                name="assword"
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={password => this.setState({password})}/>
          </View>

          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} 
                          name="login"
                          onPress={this.UserLoginFunction}>
                            {/* onPress={this.UserLoginFunction,()=>navigate('Menu')} > */}
            <Text style={styles.loginText}>Login</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.buttonContainer } onPress={() => this.onClickListener('Splash')}>
              <Text style={{color:'white',fontWeight:"bold"}}>Forgot Password?</Text>
          </TouchableHighlight>
{/* 
          <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}>
              <Text>SIGN-IN</Text>
          </TouchableHighlight> */}
          </View>
        </ImageBackground>
      </View>
   </DismissKeyBoard>
    );
  }
}

const styles = StyleSheet.create({
    MainContainer:  
    {  
        flex: 1,  
        width:'100%',
        justifyContent: 'center',  
        alignItems: 'center',  
        backgroundColor: '#DCDCDC',
        paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0  
    },  
    MainContainer1:  
    {  
        flex: 1,  
        width:'100%',
        justifyContent: 'center',  
        alignItems: 'center',  
        // backgroundColor: '#DCDCDC',
        paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0  
    },  
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#DCDCDC',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        // opacity:1,
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,        
    },
    inputIcon:{
      width:30,
      height:30,
      marginLeft:15,
      justifyContent: 'center'
    },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
    },
    skip:{
      // color:'white',
      fontSize:17,
      height:40,
      textDecorationLine:"underline",
      backgroundColor:'white',
      justifyContent:"center",
      borderRadius:10,
      fontWeight:"bold",
    },
    loginButton: {
        backgroundColor: "#f07511",
      },
      loginText: {
        color: 'white',
      }
    });
     




















//---------------------------------------------------------------------------------***********--------------------------
// import React, { Component } from 'react';
 
// import { StyleSheet, Text, View, Button } from 'react-native';
 
// class Login extends Component {
 
// static navigationOptions =
//  {
//     title: 'Login_Page',
//  };
 
//  NavigateActivityFunction = () =>
//  {
//     this.props.navigation.navigate('Second');    
//  }
 
//  render()
//  {
//     return(
//        <View style = { styles.MainContainer }>
 
//           {/* <Text style = { styles.ActivityNameTextCss }> ThisThis Is MainActivity. </Text> */}
//          <View style = { styles.btn }>
//           <Button onPress = { this.NavigateActivityFunction } title = 'Sign-in'/>
//           <Text></Text>
//           <Button onPress = { this.NavigateActivityFunction } title = 'Login'/>
//          </View>
//        </View>
//     );
//  }
// }
 
// const styles = StyleSheet.create(
// {
//  MainContainer: {
 
//     flex:1,
//     width:'100%',
//     alignItems:'center',
//     justifyContent: 'center',
//    //  margin: 5,
//     backgroundColor:'black'
  
//  },
//  btn:{
//    width:250,
//    textAlign: 'center',
//    fontSize: 20,
//    color: '#000',
//  },
 
//  ActivityNameTextCss: {
 
//     textAlign: 'center',
//     fontSize: 20,
//     color: '#000',

//  },
 
// });
 
// export default Login;