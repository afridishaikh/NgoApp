// // Async Storage LOGIN (added Logout and login) WITH NGO
// import React, { Component } from 'react';
// import { StyleSheet,
//    Text, 
//    View,
//     FlatList,
//      Button, 
//      Modal,
//       Image, 
//       TouchableOpacity, 
//       TextInput, 
//       TouchableHighlight,
//        Alert, 
//        ImageBackground } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import AsyncStorage from '@react-native-community/async-storage';

// // const DismissKeyBoard = ({ children }) => (
// //   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
// //     {children}
// //   </TouchableWithoutFeedback>
// // );

// const userInfo={username:'admin', password:'admin'}

// class Login extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       username:'',
//       password:''

//     }
//   }



//   // UserLoginFunction = () => {
//   //   const { username } = this.state;
//   //   const { password } = this.state;
//   //   fetch('https://ngoapp3219.000webhostapp.com/db/Test.php', {
//   //     // fetch('http://192.168.42.250/ngoapp/user_login.php', {
//   //     method: 'POST',
//   //     headers: {
//   //       'Accept': 'application/json',
//   //       'Content-Type': 'application/json',
//   //     },
//   //     body: JSON.stringify({
//   //       username: username,
//   //       password: password,
//   //     })
//   //   }).then((response) => response.json())
//   //     .then((responseJson) => {
//   //       this.setState({
//   //         dataSource: responseJson
//   //       },
//   //         // console.warn(responseJson),
//   //         function () {
//   //           console.warn(responseJson.name)
//   //           // AsyncStorage.setItem('any_key_here', responseJson);
//   //           if(this.state.responseJson){
//   //             //To check the input not empty
//   //             JSON.stringify(responseJson)
//   //             AsyncStorage.setItem('any_key_here', responseJson.name);
//   //             //Setting a data to a AsyncStorage with respect to a key 
//   //             this.setState({ textInputData: '' })
//   //             //Resetting the TextInput
//   //             alert('Data Saved');
//   //             //alert to confirm
//   //           }else{
//   //             alert('Please fill data');
//   //             //alert for the empty InputText
//   //           }
//   //         });
//   //     }).catch((error) => {
//   //       console.error(error)
//   //     });
//   // }

//   // // saveValueFunction = () => {
//   // //   // console.warn(this.state.responseJson)
//   // //   //function to save the value in AsyncStorage
//   // //   if(this.state.responseJson){
//   // //     //To check the input not empty
//   // //     AsyncStorage.setItem('any_key_here', responseJson);
//   // //     //Setting a data to a AsyncStorage with respect to a key 
//   // //     this.setState({ textInputData: '' })
//   // //     //Resetting the TextInput
//   // //     alert('Data Saved');
//   // //     //alert to confirm
//   // //   }else{
//   // //     alert('Please fill data');
//   // //     //alert for the empty InputText
//   // //   }
//   // // };




//   render() {
//     return (
//       <View style={{ flex: 1, marginBottom: 3 }}>

//         <View style={styles.inputContainer}>
//           <Icon style={styles.Icon} name="user" size={25} color="#000" />
//           <TextInput style={styles.inputs}
//             placeholder="Username"
//             keyboardType="email-address"
//             underlineColorAndroid='transparent'
//             onChangeText={(username) => this.setState({ username })}
//             value={this.state.username} />
//         </View>


//         <View style={styles.inputContainer}>
//           <Icon style={styles.Icon} name="lock" size={25} color="#000" />
//           <TextInput style={styles.inputs}
//             placeholder="Password"
//             secureTextEntry={true}
//             underlineColorAndroid='transparent'
//             onChangeText={(password) => this.setState({ password })}
//             value={this.state.password}  />
//         </View>




//         <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} 
//         onPress={this._login}
//         // onPress={()=> this.props.navigation.navigate('Home')}
//         >
//           <Text style={styles.loginText}>Login</Text>
//         </TouchableHighlight> 

//         <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} 
  
//         onPress={()=> this.props.navigation.navigate('Signup')}
//         >
//           <Text style={styles.loginText}>Signup</Text>
//         </TouchableHighlight> 

      
//          {/* <TouchableOpacity
//           onPress={this.saveValueFunction}
//           style={styles.button}>
//           <Text style={styles.buttonText}> SAVE VALUE </Text>
//         </TouchableOpacity>
//           <TouchableOpacity
//           onPress={this.getValueFunction}
//           style={styles.button}>
//           <Text> GET VALUE </Text>
//         </TouchableOpacity>
//           <Text style={styles.text}> Usrensme : {this.state.getValue} </Text> */}
// {/* 
//         <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.UserLoginFunction}>
//           <Text style={styles.loginText}>Login</Text>
//         </TouchableHighlight> */}

