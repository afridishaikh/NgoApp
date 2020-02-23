import React, { Component } from 'react';
import { Dropdown } from 'react-native-material-dropdown'
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
// import ScrollView from 'react-native-gesture-handler' 
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
  PixelRatio,
  TouchableOpacity
} from 'react-native';
// import { black } from 'react-native-paper/lib/typescript/src/styles/colors';

// const { navigate } = this.props.navigation;
export default class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {
  
      problem:'',
      photo:'',
      location:'',
      address:'',
      mo_no:''
      // ImageSource: null,
      // data: null,
      // Image_TAG: ''
    }
  }


  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        this.setState({

          ImageSource: source,
          data: response.data

        });
      }
    });
  }


  InsertDataToServer = () => {
    const { problem } = this.state;
    const { photo } = this.state;
    const { location } = this.state;
    const { address } = this.state;
    const { mo_no } = this.state;



    //The connection And Insert
    fetch('http://192.168.42.250/ngoapp/request.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        problem:problem,
        photo:photo,
        location:location,
        address:address,
        mo_no:mo_no,

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
    let data = [{
      value: 'Food',
    }, {
      value: 'Health',
    }, {
      value: 'Blood',
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

          <View style={styles.MainContainer}>
            <ScrollView horizontal={true}>
              <View style={styles.columes} >
                <View style={styles.rows}>
                  <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>

                    <View style={styles.ImageContainer}>

                      {this.state.ImageSource === null ? <Text> Select a Photo </Text> :
                        <Image style={styles.ImageContainer} source={this.state.ImageSource} />
                      }

                    </View>

                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>

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
              onChangeText={ address => this.setState({ address })} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder="Mobile Number "
              underlineColorAndroid='transparent'
              onChangeText={Mo_no => this.setState({ Mo_no })} />
          </View>


          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.InsertDataToServer}>
            <Text style={styles.loginText}>Post A Request</Text>
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

  ImageContainer: {
    borderRadius: 10,
    width: 180,
    height: 180,
    // borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),

    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',

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
    backgroundColor: "#00b",
  },
  loginText: {
    color: 'white',
  },
  Dropdown: {
    // color:'green',
    justifyContent: 'center',
    padding: 10,
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