import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

// const { navigate } = this.props.navigation;
export default class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      TextInputName: '',
      TextInputMono: '',
      TextInputEmail: '',
      TextInputUsername: '',
      TextInputPassword: ''
    }
  }

  InsertDataToServer = () => {
    const { TextInputName } = this.state;
    const { TextInputMono } = this.state;
    const { TextInputEmail } = this.state;
    const { TextInputUsername } = this.state;
    const { TextInputPassword } = this.state;

    //The connection And Insert
    // fetch('https://ngoapp3219.000webhostapp.com/db/user_signup.php', {
      fetch('https://ngoapp.000webhostapp.com/ngoapp/signup.php', {
    
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: TextInputName,
        mo_no: TextInputMono,
        email: TextInputEmail,
        username: TextInputUsername,
        password: TextInputPassword
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson);
      }).catch((error) => {
        console.error(error);
      });
    // }).then((response) => response.json())
    // .then((responseJson) => {
    //   if(responseJson==='Register Successfully')
    //   {
    //   //ToastAndroid.show(responseJson);
    //   Alert.alert('sucess');
    //   this.props.navigation.push("login");   }
    //   else{
    //     Alert.alert('Error');
    //   }  
    // }).catch((error) => {
    //   console.error(error);
    // });
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.inputContainer}>
          <Icon style={styles.Icon} name="pencil" size={25} color="grey" />
            <TextInput style={styles.inputs}
              placeholder="Enter Name"
              underlineColorAndroid='transparent'
              onChangeText={TextInputName => this.setState({ TextInputName })} />
          </View>

          <View style={styles.inputContainer}>
          <Icon style={styles.Icon} name="mobile" size={35} color="grey" />
            <TextInput style={styles.inputs}
              keyboardType="numeric"
              underlineColorAndroid='transparent'
              placeholder="Enter Mobile Number"
              onChangeText={TextInputMono => this.setState({ TextInputMono })} />
          </View>

          <View style={styles.inputContainer}>
          <Icon style={styles.Icon} name="envelope" size={22} color="grey" />
            <TextInput style={styles.inputs}
              placeholder="Mobile Number"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              placeholder="Enter Email"
              onChangeText={TextInputEmail => this.setState({ TextInputEmail })} />
          </View>

          <View style={styles.inputContainer}>
          <Icon style={styles.Icon} name="user" size={25} color="grey" />
            <TextInput style={styles.inputs}
              underlineColorAndroid='transparent'
              placeholder="Select Username"
              onChangeText={TextInputUsername => this.setState({ TextInputUsername })} />
          </View>

          <View style={styles.inputContainer}>
          <Icon style={styles.Icon} name="lock" size={25} color="grey" />
            <TextInput style={styles.inputs}
              underlineColorAndroid='transparent'
              placeholder="Enter Password"
              secureTextEntry={true}
              onChangeText={TextInputPassword => this.setState({ TextInputPassword })} />
          </View>

          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.InsertDataToServer}>
            <Text style={styles.loginText}>Signup</Text>
          </TouchableHighlight>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop:80,
    justifyContent:'center',
    alignItems: 'center',

    // backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    // borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    // borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black'
  },
  Icon: {
    padding: 15,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
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
    width:150,
 backgroundColor: "#980953",
    borderWidth: 2,
    borderColor: '#000'
  },
  SkipButton: {
    height: 37,
    marginTop: 30,
    marginRight: '70%',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 30,
    opacity:20,
    backgroundColor: '#980953',
    borderWidth: 2,
    borderColor: 'black',
    
  },
  signupButton: {
    width:150,
    backgroundColor: "skyblue",
    borderWidth: 2,
    borderColor: 'black'
  },
  loginText: {
    color: 'white',
  }
});