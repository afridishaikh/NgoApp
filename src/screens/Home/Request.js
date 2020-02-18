

import React, { Component } from 'react';
import {Dropdown} from  'react-native-material-dropdown'
import ImagePicker from 'react-native-image-picker'; 
import RNFetchBlob from 'rn-fetch-blob';
 
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
// import { black } from 'react-native-paper/lib/typescript/src/styles/colors';

// const { navigate } = this.props.navigation;
export default class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      TextInputNName: '',
       TextInputMono: '',
      TextInputAddress:'',
    }
  }

  InsertDataToServer = () => {
    const { TextInputNName } = this.state;
    const { TextInputMono } = this.state;
    const{ TextInputAddress} =this.state;

    //The connection And Insert
    fetch('http://192.168.42.250/ngoapp/user_signup.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
            name: TextInputNName,
            mo_no: TextInputMono,
            address:TextInputAddress,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson);
      }).catch((error) => {
        console.error(error);
      });
              // }).then((response) => response.json())
              // .then((responseJson) => {
              //   if(responseJson==='Register Successfully')
              //   {
              //   //ToastAndroid.show(responseJson);
              //   Alert.alert('sucess');
              //   this.props.navigation.push("login");   }
              //   else{
              //     Alert.alert('Error');
              //   }  
              // }).catch((error) => {
              //   console.error(error);
              // });
  }

  render() {
    let data=[{
          value:'Food',
        },{
          value:'Health',
        },{ 
          value:'Blood',
        }];
    return (
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.Dropdown}>
      <Dropdown 
            label='Select A Problem'
            data={data}
          />
      </View>

      <Text> Take A Photo </Text>

      <Text> Location </Text>

        {/* <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder="NGO Name "
              underlineColorAndroid='transparent'
              onChangeText={TextInputNName => this.setState({ TextInputNName })}/>
          </View> */}

          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              underlineColorAndroid='transparent'
              placeholder="Enter Address"
              // secureTextEntry={true}
              onChangeText={TextInputAddress => this.setState({ TextInputAddress })}/>
          </View>

          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder="Mobile Number "
              underlineColorAndroid='transparent'
              onChangeText={TextInputNName => this.setState({ TextInputMono })}/>
          </View>

          {/* Add City &  ngo type  */}
         
         {/* <View style={styles.Dropdown}>
          <Dropdown 
            label='Select City'
            data={data}
          /> */}
      {/* </View> */}

      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.UserLoginFunction}>
          <Text style={styles.loginText}>Post Request</Text>
        </TouchableHighlight>
     
        </ScrollView>
      </View>
       


    );
  }
}
// export default Request

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  

  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    margin: 20,
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
    backgroundColor:"#00b",
  },
  loginText: {
    color: 'white',
  },
  Dropdown:{
      // color:'green',
      justifyContent: 'center',
      padding:10,
      // color:'black',
      // backgroundColor: '#FFFFFF',
     
  },  
});

// import React, { Component } from 'react'
// import { Text, View ,StyleSheet,styles} from 'react-native'
// import {Dropdown} from  'react-native-material-dropdown'
// // import reactNativeModalDropdown from 'react-native-modal-dropdown'
// export class Request extends Component {
//   render() {
//     let data=[{
//     value:'Anand',
//   },{
//     value:'Borsad',
//   },{ 
//     value:'Surat',
//   }];

//     return (
      

//         <Dropdown 
//         label='Select City'
//         data={data}
//         />

//     );
//   }
// }
// export default Request 


// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Button,
//   TouchableHighlight,
//   Image,
//   Alert,
//   ScrollView
// } from 'react-native';
// import {Dropdown} from  'react-native-material-dropdown'

// // const { navigate } = this.props.navigation;
// export default class LoginView extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: '',
//       username: '',
//       mo_no: '',
//       address: '',
//       city: '',
//       password: '',
//     }
//   }
//   onClickListener = (viewId) => {
//     Alert.alert("Alert", "Button pressed " + viewId);
//   }


//   render() {
//     let data=[{
//       value:'Food',
//     },{
//       value:'Clothes',
//     },{ 
//       value:'Blood',
//     },
//   ];

//     return (
//       //  <View style={styles.container}>

//          <ScrollView>

        
//       <Dropdown
//       //  textColor="red"
//        itemColor="blue"
//        dropdownPosition="2"
//             label='Select A Problem'
//             data={data}
//           />


//         </ScrollView>
//       // </View>

//       <View style={styles.inputContainer}>
//       <TextInput style={styles.inputs}
//         underlineColorAndroid='transparent'
//         placeholder="Enter Address"
//         // secureTextEntry={true}
//         onChangeText={TextInputAddress => this.setState({ TextInputAddress })}/>

//     </View>
   
//    <View style={styles.Dropdown}>
//     <Dropdown 
//       label='Select City'
//       data={data}
//     />
// </View>

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
//     backgroundColor: 'red'// "#00b5ec",
//   },
//   loginText: {
//     color: 'white',
//   },
//   Dropdown:{
//     color:'green',
//     justifyContent: 'center',
//     padding:10,
//     // color:'black',
//     // backgroundColor: '#FFFFFF',
   
// },  
// });
