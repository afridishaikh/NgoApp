import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, TouchableHighlight, Alert, ImageBackground } from 'react-native';
import { BackHandler } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
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

    fetch('https://ngoapp3219.000webhostapp.com/db/user_login.php', {
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
          Alert.alert('success');
          this.props.navigation.push('Drawer');
        }
        else {
          Alert.alert(responseJson);
        }
      }).catch((error) => {
        console.error(error);
      });
  }

  // //Adding BackButton Exit Event
  // componentDidMount() {
  //   BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
  // }
  // handleBackButton() {
  //   BackHandler.exitApp();
  // }

  render() {
    return (




      <View style={styles.container}>

        <ImageBackground source={require('../../assets/bg.jpg')} style={{ width: '100%', height: '100%', alignItems: 'center' }}>

          <TouchableHighlight  style={styles.SkipButton} onPress={() => this.props.navigation.navigate('Drawer')}>
            <Text style={styles.loginText}>Skip</Text>
          </TouchableHighlight>

          {/* <Text style={{ color: '#121456', fontSize: 25, textDecorationLine: 'underline' }}
           onPress={() => this.props.navigation.navigate('TabNavigator')}>Skip
         </Text> */}

          {/* <ImageBackground source={require('../../assets/images/bg.jpg')} style={{width: '100%', height: '100%'}}> */}

          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Icon style={styles.Icon} name="user" size={25} color="grey" />
              <TextInput style={styles.inputs}
                placeholder="Username"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(username) => this.setState({ username })} />
            </View>

            <View style={styles.inputContainer}>
              <Icon style={styles.Icon} name="lock" size={25} color="grey" />
              <TextInput style={styles.inputs}
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password) => this.setState({ password })} />
            </View>

            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.UserLoginFunction}>
              <Text style={[styles.loginText, { fontWeight: 'bold' }]}>Login</Text>
            </TouchableHighlight>

            {/* <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
           */}

            <TouchableHighlight style={styles.buttonContainer}>
              <Text style={{ textDecorationLine: 'underline', fontSize: 18, fontWeight: 'bold' }}>Forgot your password ?</Text>
            </TouchableHighlight>

            <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.navigation.navigate('Signup')}>
              <Text style={{ color: 'black', fontWeight: 'bold' }}>Sign Up</Text>
            </TouchableHighlight>
          </View>
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
    borderColor: 'black'
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
export default Login;