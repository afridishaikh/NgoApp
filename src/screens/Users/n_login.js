import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, TouchableHighlight, Alert, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const DismissKeyBoard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  UserLoginFunction = () => {
    const { username } = this.state;
    const { password } = this.state;

    fetch('https://ngoapp3219.000webhostapp.com/db/ngo_login.php', {
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
        // this.props.navigation.push('Menu');
        // this.props.navigation('Menu');
        // If server response message same as Data Matched
        if (responseJson != 'Data Matched') {
          // ToastAndroid.show('Login Successfull' ,ToastAndroid.SHORT);
          //Then open Profile activity and send user email to profile activity.
          Alert.alert(responseJson);
          // Alert.alert('success');
        
        }
        else {
      
          this.props.navigation.push('NHome');
        }
      }).catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      // <View style={styes.imagecontainer}>
      //   <Image style={styles.bgImage}
      //   source={this.props.imageSource} />
      //   {this.props.children}
      // </View>
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Icon style={styles.Icon} name="user" size={25} color="#000" />
            <TextInput style={styles.inputs}
              placeholder="Username"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(username) => this.setState({ username })} />
          </View>

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

          <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
            <Text>Forgot your password?</Text>
          </TouchableHighlight>


        </View>



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