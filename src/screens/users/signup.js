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
  ScrollView,
  ActivityIndicator,
  animating,
  Modal
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
      TextInputPassword: '',
      loading: false
    }
  }
  //Function To send DATA
  InsertDataToServer = () => {
    const { TextInputName } = this.state;
    const { TextInputMono } = this.state;
    const { TextInputEmail } = this.state;
    const { TextInputUsername } = this.state;
    const { TextInputPassword } = this.state;
    // Perfect validation
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let phoneno = /^[0]?[6789]\d{9}$/;

    if (TextInputName == '' || TextInputMono == '' || TextInputEmail == '' || TextInputUsername == '' || TextInputPassword == '') {
      Alert.alert('Input Fields should not be Empty !')
    }
    else if (phoneno.test(this.state.TextInputMono) === false) {
      Alert.alert('Mobile Number is Invalid !');
      return false;
    }
    else if (reg.test(this.state.TextInputEmail) === false) {
      Alert.alert('Email Address is Invalid !');
      return false;
    }
    else if (this.state.TextInputPassword.length <= 6) {
      Alert.alert('Password Must Be Greater than 6 Characters !')
      return false;
    }
    else {
      this.setState({
        loading: true,
      });
      fetch('https://ngoapp3219.000webhostapp.com/db/user_signup.php', {
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
          this.setState({
            loading: false,
          });
          this.props.navigation.goBack();
        }).catch((error) => {
          // console.error(error);
          Alert.alert('Network Error !')
          this.setState({
            loading: false,
          });
        });
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ paddingRight: 60, paddingLeft: 60 }} >
          <View style={styles.container2}>
            <View style={styles.inputContainer}>
              <Icon style={styles.Icon} name="pencil" size={25} color="grey" />
              <TextInput style={styles.inputs}
                placeholder="Enter Your Full Name."
                // placeholderTextColor='#023e56'
                underlineColorAndroid='transparent'
                onChangeText={TextInputName => this.setState({ TextInputName })} />
            </View>

            <View style={styles.inputContainer}>
              <Icon style={styles.Icon} name="mobile" size={35} color="grey" />
              <TextInput style={styles.inputs}
                keyboardType="numeric"
                underlineColorAndroid='transparent'
                placeholder="Enter Mobile Number"
                maxLength={10}
                onChangeText={TextInputMono => this.setState({ TextInputMono })} />
            </View>

            <View style={styles.inputContainer}>
              <Icon style={styles.Icon} name="envelope" size={22} color="grey" />
              <TextInput style={styles.inputs}
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                placeholder="Enter Your Email Address"
                onChangeText={TextInputEmail => this.setState({ TextInputEmail })} />
            </View>

            <View style={styles.inputContainer}>
              <Icon style={styles.Icon} name="user" size={25} color="grey" />
              <TextInput style={styles.inputs}
                underlineColorAndroid='transparent'
                placeholder="Choose Username"
                autoCapitalize='none'
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
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 20,
    backgroundColor: '#dcdcdc'
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
  Icon: {
    padding: 12,
    color: '#373b6e'
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
    width: 150,
    backgroundColor: "#694fad",
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
    opacity: 20,
    backgroundColor: '#980953',
    borderWidth: 2,
    borderColor: 'black',

  },
  signupButton: {
    width: 150,
    backgroundColor: "skyblue",
    borderWidth: 2,
    borderColor: 'black'
  },
  loginText: {
    color: 'white',
  }
});



