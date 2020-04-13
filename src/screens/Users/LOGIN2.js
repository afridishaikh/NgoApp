//This is an example code to understand AsyncStorage// 
import React, { Component } from 'react';
//import react in our code. 

import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, View, TextInput, Button, Alert, Text, TouchableOpacity } from 'react-native';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      textInputData: '',
      //to get the value from the TextInput
      getValue: '',
      //to set the value on Text
    };
  }





  UserLoginFunction = () => {
    console.warn('called')
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
      if (responseJson === 'Data Matched') {

        if(this.state.username){
            AsyncStorage.setItem('any_key_here', this.state.username);
            this.setState({ textInputData: '' })
            alert('Data Saved');
            
            this.props.navigation.navigate('Profile')
   
          }else{
            alert('Please fill data');
            //alert for the empty InputText
          }
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
    );
  };
  render() {
    return (
        

   

      <View style={styles.MainContainer}>

                   <TextInput style={styles.inputs}
              placeholder="Username"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(username) => this.setState({ username })} />

<View style={styles.inputContainer}>

            <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({ password })} />
          </View>



        <TouchableOpacity
          onPress={this.UserLoginFunction}
          style={styles.button}>
          <Text style={styles.buttonText}> SAVE VALUE </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.getValueFunction}
          style={styles.button}>
          <Text style={styles.buttonText}> GET VALUE </Text>
        </TouchableOpacity>
        <Text style={styles.text}> {this.state.getValue} </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    alignItems: 'center',
    flex: 1,
    margin: 10,
    marginTop:60
  },
  TextInputStyle: {
    textAlign: 'center',
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#808000',
  },
  button: {
    width: '100%',
    height: 40,
    padding: 10,
    backgroundColor: '#808000',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});