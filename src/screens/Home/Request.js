// //Sending data with NULL so Trackimng can Done
import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  PermissionsAndroid,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
  ImageBackground,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  animating
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Dropdown } from 'react-native-material-dropdown';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid : '',
      ImageSource: null,
      data: null,
      latitude: null,
      longitude: null,
      Problem: '',
      // Location: '',
      Address: '',
      Mo_no: '',
      loading:false
    }
  }

  //To select Photo
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    }
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


  //Function To get current location on map
  componentDidMount = () => {
  
      AsyncStorage.getItem('username').then(value =>
        this.setState({ userid: value})
      );


    //For Grant Location Service
    var that = this;
    //Checking for the permission just after component loaded
    if (Platform.OS === 'ios') {
      this.gotToMyLocation(that);
    } else {
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
            'title': 'Location Access Required',
            'message': 'This App needs to Access your location'
          }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            that.gotToMyLocation(that);
          } else {
            alert("Permission Denied");
          }
        } catch (err) {
          alert("err", err);
          console.warn(err)
        }
      }
      requestLocationPermission();
    }
  }
  gotToMyLocation(that) {
    console.log('gotToMyLocation is called')
    that.watchID = Geolocation.getCurrentPosition(
      ({ coords }) => {
        console.log("curent location: ", coords)
        console.log(this.map);
        if (this.map) {
          console.log("curent location: ", coords)

          this.setState({ latitude: coords.latitude });
          this.setState({ longitude: coords.longitude });

          this.map.animateToRegion({
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          })
        }
      },
      //   (error) => alert('Error: Are location services on?'),
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }

  //Functio That will send data to server
  InsertDataToServer = () => {
     //   VALIDATION
     let phoneno = /^[0]?[6789]\d{9}$/;
     // console.warn(this.state.Name)
       if(this.state.userid==''||this.state.Problem=='' || this.state.Address=='' || this.state.Mo_no=='')  {
         Alert.alert('Input Field should not be Empty !')
       }
    
       else if(this.state.ImageSource==null || this.state.data==null) 
       { 
       Alert.alert('You must Upload Your NGO image !');
       return false; 
       } 
       else if(this.state.latitude==null || this.state.longitude==null) 
       { 
       Alert.alert('Please turn ON Your GPS !');
       return false; 
       } 
       else if(phoneno.test(this.state.Mo_no) === false) 
       { 
       Alert.alert('Mobile Number is Invalid !'); 
       return false; 
       } 
        else { 
          this.setState({
            loading: true,
        });
    RNFetchBlob.fetch('POST', 'https://ngoapp3219.000webhostapp.com/db/request.php', {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [
      { name: 'username', data: this.state.userid },
      { name: 'problem', data: this.state.Problem },
      { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },

      { name: 'latitude', data: JSON.stringify(this.state.latitude)},
      { name: 'longitude', data: JSON.stringify(this.state.longitude)},

      { name: 'address', data: this.state.Address },
      { name: 'mo_no', data: this.state.Mo_no },

    ]).then((resp) => {
      var tempMSG = resp.data;
      tempMSG = tempMSG.replace(/\"/g, "");
      Alert.alert(tempMSG);
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
    let Problem = [{
      value: 'Food',
    }, {
      value: 'Health',
    }, {
      value: 'Clothes',
    }, {
      value: 'Poverty',
    }, {
      value: 'Blood'
    }];

    return (
      // <SafeAreaView style={styles.container}>
       <View style={styles.container}>
        <ScrollView style={{ padding: 25 }} >

          
        {this.state.loading &&
         <ActivityIndicator
               animating = {animating}
               color = '#bc2b78'
               size = "large"
               loading={this.state.loading}
               />
    }

          <View style={styles.Dropdown}>
            <Dropdown
              label='Choose Problem'
              data={Problem}
              onChangeText={Problem => this.setState({ Problem })}
            />
          </View>

          {/* <Text style={styles.text}> lol: {this.state.userid} </Text> */}

          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            <View style={styles.ImageContainer}>
              
              {this.state.ImageSource === null ? <Icon style={styles.Icon} name="camera" size={50} color="#000" /> :
                <Image style={styles.ImageContainer} source={this.state.ImageSource} />
              }
            </View>
          </TouchableOpacity>


          <View style={styles.ImageContainer}>
            <MapView
              ref={(map) => { this.map = map; }}
              provider={PROVIDER_GOOGLE}
              style={{ height: '100%', width: '100%' }}
              //  annotations={markers} 
              showsUserLocation={true}
              showsMyLocationButton={true}
              initialRegion={this.state.region}
              onRegionChangeComplete={this.onRegionChange}
            />
         
            <TouchableOpacity onPress={this.gotToMyLocation = this.gotToMyLocation.bind(this)} style={{
              width: 45, height: 45,
              position: "absolute", bottom: 10, right: 10, borderRadius: 30, borderColor: 'black',
              borderWidth: 2, backgroundColor: "#d2d2d2",
            }}>
              <Icon style={{padding:9}} size={25} name='location-arrow' color='blue'/>
            </TouchableOpacity>
          </View>


          <Text>{(JSON.stringify(this.state.latitude))},{(JSON.stringify(this.state.longitude))} </Text>



          <View style={styles.inputContainer}>
            <Icon style={styles.Icon} name="map-marker" size={25} color="#000" />
            <TextInput style={styles.inputs}
              placeholder="Address"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={Address => this.setState({ Address })} />
          </View>

          <View style={styles.inputContainer}>
            <Icon style={styles.Icon} name="mobile" size={30} color="#000" />
            <TextInput style={styles.inputs}
              keyboardType="numeric"
              underlineColorAndroid='transparent'
              placeholder="Mobile Number"
              maxLength={10}
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

const styles = StyleSheet.create({
  mapcontainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    padding:10,
    // margin:40,
    alignItems: 'center',
    // justifyContent: 'center',
    alignContent:'center'
    // backgroundColor: '#FFF8E1',
  },
  inputContainer: {
    width: 300,
    height: 50,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'black',
    // backgroundColor:'grey',
    borderColor: 'purple',
    borderWidth: 2,
    borderRadius: 23,
  },
  Dropdown: {
    height: 60,
    justifyContent: 'center',
    borderColor: 'purple',
    borderBottomColor: 'black',
    borderWidth: 2,
    borderRadius: 23,
    padding: 10
  },
  Icon: {
    padding: 15,
  },
  inputs: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    justifyContent: 'center',
    color: 'blue',
    // fontFamily:'arial',
    alignContent: "center",
  },

  ImageContainer: {
    borderRadius: 10,
    width: 300,
    height: 200,
    // borderColor: '#9B9B9B',
    borderWidth: 10 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3641',
    backgroundColor: 'white',
    marginTop: 20,
    marginBottom: 25
  },

  TextInputStyle: {
    textAlign: 'center',
    height: 40,
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#028b53',
    marginTop: 20
  },

  button: {
    width: '80%',
    backgroundColor: '#00BCD4',
    borderRadius: 7,
    marginTop: 20
  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    padding: 10
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
    backgroundColor: 'red'// "#00b5ec",
  },
  loginText: {
    color: 'white',
  }

});




//PERFECT 
// import React, { Component, useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Button,
//   TouchableHighlight,
//   Image,
//   Alert,
//   PermissionsAndroid,
//   ScrollView,
//   TouchableOpacity,
//   PixelRatio,
//   ImageBackground,
//   Platform,
//   SafeAreaView,
//   ActivityIndicator,
// } from 'react-native';

// import AsyncStorage from '@react-native-community/async-storage';

// import Geolocation from '@react-native-community/geolocation';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

// import { Dropdown } from 'react-native-material-dropdown';
// import ImagePicker from 'react-native-image-picker';
// import RNFetchBlob from 'rn-fetch-blob';
// // import Map from './map'
// import Icon from 'react-native-vector-icons/FontAwesome';

// export default class LoginView extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {

//       userid : '',
  
//       ImageSource: null,
//       data: null,

//       latitude: null,
//       longitude: null,

//       Problem: '',
//       Location: '',
//       Address: '',
//       Mo_no: '',
//     }
//   }

  


//   //To select Photo
//   selectPhotoTapped() {
//     const options = {
//       quality: 1.0,
//       maxWidth: 500,
//       maxHeight: 500,
//       storageOptions: {
//         skipBackup: true
//       }
//     }
//     ImagePicker.showImagePicker(options, (response) => {
//       console.log('Response = ', response);
//       if (response.didCancel) {
//         console.log('User cancelled photo picker');
//       }
//       else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       }
//       else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//       }
//       else {
//         let source = { uri: response.uri };
//         this.setState({
//           ImageSource: source,
//           data: response.data
//         });
//       }
//     });
//   }


//   //Function To get current location on map
//   componentDidMount = () => {


//       //To store AsyncStorage value in state.
//       AsyncStorage.getItem('username').then(value =>
//         //AsyncStorage returns a promise so adding a callback to get the value
//         this.setState({ userid: value})
//         //Setting the value in Text  
//       );


//     //For Grant Location Service
//     var that = this;
//     //Checking for the permission just after component loaded
//     if (Platform.OS === 'ios') {
//       this.gotToMyLocation(that);
//     } else {
//       async function requestLocationPermission() {
//         try {
//           const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
//             'title': 'Location Access Required',
//             'message': 'This App needs to Access your location'
//           }
//           )
//           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             //To Check, If Permission is granted
//             that.gotToMyLocation(that);
//           } else {
//             alert("Permission Denied");
//           }
//         } catch (err) {
//           alert("err", err);
//           console.warn(err)
//         }
//       }
//       requestLocationPermission();
//     }
//   }
//   gotToMyLocation(that) {
//     console.log('gotToMyLocation is called')
//     that.watchID = Geolocation.getCurrentPosition(
//       ({ coords }) => {
//         console.log("curent location: ", coords)
//         console.log(this.map);
//         if (this.map) {
//           console.log("curent location: ", coords)

//           this.setState({ latitude: coords.latitude });
//           this.setState({ longitude: coords.longitude });

//           this.map.animateToRegion({
//             latitude: coords.latitude,
//             longitude: coords.longitude,
//             latitudeDelta: 0.005,
//             longitudeDelta: 0.005
//           })
//         }
//       },
//       //   (error) => alert('Error: Are location services on?'),
//       (error) => alert(error.message),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     )
//   }

//   //Functio That will send data to server
//   InsertDataToServer = () => {
//     RNFetchBlob.fetch('POST', 'https://ngoapp3219.000webhostapp.com/db/request.php', {
//       Authorization: "Bearer access-token",
//       otherHeader: "foo",
//       'Content-Type': 'multipart/form-data',
//     }, [
//       { name: 'username', data: this.state.userid },
//       { name: 'problem', data: this.state.Problem },
//       { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },

//       { name: 'latitude', data: JSON.stringify(this.state.latitude)},
//       { name: 'longitude', data: JSON.stringify(this.state.longitude)},

//       { name: 'address', data: this.state.Address },
//       { name: 'mo_no', data: this.state.Mo_no },

//     ]).then((resp) => {
//       var tempMSG = resp.data;
//       // tempMSG = tempMSG.replace(/^"|"$/g, '');
//       tempMSG = tempMSG.replace(/\"/g, "");
//       Alert.alert(tempMSG);
//     }).catch((error) => {
//       console.error(error);
//     });

//   }



//   render() {
//     let Problem = [{
//       value: 'Food',
//     }, {
//       value: 'Health',
//     }, {
//       value: 'Clothes',
//     }, {
//       value: 'Poverty',
//     }, {
//       value: 'Blood'
//     }];

//     return (
//       // <SafeAreaView style={styles.container}>
//        <View style={styles.container}>
//         <ScrollView style={{ padding: 25 }} >

//           <View style={styles.Dropdown}>
//             <Dropdown
//               label='Choose Problem'
//               data={Problem}
//               onChangeText={Problem => this.setState({ Problem })}
//             />
//           </View>

//           {/* <Text style={styles.text}> lol: {this.state.userid} </Text> */}

//           <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
//             <View style={styles.ImageContainer}>
              
//               {this.state.ImageSource === null ? <Icon style={styles.Icon} name="camera" size={50} color="#000" /> :
//                 <Image style={styles.ImageContainer} source={this.state.ImageSource} />
//               }
//             </View>
//           </TouchableOpacity>


//           <View style={styles.ImageContainer}>
//             <MapView
//               ref={(map) => { this.map = map; }}
//               provider={PROVIDER_GOOGLE}
//               style={{ height: '100%', width: '100%' }}
//               //  annotations={markers} 
//               showsUserLocation={true}
//               showsMyLocationButton={true}
//               initialRegion={this.state.region}
//               onRegionChangeComplete={this.onRegionChange}
//             />
         
//             <TouchableOpacity onPress={this.gotToMyLocation = this.gotToMyLocation.bind(this)} style={{
//               width: 45, height: 45,
//               position: "absolute", bottom: 10, right: 10, borderRadius: 30, borderColor: 'black',
//               borderWidth: 2, backgroundColor: "#d2d2d2",
//             }}>
//               <Icon style={{padding:9}} size={25} name='location-arrow' color='blue'/>
//             </TouchableOpacity>
//           </View>


//           <Text>{(JSON.stringify(this.state.latitude))},{(JSON.stringify(this.state.longitude))} </Text>



//           <View style={styles.inputContainer}>
//             <Icon style={styles.Icon} name="map-marker" size={25} color="#000" />
//             <TextInput style={styles.inputs}
//               placeholder="Address"
//               keyboardType="email-address"
//               underlineColorAndroid='transparent'
//               onChangeText={Address => this.setState({ Address })} />
//           </View>

//           <View style={styles.inputContainer}>
//             <Icon style={styles.Icon} name="mobile" size={30} color="#000" />
//             <TextInput style={styles.inputs}
//               keyboardType="numeric"
//               underlineColorAndroid='transparent'
//               placeholder="Mobile Number"
//               onChangeText={Mo_no => this.setState({ Mo_no })} />
//           </View>

//           <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.InsertDataToServer}>
//             <Text style={styles.loginText}>Post A Request</Text>
//           </TouchableHighlight>
//         </ScrollView>

//          </View>
    
//     );
//   }
// }

// const styles = StyleSheet.create({
//   mapcontainer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   container: {
//     flex: 1,
//     padding:10,
//     // margin:40,
//     alignItems: 'center',
//     // justifyContent: 'center',
//     alignContent:'center'
//     // backgroundColor: '#FFF8E1',
//   },
//   inputContainer: {
//     width: 300,
//     height: 50,
//     marginBottom: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomColor: 'black',
//     // backgroundColor:'grey',
//     borderColor: 'purple',
//     borderWidth: 2,
//     borderRadius: 23,
//   },
//   Dropdown: {
//     height: 60,
//     justifyContent: 'center',
//     borderColor: 'purple',
//     borderBottomColor: 'black',
//     borderWidth: 2,
//     borderRadius: 23,
//     padding: 10
//   },
//   Icon: {
//     padding: 15,
//   },
//   inputs: {
//     flex: 1,
//     paddingTop: 10,
//     paddingRight: 10,
//     paddingBottom: 10,
//     paddingLeft: 0,
//     justifyContent: 'center',
//     color: 'blue',
//     // fontFamily:'arial',
//     alignContent: "center",
//   },

//   ImageContainer: {
//     borderRadius: 10,
//     width: 300,
//     height: 200,
//     // borderColor: '#9B9B9B',
//     borderWidth: 10 / PixelRatio.get(),
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#3641',
//     backgroundColor: 'white',
//     marginTop: 20,
//     marginBottom: 25
//   },

//   TextInputStyle: {
//     textAlign: 'center',
//     height: 40,
//     width: '80%',
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#028b53',
//     marginTop: 20
//   },

//   button: {
//     width: '80%',
//     backgroundColor: '#00BCD4',
//     borderRadius: 7,
//     marginTop: 20
//   },

//   TextStyle: {
//     color: '#fff',
//     textAlign: 'center',
//     padding: 10
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
//   }

// });
