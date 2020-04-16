import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView,ActivityIndicator,animating, View, Dimensions, KeyboardAvoidingView, Platform, Button, Image, TextInput, TouchableHighlight, Alert, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      TextInputName: '',
      TextInputMono: '',
      TextInputEmail: '',
      TextInputUsername: '',
      TextInputPassword: '',
      loading:false,
    }
  }

  InsertDataToServer = () => {
    const { TextInputName } = this.state;
    const { TextInputMono } = this.state;
    const { TextInputEmail } = this.state;
    const { TextInputUsername } = this.state;
    const { TextInputPassword } = this.state;
    
  //VALIDATION
    let phoneno = /^[0]?[6789]\d{9}$/;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
      if(TextInputName=='' || TextInputMono=='' ||TextInputEmail=='' || TextInputUsername=='' || TextInputPassword=='')  {
        Alert.alert('Input Fields should not be Empty !')
      }
      else if(phoneno.test(this.state.TextInputMono) === false) 
      { 
      Alert.alert('Mobile Number is Invalid !');
      return false; 
      } 
      else if(reg.test(this.state.TextInputEmail) === false) 
       { 
       Alert.alert('Email Address is Invalid !');
       return false; 
       } 
       else if(this.state.TextInputPassword.length <=6) 
       { 
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
        this.props.navigation.navigate('Login');
        this.setState({
          loading: false,
      });
      }).catch((error) => {
        // console.error(error);
        Alert.alert('Network Error !')
      });
    }
  }
  render() {
    return (

      <ImageBackground source={require('../../assets/bg.jpg')} style={styles.backgroundImage}>
        <View style={styles.container}>
          <View>
            <TouchableHighlight style={styles.SkipButton} onPress={() => this.props.navigation.replace('Home')}>
              <Text style={styles.loginText}>Skip</Text>
            </TouchableHighlight>
          </View>
          {/* <Text style={{ color: '#121456', fontSize: 25, textDecorationLine: 'underline' }}
           onPress={() => this.props.navigation.navigate('TabNavigator')}>Skip
         </Text> */}

          {/* <ImageBackground source={require('../../assets/images/bg.jpg')} style={{width: '100%', height: '100%'}}> */}



          <ScrollView style={{ padding: 25, marginBottom: 100 }} >

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
                  maxLength={10}
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

  
              {this.state.loading &&
         <ActivityIndicator
               animating = {animating}
               color = '#bc2b78'
               size = "large"
               loading={this.state.loading}
               />
    }


            </View>



          </ScrollView>


        </View>
      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10
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
  backgroundImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
    backgroundColor: "#980953",
    borderWidth: 2,
    borderColor: 'black',
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
export default Login;