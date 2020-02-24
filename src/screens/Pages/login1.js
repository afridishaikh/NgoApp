import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, TouchableHighlight, Alert, ImageBackground } from 'react-native';
import {BackHandler} from 'react-native';


class Login extends Component {
  static navigationOptions =
    {
      title: 'Login',
    };
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

    fetch('http://192.168.42.250/ngoapp/user_login.php', {
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
          this.props.navigation.push('Profile');
        }
        else {
          Alert.alert(responseJson);
        }
      }).catch((error) => {
        console.error(error);
      });

      
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
}
handleBackButton(){
          BackHandler.exitApp();
      }

//       //Adding BackButton Exit Event
//   componentDidMount() {
//     BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
// }
// handleBackButton(){
//            Alert.alert(
//         'Exit App',
//         'Exiting the application?', [{
//             text: 'Cancel',
//             onPress: () => console.log('Cancel Pressed'),
//             style: 'cancel'
//         }, {
//             text: 'OK',
//             onPress: () => BackHandler.exitApp()
//         }, ], {
//             cancelable: false
//         }
//      )
//      return true;
//    }


  render() {
    return (
      // <View style={styes.imagecontainer}>
      //   <Image style={styles.bgImage}
      //   source={this.props.imageSource} />
      //   {this.props.children}
      // </View>

      <View style={styles.container}>
        <Text style={{ color: '#121456', fontSize: 25, textDecorationLine: 'underline' }}
          onPress={() => this.props.navigation.push('TabNavigator')}>Skip
             </Text>
        {/* <ImageBackground source={require('../../assets/images/bg.jpg')} style={{width: '100%', height: '100%'}}> */}
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={require('../../assets/icons/user.png')} />
            <TextInput style={styles.inputs}
              placeholder="Username"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(username) => this.setState({ username })} />
          </View>

          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
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

          <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.navigation.navigate('Signup')}>
            <Text style={styles.loginText}>Sign UP</Text>
          </TouchableHighlight>

          <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.navigation.navigate('Profile')}>
            {/* <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}> */}
            <Text>Profile</Text>
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