//         {/* <FlatList
//           data={this.state.dataSource}
//           ItemSeparatorComponent={this.renderSeprator}
//           renderItem={({ item }) =>
//             <Text style={{ fontSize: 18, color: 'black', marginBottom: 15, flexDirection: 'row' }}>
//               name: {item.name} p: {item.password} e:{item.email} m:{item.mo_no}
//             </Text>
//           }
//           keyExtractor={(item, index) => index}
//         /> */}

//       </View>

//     )
//   }
//   _login = async() => {
//     if(userInfo.username===this.state.username && userInfo.password===this.state.password )
//     {
//       // alert('Logged in')
//       await AsyncStorage.setItem('isLoggedIn','1');
//       this.props.navigation.navigate('App')
//     }
//     else
//     {
//       alert('Fail');
//     }
//   }
//   getValueFunction = () => {
//     console.warn('calling')
//     //function to get the value from AsyncStorage
//     AsyncStorage.getItem('IsLoggedIN').then(value =>
//       //AsyncStorage returns a promise so adding a callback to get the value
//       this.setState({ getValue: value })
//       //Setting the value in Text 
//     );}
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#DCDCDC',
//   },
//   inputContainer: {
//     borderBottomColor: '#F5FCFF',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 30,
//     borderBottomWidth: 1,
//     width: 250,
//     height: 45,
//     marginBottom: 20,
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   inputs: {
//     height: 45,
//     marginLeft: 16,
//     borderBottomColor: '#FFFFFF',
//     flex: 1,
//   },
//   Icon: {
//     padding: 15,
//   },
//   inputIcon: {
//     width: 30,
//     height: 30,
//     marginLeft: 15,
//     justifyContent: 'center'
//   },
//   buttonContainer: {
//     height: 45,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//     width: 250,
//     borderRadius: 30,
//   },
//   loginButton: {
//     backgroundColor: "#00b5ec",
//   },
//   signupButton: {
//     backgroundColor: "#980953",
//   },
//   loginText: {
//     color: 'white',
//   }
// });

// export default Login;


// Async Storage NEW
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
      user:''
    }
  }



  UserLoginFunction = () => {
    const { username } = this.state;
    const { password } = this.state;
    fetch('https://ngoapp3219.000webhostapp.com/db/user_login.php', {
      // fetch('http://192.168.42.250/ngoapp/user_login.php', {
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
        if (responseJson === 'Data Matched') {
              AsyncStorage.setItem('username', this.state.username);
              AsyncStorage.setItem('userType','user');
              // this.setState({ user: '' })
              Alert.alert('Login Success!');
              this.props.navigation.navigate('UHome')
        }
            else if(this.state.username == '' || this.state.password==''){
              Alert.alert('Username or Password is empty.');
              //alert for the empty InputText
        }
        else {
          Alert.alert(responseJson);
        }
      }).catch((error) => {
        // console.error(error);
        Alert.alert('Netwrok Error')
      });
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
        // onPress={()=> this.props.navigation.navigate('Home')}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight> 


        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} 
  
        onPress={()=> this.props.navigation.navigate('Signup')}
        >
          <Text style={styles.loginText}>Signup</Text>
        </TouchableHighlight> 

      
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
  // _login = async() => {
  //   if(userInfo.username===this.state.username && userInfo.password===this.state.password )
  //   {
  //     // alert('Logged in')
  //     await AsyncStorage.setItem('isLoggedIn','1');
  //     this.props.navigation.navigate('App')
  //   }
  //   else
  //   {
  //     alert('Fail');
  //   }
  // }
  getValueFunction = () => {
    console.warn('calling')
    //function to get the value from AsyncStorage
    AsyncStorage.getItem('IsLoggedIN').then(value =>
      //AsyncStorage returns a promise so adding a callback to get the value
      this.setState({ getValue: value })
      //Setting the value in Text 
    );}
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





// // OLDER (design)
// import React, { Component } from 'react';
// import {AsyncStorage, StyleSheet, Text, View, Button, Image, TextInput, TouchableHighlight, Alert, ImageBackground } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// const DismissKeyBoard = ({ children }) => (
//   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//     {children}
//   </TouchableWithoutFeedback>
// );

// class Login extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       username: '',
//       password: '',

//       userData:[]
//     }
//   }


//   // UserLoginFunction = () => {
//   //   const { username } = this.state;
//   //   const { password } = this.state;

