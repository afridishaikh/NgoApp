// //MY MAIN
import React, { Component } from 'react'
import Routes from './src/screens/Routes'
import Home from './src/screens/Home/Card'
export class App extends Component {
  render() {

    return <Routes />
    // return <Home />
  }
}
export default App

 
// import React, {Component} from 'react';
// import {View,Text,Button} from 'react-native'; 
// import RNUpiPayment from 'react-native-upi-pay';
 
// /*
//     npm install react-native-upi-pay
//     react-native link
// */
 
// export default class App extends Component{
//     constructor(props){
//         super();
//         this.state={
//             Status:"", 
//             txnId:"",
//             GOOGLE_PAY:'GOOGLE_PAY',
//             PHONEPE:'PHONEPE',
//             PAYTM:'PAYTM',
//             message:""
//         }
//     }
//     render(){
//         that=this;
//         function floo(paymentApp){
//             RNUpiPayment.initializePayment({
//                 vpa: 'something@bank',  		//your upi address like 12345464896@okhdfcbank
//                 payeeName: ' abc',   			// payee name 
//                 amount: '1',				//amount
//                 transactionNote:'Testing Upi',		//note of transaction
//                 transactionRef: 'aasf-332-aoei-fn'	//some refs to aknowledge the transaction
//             },paymentApp,successCallback,failureCallback);
//         }
//         function failureCallback(data){
//             console.log(data)
//             // in case no action taken
//             if (data['status']=="FAILURE"){
//                 that.setState({Status:"FAILURE"})
//                 that.setState({message:data['message']});
//             }
//             // in case of googlePay
//             else if (data['Status']=="FAILURE"){
//                 that.setState({Status:"FAILURE"})
//                 that.setState({message:"app closed without doing payment"});;
//             }
//             // in case of phonepe
//             else if (data['Status']=="Failed"){
//                 that.setState({Status:"FAILURE"});
//                 that.setState({message:"app closed without doing payment"});
//             }
//             // in case of phonepe
//             else if(data['Status']=="Submitted"){
//                 that.setState({Status:"FAILURE"});
//                 that.setState({message:"transaction done but pending"});
//             }
//             // any other case than above mentioned
//             else{
//                 that.setState({Status:"FAILURE"});
//                 that.setState({message:data[Status]});
//             }
//         }
//         function successCallback(data){
//             //
//             console.log(data);
//             that.setState({Status:"SUCCESS"});
//             that.setState({txnId:data['txnId']});
//             that.setState({message:"Succccessfull payment"});
//         }
//         return (
//         <View style={{alignItems:"center",justifyContent:"center",flex:1}}>
//         <View style={{flexDirection:'row',padding:5}}>
//             <Button
//             title="Google pay"
//             onPress={() => {floo(this.state.GOOGLE_PAY)}}
//             />
 
//             <Button
//             title="Phone pe"
//             onPress={() => {floo(this.state.PHONEPE)}}
//             />
//             <Button
//             title="PAYTM"
//             onPress={() => {floo(this.state.PAYTM)}}
//             />
//         </View>
 
//         <Text>{this.state.Status+" "+this.state.txnId}</Text>
//         <Text>{this.state.message}</Text>
//         </View>
//         );
//     }
// }
 
 
// // TODO: What to do with the module?
// RNReactNativeUpiPay;


// import React from 'react';
// import { StyleSheet, Text, View, Image, TextInput, Dimensions, ScrollView, 
// CheckBox, TouchableOpacity } from 'react-native';
// // import logo from './image/Logo.png'

// const { width: WIDTH } = Dimensions.get('window')

// export default class App extends React.Component {
//   constructor(){
//     super();
//     this.state={
//       check:false,
//       email: '',
//     };
   
//   }



// //   validates = () => { 

// //     let text = this.state.email; 
// //     let emailError = this.state.emails;
// //     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ; 
// //     if(reg.test(text) === false) 
// //     { 
// //     console.warn("Invalid email")
// //     this.setState({email:text}) 
// //     return false; 
// //     } 
// //     else { 
// //     this.setState({email:text}) 
// //     console.log("Email is Correct"); 
// //     } 
// // } 

// validate = (text) => {
//   console.log(text);
//   let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   if (reg.test(text) === false) {
//     console.log("Email is Not Correct");
//     this.setState({ email: text })
//     return false;
//   }
//   else {
//     this.setState({ email: text })
//     console.log("Email is Correct");
//   }
// }

//   render() {
//     return (
//       <TextInput
//       placeholder="Email ID"
//       onChangeText={(text) => this.validate(text)}
//       value={this.state.email}
//     />
  

// );
//   }
// }



// ////WORKING
// // 'use strict';
// // import React, {Component}  from 'react';
// // import {View, Text, TextInput,StyleSheet, TouchableHighlight} from 'react-native';
// // import ValidationComponent from 'react-native-form-validator';
// // import Icon from 'react-native-vector-icons/FontAwesome';



// // // export class App extends Component {
// // //   render() {

// // //     return <FormTest />
// // //     // return <Login />
// // //   }
// // // }
// // // export default App



