// Async Storage NEW VALIDATION
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Modal,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  Alert,
  ActivityIndicator,
  animating,
  ScrollView,
  ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      user: '',
      loading: false,
    }
  }



  UserLoginFunction = () => {

    const { username } = this.state;
    const { password } = this.state;

    if (username == '' || password == '') {
      Alert.alert('Input Fields Should not be Empty !')
    }
    else {
      this.setState({
        loading: true,
      });
      const { username } = this.state;
      const { password } = this.state;
      fetch('https://ngoapp3219.000webhostapp.com/db/ngo_login.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson === 'Login Success') {
            AsyncStorage.setItem('username', this.state.username);
            AsyncStorage.setItem('userType', 'ngo');
            this.props.navigation.navigate('NHome');
            Alert.alert('Login Success !');
          }
          else if (this.state.username == '' || this.state.password == '') {
            Alert.alert('Username or Password is empty.');
            //alert for the empty InputText

          }
          else {
            Alert.alert(responseJson);
            this.setState({
              loading: false,
            });
          }
        }).catch((error) => {
          // console.error(error);
          Alert.alert('Netwrok Error')
        });
    }
  }


  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#dcdcdc' }}>
        <ScrollView style={{ flex: 1, marginTop: 70, backgroundColor: '#dcdcdc' }} >
          <View style={styles.maincontainer}>
            <View style={styles.inputContainer}>
              <Icon style={styles.Icon} name="user" size={25} color="#000" />
              <TextInput style={styles.inputs}
                autoCapitalize="none"
                placeholder="Username"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(username) => this.setState({ username })}
                value={this.state.username} />
            </View>


            <View style={styles.inputContainer}>
              <Icon style={styles.Icon} name="lock" size={25} color="#000" />
              <TextInput style={styles.inputs}
                autoCapitalize="none"
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password}
              />
            </View>






            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}
              onPress={this.UserLoginFunction}
            >
              <Text style={styles.loginText}>Login</Text>

            </TouchableHighlight>


            <Text style={{ fontWeight: 'bold', letterSpacing: 2,marginBottom:15 }}>OR</Text>


            <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]}

              onPress={() => this.props.navigation.navigate('Nsignup')}
            >
              <Text style={styles.loginText}>Signup</Text>
            </TouchableHighlight>


            {this.state.loading &&
              <Modal
                transparent={false}
                animationType="none"
                visible={this.state.loading}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                  <Text> Please Wait ...</Text>
                  <ActivityIndicator
                    animating={animating}
                    color='#bc2b78'
                    size={70}
                    loading={this.state.loading}
                  />
                </View>
              </Modal>
            }

          </View>
        </ScrollView>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  Icon: {
    padding: 15,
    color: '#373b6e'
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
    width: 150,
    backgroundColor: "#694fad",
    borderWidth: 2,
    borderColor: 'black',
  },
  signupButton: {
    width: 150,
    backgroundColor: "#00ab5e",
    borderWidth: 2,
    borderColor: 'black',
  },
  loginText: {
    color: 'white',
  }
});

export default Login;



