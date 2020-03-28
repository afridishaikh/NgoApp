
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity,TextInput, TouchableHighlight, Alert, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';

import Profile from './profile';
class Routes extends Component {
  render() {
      return <AppContainer />;
  }
}
const AppNavigator = createStackNavigator({

  Profile: {
      screen: Profile
  },

},
//Navigation Options
{
    // initialRouteName: '',
    // header: null,
    // headerMode: 'none'
})
const AppContainer = createAppContainer(AppNavigator);

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      getValue:''
    }
  }


  


  UserLoginFunction = () => {
    const { username } = this.state;
    const { password } = this.state;

    fetch('https://ngoapp3219.000webhostapp.com/db/user_login.php', {
    // fetch('http://192.168.42.250/ngoapp/user_login.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        // If server response message same as Data Matched
        if (responseJson === 'Data Matched') {
          // ToastAndroid.show('Login Successfull' ,ToastAndroid.SHORT);
          //Then open Profile activity and send user email to profile activity.
          AsyncStorage.setItem('any_key_here', this.state.username);
          Alert.alert('success');
          // this.props.navigation.push('Profile');
        }
        else {
          Alert.alert(responseJson);
        }
      }).catch((error) => {
        console.error(error);
      });
      
    
  }
  
  getValueFunction = () => {
    //function to get the value from AsyncStorage
    AsyncStorage.getItem('any_key_here').then(value =>
      //AsyncStorage returns a promise so adding a callback to get the value
      this.setState({ getValue: value })
      //Setting the value in Text 
    );}
  

  render() {
    return (
      // <View style={styes.imagecontainer}>
      //   <Image style={styles.bgImage}
      //   source={this.props.imageSource} />
      //   {this.props.children}
      // </View>

     

      <View style={styles.container}>
           <ImageBackground  style={{width:'100%',height:'100%',alignItems:'center'}}>
        
          <View style={styles.inputContainer}>
            <Icon style={styles.Icon} name="user" size={25} color="#000" />
            <TextInput style={styles.inputs}
              placeholder="Username"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(username) => this.setState({ username })} />
          </View>
{/* <View style={styles.inputContainer}>
<TextInput
          placeholder="Enter Some Text here"
          value={this.state.textInputData}
          onChangeText={data => this.setState({ username: data })}
          underlineColorAndroid="transparent"
          style={styles.TextInputStyle}
        /> */}
        {/* </View> */}

          <View style={styles.inputContainer}>
            <Icon style={styles.Icon} name="lock" size={25} color="#000" />
            <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({ password })} />
          </View>

          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.UserLoginFunction}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableHighlight>
{/* 
          <TouchableOpacity
          onPress={this.saveValueFunction}
          style={styles.button}>
          <Text style={styles.buttonText}> SAVE VALUE </Text>
        </TouchableOpacity> */}

          <TouchableOpacity
          onPress={this.getValueFunction}
          style={styles.button}>

          <Text style={styles.buttonText}> GET VALUE </Text>
        </TouchableOpacity>


          <Text style={styles.text}> Usrensme : {this.state.getValue} </Text>

          <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.navigation.navigate('profile')}>
            <Text>Profile</Text>
          </TouchableHighlight>

          {/* <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
            <Text>Forgot your password?</Text>
          </TouchableHighlight>

          <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.navigation.navigate('Signup')}>
            <Text style={styles.loginText}>Sign UP</Text>
          </TouchableHighlight>

  


                

          <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.navigation.navigate('Nsignup')}>
            <Text style={styles.loginText}>Register As NGO</Text>
          </TouchableHighlight> */}
       
        </ImageBackground>
      </View>


    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  Icon: {
    padding: 15,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  signupButton: {
    backgroundColor: "#980953",
  },
  loginText: {
    color: 'white',
  }
});

export default Login;
