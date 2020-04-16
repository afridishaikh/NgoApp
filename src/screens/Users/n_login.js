// Async Storage NEW VALIDATION
import React, { Component } from 'react';
import { StyleSheet,
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
       ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

const userInfo={username:'admin', password:'admin'}

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username:'',
      password:'',
      user:'',
      loading: false,
    }
  }



  UserLoginFunction = () => {
  //   this.setState({
  //     loading: true,
  // });
    const { username } = this.state;
    const { password } = this.state;

      if(username=='' || password=='')  {
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
              AsyncStorage.setItem('userType','ngo');
        
              this.props.navigation.navigate('NHome');
              Alert.alert('Login Success !');

              
        }
            else if(this.state.username == '' || this.state.password==''){
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
      <View style={{ flex: 1, marginBottom: 3 }}>


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




        {/* <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} 
        onPress={this._login}
        // onPress={()=> this.props.navigation.navigate('Home')}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>  */}

        
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} 
        onPress={this.UserLoginFunction}
        >
          <Text style={styles.loginText}>Login</Text>
          
        </TouchableHighlight> 
  
      

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} 
  
        onPress={()=> this.props.navigation.navigate('Nsignup')}
        >
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

      
         {/* <TouchableOpacity
          onPress={this.saveValueFunction}
          style={styles.button}>
          <Text style={styles.buttonText}> SAVE VALUE </Text>
        </TouchableOpacity>
          <TouchableOpacity
          onPress={this.getValueFunction}
          style={styles.button}>
          <Text> GET VALUE </Text>
        </TouchableOpacity>
          <Text style={styles.text}> Usrensme : {this.state.getValue} </Text> */}
{/* 
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.UserLoginFunction}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight> */}

        {/* <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.renderSeprator}
          renderItem={({ item }) =>
            <Text style={{ fontSize: 18, color: 'black', marginBottom: 15, flexDirection: 'row' }}>
              name: {item.name} p: {item.password} e:{item.email} m:{item.mo_no}
            </Text>
          }
          keyExtractor={(item, index) => index}
        /> */}

      </View>

    )
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



