import React, { Component } from 'react';
// import { Form, TextValidator } from 'react-native-validator-form';
//import ValidationComponent from 'react-native-form-validator';
//import Splash from './Splash';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  ImageBackground,
  ToastAndroid
} from 'react-native';
import Login from '../src/Login';
import { ScrollView } from 'react-native-gesture-handler';
export default class Sign_up extends Component {

  static navigationOptions =
  {
     title: 'Sign_up',
  };



  state = {
    value: 'first',
  };
  constructor(props) {
   
    super(props)
  
    this.state = {
      email_id: '',
      password: '',
      adhar:'',
      ph_no:'',
      gender:''
    }
  }

  UserSignupFunction=()=>{
    // ToastAndroid.show('error');
    Alert.alert('Eror');
  }

  UserSignupFunction1 = () =>{
  
    const { email_id }  = this.state ;
    const { password }  = this.state ;
    const { adhar }  = this.state ;
    const {ph_no}  = this.state ;
    const {gender}  = this.state ;
    fetch('http://192.168.42.250/jewellery/code/sign_up.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          email_id : email_id ,
          password : password ,
          adhar : adhar ,
          ph_no : ph_no ,
          gender :gender     
      })
     
    }).then((response) => response.json())
          .then((responseJson) => {
            if(responseJson==='Register Successfully')
            {
            //ToastAndroid.show(responseJson);
            Alert.alert('sucess');
            this.props.navigation.push("Login");   }
            else{
              Alert.alert('Error');
            }  
          }).catch((error) => {
            console.error(error);
          });
  }

  render() {
    //const {navigation} = this.props.navigation;
    return (
      
      <View style={styles.MainContainer}>
        <ImageBackground source={require('../images/login_page_11.jpg')} style={{width: '100%', height: '100%'}}>
        {/* <View style={{alignSelf:'flex-end'}}>
          <Text style={styles.skip}>SIGN-IN<Image style={styles.inputIcon} source={require('../images/Logo/sign_in3.png')}/></Text>

        </View> */}
        <ScrollView>
        <View style={styles.MainContainer1}>  
          <View><Text style={{fontSize:40,fontWeight:"bold"}}>Sign-Up</Text></View>      
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Email"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(email_id) => this.setState({email_id})}/>
          </View>
          
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password) => this.setState({password})}/>
          </View>

          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Re-Enter-Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password) => this.setState({password})}/>
          </View>

          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Adhar Card Number"
                keyboardType="number-pad"
                underlineColorAndroid='transparent'
                onChangeText={(adhar) => this.setState({adhar})}/>
          </View>

          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Phone Number"
                keyboardType="number-pad"
                underlineColorAndroid='transparent'
                onChangeText={(ph_no) => this.setState({ph_no})}/>
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
               placeholder="Gender"
               underlineColorAndroid='transparent'
               onChangeText={(gender) => this.setState({gender})}/>
          </View>
             <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.UserSignupFunction1}>
            <Text style={styles.loginText}>Register</Text>
          </TouchableHighlight>
          </View>
          </ScrollView>
        </ImageBackground>
      </View>
      
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
        paddingTop: ( Platform.OS === 'ios' ) ? 20 :40  
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