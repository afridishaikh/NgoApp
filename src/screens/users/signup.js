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

// const { navigate } = this.props.navigation;
export default class LoginView extends Component {
  constructor(props) {
    super(props);
    state = {
      email   : '',
      password: '',
    }
  }
  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }


render() {
    return (  
      <View style={styles.container}>
        
      <ScrollView>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Name"
              keyboardType="Enter NGO Name"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
              placeholder="Username"
              keyboardType="Username For NGO"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
   </View>     
   <View style={styles.inputContainer}>
<TextInput style={styles.inputs}
placeholder="Mobile Number"
keyboardType="NGO Mobile"
underlineColorAndroid='transparent'
onChangeText={(email) => this.setState({email})}/>
</View>
<View style={styles.inputContainer}>
<TextInput style={styles.inputs}
placeholder="Address"
keyboardType="NGO Address"
underlineColorAndroid='transparent'
onChangeText={(email) => this.setState({email})}/>
</View>
<View style={styles.inputContainer}>
<TextInput style={styles.inputs}
placeholder="City"
keyboardType="City"
underlineColorAndroid='transparent'
onChangeText={(email) => this.setState({email})}/>

</View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
            <Text>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}>
            <Text>Register</Text>
        </TouchableHighlight>

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
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
  backgroundColor:'red'// "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});
 