//   //   fetch('https://ngoapp3219.000webhostapp.com/db/user_login.php', {
//   //   // fetch('http://192.168.42.250/ngoapp/user_login.php', {
//   //     method: 'POST',
//   //     headers: {
//   //       'Accept': 'application/json',
//   //       'Content-Type': 'application/json',
//   //     },
//   //     body: JSON.stringify({
//   //       username: username,
//   //       password: password
//   //     })
//   //   }).then((response) => response.json())
//   //     .then((responseJson) => {
//   //       if (responseJson === 'Data Matched') {
//   //             this.setState({userData: 
//   //             JSON.stringify(this.state.username)})
//   //         alert(this.state.userData);
//   //       }
//   //       else {
//   //         Alert.alert(responseJson);
//   //       }
//   //     }).catch((error) => {
//   //       console.error(error);
//   //     });
//   // }


//   UserLoginFunction = () => {
//     const { username } = this.state;
//     const { password } = this.state;

//     fetch('https://ngoapp3219.000webhostapp.com/db/user_login.php', {
//     // fetch('http://192.168.42.250/ngoapp/user_login.php', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         username: username,
//         password: password
//       })
//     }).then((response) => response.json())
//       .then((responseJson) => {
//         if (responseJson === 'Data Matched') {
//               this.setState({userData: 
//               JSON.stringify(this.state.username)})

//               _storeData = async (userData) => { 
//                 try {
//                    await AsyncStorage.setItem("userData", JSON.stringify(this.state.username));
//                 } catch (error) {
//                   console.log("Something went wrong", error);
//                 }
//               }
//               _retrieveData = async () => {
//                 try {
//                   let userData = await AsyncStorage.getItem("userData");
//                   let data = JSON.parse(userData);
//                   console.log(data);
//                 } catch (error) {
//                   console.log("Something went wrong", error);
//                 }
//               }
//           alert(this.state.userData);
//         }
//         else {
//           Alert.alert(responseJson);
//         }
//       }).catch((error) => {
//         console.error(error);
//       });
//   }


//   render() {
//     return (
//       // <View style={styes.imagecontainer}>
//       //   <Image style={styles.bgImage}
//       //   source={this.props.imageSource} />
//       //   {this.props.children}
//       // </View>



//       <View style={styles.container}>
//            <ImageBackground source={require('../../assets/bg1.jpg')} style={{width:'100%',height:'100%',alignItems:'center'}}>

//           <View style={styles.inputContainer}>
//             <Icon style={styles.Icon} name="user" size={25} color="#000" />
//             <TextInput style={styles.inputs}
//               placeholder="Username"
//               keyboardType="email-address"
//               underlineColorAndroid='transparent'
//               onChangeText={(username) => this.setState({ username })} />
//           </View>

//           <View style={styles.inputContainer}>
//             <Icon style={styles.Icon} name="lock" size={25} color="#000" />
//             <TextInput style={styles.inputs}
//               placeholder="Password"
//               secureTextEntry={true}
//               underlineColorAndroid='transparent'
//               onChangeText={(password) => this.setState({ password })} />
//           </View>

//           <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.UserLoginFunction}>
//             <Text style={styles.loginText}>Login</Text>
//           </TouchableHighlight>

//           <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
//             <Text>Forgot your password?</Text>
//           </TouchableHighlight>

//           <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.navigation.navigate('Signup')}>
//             <Text style={styles.loginText}>Sign UP</Text>
//           </TouchableHighlight>

//           <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.navigation.navigate('Profile')}>
//             <Text>Profile</Text>
//           </TouchableHighlight>


//           <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.navigation.navigate('Nsignup')}>
//             <Text style={styles.loginText}>Register As NGO</Text>
//           </TouchableHighlight>

//         </ImageBackground>
//       </View>