// // export default class FormTest extends ValidationComponent {

// //   constructor(props) {
// //     super(props);
// //     // this.state = {name : "My name", email: "tibtib@gmail.com", number:"56", date: "2017-03-01"};
// //     this.state = {       
// //     Name: '',
// //     InputMono: '',
// //     InputEmail: '',
// //     InputUsername: '',
// //     InputPassword: '' };
// //   }

// //   _onPressButton = () => {
// //     this.validate({
// //     Name: { minlength: 6, maxlength: 7, required: true },
// //     // InputEmail: { email: true ,required: true},
// //     // InputMono: { numbers: true ,required: true},
// //     // InputUsername: { minlength: 3, maxlength: 7, required: true },
// //     // InputPassword: { minlength: 6, maxlength: 20, required: true },
// //     });
    
// //     const { Name } = this.state;
// //     const { TextInputMono } = this.state;
// //     const { TextInputEmail } = this.state;
// //     const { TextInputUsername } = this.state;
// //     const { TextInputPassword } = this.state;

// //     //The connection And Insert
// //       fetch('https://ngoapp.000webhostapp.com/ngoapp/signup.php', {
    
// //       method: 'POST',
// //       headers: {
// //         'Accept': 'application/json',
// //         'Content-Type': 'application/json'
// //       },
// //       body: JSON.stringify({
// //         name: Name,
// //         mo_no: TextInputMono,
// //         email: TextInputEmail,
// //         username: TextInputUsername,
// //         password: TextInputPassword
// //       })
// //     }).then((response) => response.json())
// //       .then((responseJson) => {
// //         Alert.alert(responseJson);
// //         this.props.navigation.goBack();
// //       }).catch((error) => {
// //         console.error(error);
// //       });
// //     }
// //   render() {
// //       return (
// //         <View>

          
// //           <View style={styles.inputContainer}>
// //           <Icon style={styles.Icon} name="pencil" size={25} color="grey" />
// //             <TextInput style={styles.inputs}
// //               placeholder="Enter Your Full Name."
// //               // placeholderTextColor='#023e56'
// //               underlineColorAndroid='transparent'
// //               ref="Names"
// //               onChangeText={Name => this.setState({ Name })} value={this.state.Name} />
// //           </View>

// //           <Text>
// //             {this.getErrorMessages()}
// //           </Text>



// //           <TextInput ref="name" onChangeText={(name) => this.setState({name})} value={this.state.name} />
// //           <TextInput ref="email" onChangeText={(email) => this.setState({email})} value={this.state.email} />
// //           <TextInput ref="number" onChangeText={(number) => this.setState({number})} value={this.state.number} />
// //           <TextInput ref="date" onChangeText={(date) => this.setState({date})} value={this.state.date} />
// //           {this.isFieldInError('date') && this.getErrorsInField('date').map(errorMessage => <Text>{errorMessage}</Text>) }

// //           <TouchableHighlight onPress={this._onPressButton}>
// //             <Text>Submit</Text>
// //           </TouchableHighlight>

// //           <Text>
// //             {this.getErrorMessages()}
// //           </Text>
// //         </View>
// //       );
// //   }

// // }



// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     // marginBottom:50,
// //     marginTop:10

// //     // backgroundColor: '#DCDCDC',
// //   },
// //     container2: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginBottom:50,
// //     marginTop:10

// //     // backgroundColor: '#DCDCDC',
// //   },
// //   inputContainer: {
// //     // borderBottomColor: '#F5FCFF',
// //     backgroundColor: '#FFFFFF',
// //     borderRadius: 30,
// //     // borderBottomWidth: 1,
// //     width: 250,
// //     height: 45,
// //     marginBottom: 20,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     borderWidth: 2,
// //     borderColor: 'black'
// //   },
// //   Icon: {
// //     padding: 12,
// //   },
// //   inputs: {
// //     height: 45,
// //     marginLeft: 16,
// //     borderBottomColor: '#FFFFFF',
// //     flex: 1,
// //   },
// //   inputIcon: {
// //     width: 30,
// //     height: 30,
// //     marginLeft: 15,
// //     justifyContent: 'center'
// //   },
// //   buttonContainer: {
// //     height: 45,
// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginBottom: 20,
// //     width: 250,
// //     borderRadius: 30,
// //   },
// //   loginButton: {
// //     width:150,
// //  backgroundColor: "#980953",
// //     borderWidth: 2,
// //     borderColor: '#000'
// //   },
// //   SkipButton: {
// //     height: 37,
// //     marginTop: 30,
// //     marginRight: '70%',
// //     flexDirection: 'row-reverse',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     width: 80,
// //     borderRadius: 30,
// //     opacity:20,
// //     backgroundColor: '#980953',
// //     borderWidth: 2,
// //     borderColor: 'black',
    
// //   },
// //   signupButton: {
// //     width:150,
// //     backgroundColor: "skyblue",
// //     borderWidth: 2,
// //     borderColor: 'black'
// //   },
// //   loginText: {
// //     color: 'white',
// //   }
// // });



