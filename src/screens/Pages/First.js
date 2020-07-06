import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  animating,
  View,
  Dimensions,
  TextInput,
  TouchableHighlight,
  Alert,
  ImageBackground,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Name: '',
      Mono: '',
      Email: '',
      Password: '',
      loading: false
    
    }
  }

  InsertDataToServer = () => {
    const { Name } = this.state;
    const { Mono } = this.state;
    const { Email } = this.state;
    const { Password } = this.state;

    //VALIDATION
   let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let phoneno = /^[0]?[6789]\d{9}$/;

    if (Name == '' || Mono == '' || Email == '' || Password == '') {
      Alert.alert('Input Fields should not be Empty !')
    }
    else if (phoneno.test(this.state.Mono) === false) {
      Alert.alert('Mobile Number is Invalid !');
      return false;
    }
    else if (reg.test(this.state.Email) === false) {
      Alert.alert('Email Address is Invalid !');
      return false;
    }
    else if (this.state.Password.length <= 6) {
      Alert.alert('Password Must Be Greater than 6 Characters !')
      return false;
    }
    else {
      this.setState({
        loading: true,
      });

      firebase.database().ref('UserData/').push({
        name:Name,
        mo_no : Mono,
        email: Email,
        password: Password
      });

      firebase.auth().createUserWithEmailAndPassword(Email, Password)
      .then(()=>{  
        this.props.navigation.goBack();
        this.setState({
          loading: false,
        });
        Alert.alert('Signup Success !')
      })
      .catch(error=>{
        alert(error.message)
        this.setState({
          loading: false,
        });
      })
    }
  }
  render() {
    const bg = {uri:'https://firebasestorage.googleapis.com/v0/b/pukaar-c2f79.appspot.com/o/Assest%2Fetc%2Fbg.jpg?alt=media&token=e7d69656-d0a2-427d-aec8-197561522b9a'}
    return (

      <ImageBackground source={bg} style={styles.backgroundImage}>
        <View style={styles.container}>
          <View>
            <TouchableHighlight style={styles.SkipButton} onPress={() => this.props.navigation.replace('Home')}>
              <Text style={styles.loginText}>Skip</Text>
            </TouchableHighlight>
          </View>

          <ScrollView style={{ padding: 25, marginBottom: 100 }} >
            <View style={styles.container}>

            <View style={{
                            backgroundColor: '#00ab5e',
                            justifyContent: 'center',
                            alignContent: 'center',
                            // paddingLeft: 50,
                            margin: 10,
                            borderRadius:10,
                            marginBottom:30,
                            borderColor: 'black',
                            borderWidth: 2
                        }}>
            <Text style={[styles.Text, { fontSize: 22 }]} >  User Signup ! </Text>
            </View>

              <View style={styles.inputContainer}>
                <Icon style={styles.Icon} name="pencil" size={25} color="grey" />
                <TextInput style={styles.inputs}
                  placeholder="Enter Your Full Name"
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
                  placeholder="Enter Email Address"
                  autoCapitalize='none'
                  onChangeText={TextInputEmail => this.setState({ TextInputEmail })} />
              </View>

              <View style={styles.inputContainer}>
                <Icon style={styles.Icon} name="lock" size={25} color="grey" />
                <TextInput style={styles.inputs}
                  underlineColorAndroid='transparent'
                  placeholder="Create Password"
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
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
    padding: 15,
    color: '#373b6e'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center'
  },
  backgroundImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  Text: {
    color: 'white',
    alignContent: 'center',
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
  loginText: {
    color: 'white',
  }
});
export default Login;