//     );
//   }
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#DCDCDC',
//   },
//   inputContainer: {
//     borderBottomColor: '#F5FCFF',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 30,
//     borderBottomWidth: 1,
//     width: 250,
//     height: 45,
//     marginBottom: 20,
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   inputs: {
//     height: 45,
//     marginLeft: 16,
//     borderBottomColor: '#FFFFFF',
//     flex: 1,
//   },
//   Icon: {
//     padding: 15,
//   },
//   inputIcon: {
//     width: 30,
//     height: 30,
//     marginLeft: 15,
//     justifyContent: 'center'
//   },
//   buttonContainer: {
//     height: 45,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//     width: 250,
//     borderRadius: 30,
//   },
//   loginButton: {
//     backgroundColor: "#00b5ec",
//   },
//   signupButton: {
//     backgroundColor: "#980953",
//   },
//   loginText: {
//     color: 'white',
//   }
// });

// export default Login;





// Working fine (first old)

// import React, { Component } from 'react';
// import { StyleSheet, Text, View, Button, Image, TextInput, TouchableHighlight, Alert, ImageBackground } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// const DismissKeyBoard = ({ children }) => (
//   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//     {children}
//   </TouchableWithoutFeedback>
// );

// class Login extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       username: '',
//       password: ''
//     }
//   }


//   UserLoginFunction = () => {
//     const { username } = this.state;
//     const { password } = this.state;

//     fetch('https://ngoapp3219.000webhostapp.com/db/user_login.php', {
//     // fetch('http://192.168.42.250/ngoapp/user_login.php', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         username: username,
//         password: password
//       })
//     }).then((response) => response.json())
//       .then((responseJson) => {
//         // this.props.navigation.push('Menu');
//         // this.props.navigation('Menu');
//         // If server response message same as Data Matched
//         if (responseJson === 'Data Matched') {
//           // ToastAndroid.show('Login Successfull' ,ToastAndroid.SHORT);
//           //Then open Profile activity and send user email to profile activity.

//           Alert.alert('success');
//           this.props.navigation.navigate('Utabs');
//         }
//         else {
//           Alert.alert(responseJson);
//         }
//       }).catch((error) => {
//         console.error(error);
//       });
//   }

//   render() {
//     return (
//       // <View style={styes.imagecontainer}>
//       //   <Image style={styles.bgImage}
//       //   source={this.props.imageSource} />
//       //   {this.props.children}
//       // </View>


//       <ImageBackground source={require('../../assets/bg1.jpg')} style={{width:'100%',height:'100%',alignItems:'center'}}>
//       <View style={styles.container}>


//           <View style={styles.inputContainer}>
//             <Icon style={styles.Icon} name="user" size={25} color="#000" />
//             <TextInput style={styles.inputs}
//               placeholder="Username"
//               keyboardType="email-address"
//               underlineColorAndroid='transparent'
//               onChangeText={(username) => this.setState({ username })} />
//           </View>

//           <View style={styles.inputContainer}>
//             <Icon style={styles.Icon} name="lock" size={25} color="#000" />
//             <TextInput style={styles.inputs}
//               placeholder="Password"
//               secureTextEntry={true}
//               underlineColorAndroid='transparent'
//               onChangeText={(password) => this.setState({ password })} />
//           </View>

//           <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.UserLoginFunction}>
//             <Text style={styles.loginText}>Login</Text>
//           </TouchableHighlight>

//           <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
//             <Text>Forgot your password?</Text>
//           </TouchableHighlight>

//           <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.navigation.navigate('Signup')}>
//             <Text style={styles.loginText}>Sign UP</Text>
//           </TouchableHighlight>
// {/* 
//           <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.navigation.navigate('Profile')}>
//             <Text>Profile</Text>
//           </TouchableHighlight>


//           <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.navigation.navigate('Nsignup')}>
//             <Text style={styles.loginText}>Register As NGO</Text>
//           </TouchableHighlight>



//           <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.props.navigation.navigate('Nsignup')}>
//             <Text style={styles.loginText}>GO TO NGO LOGIN</Text>
//           </TouchableHighlight> */}

// <Button title="Go back" onPress={() => this.props.navigation.replace('First')} />

//       </View>

//       </ImageBackground>

//     );
//   }
// }


// const styles = StyleSheet.create({
//   container: {

//     flex: 1,
//     // marginTop:80,
//     justifyContent:'center',
//     alignItems: 'center',

//     // backgroundColor: '#DCDCDC',
//   },
//   inputContainer: {
//     // borderBottomColor: '#F5FCFF',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 30,
//     // borderBottomWidth: 1,
//     width: 250,
//     height: 45,
//     marginBottom: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: 'black'
//   },
//   Icon: {
//     padding: 15,
//   },
//   inputs: {
//     height: 45,
//     marginLeft: 16,
//     borderBottomColor: '#FFFFFF',
//     flex: 1,
//   },
//   inputIcon: {
//     width: 30,
//     height: 30,
//     marginLeft: 15,
//     justifyContent: 'center'
//   },
//   buttonContainer: {
//     height: 45,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//     width: 250,
//     borderRadius: 30,
//   },
//   loginButton: {
//     width:150,
//  backgroundColor: "#980953",
//     borderWidth: 2,
//     borderColor: '#000'
//   },
//   SkipButton: {
//     height: 37,
//     marginTop: 30,
//     marginRight: '70%',
//     flexDirection: 'row-reverse',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 80,
//     borderRadius: 30,
//     opacity:20,
//     backgroundColor: '#980953',
//     borderWidth: 2,
//     borderColor: 'black',

//   },
//   signupButton: {
//     width:150,
//     backgroundColor: "skyblue",
//     borderWidth: 2,
//     borderColor: 'black'
//   },
//   loginText: {
//     color: 'white',
//   }
// });
// export default Login;