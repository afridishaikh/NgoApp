import React, { Component } from 'react'


//  import Routes from './src/screens/Routes'
 import Upload from './backupfiles/Try/upload'
// import Fetch from './backupfiles/Try/fetch'
export class App extends Component {
  render() {
     return <Upload/>
    //  return <Routes/>
    // return <Fetch/>
  }
}
export default App

// 0000000000000000000000000000000000000000000000000000


// //This is an example code to get Geolocation//  
// import React from 'react';
// //import react in our code. 
// import {View, Text,  StyleSheet, Image ,PermissionsAndroid,Platform} from 'react-native';
// //import all the components we are going to use.
// import Geolocation from '@react-native-community/geolocation';
 
 
// export default class App extends React.Component {
//   state = {
//     currentLongitude: 'unknown',//Initial Longitude
//     currentLatitude: 'unknown',//Initial Latitude
//  }
//  componentDidMount = () => {
//   var that =this;
//   //Checking for the permission just after component loaded
//   if(Platform.OS === 'ios'){
//     this.callLocation(that);
//   }else{
//     async function requestLocationPermission() {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
//             'title': 'Location Access Required',
//             'message': 'This App needs to Access your location'
//           }
//         )
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           //To Check, If Permission is granted
//           that.callLocation(that);
//         } else {
//           alert("Permission Denied");
//         }
//       } catch (err) {
//         alert("err",err);
//         console.warn(err)
//       }
//     }
//     requestLocationPermission();
//   }    
//  }
//  callLocation(that){
//   //alert("callLocation Called");
//     Geolocation.getCurrentPosition(
//       //Will give you the current location
//        (position) => {
//           const currentLongitude = JSON.stringify(position.coords.longitude);
//           //getting the Longitude from the location json
//           const currentLatitude = JSON.stringify(position.coords.latitude);
//           //getting the Latitude from the location json
//           that.setState({ currentLongitude:currentLongitude });
//           //Setting state Longitude to re re-render the Longitude Text
//           that.setState({ currentLatitude:currentLatitude });
//           //Setting state Latitude to re re-render the Longitude Text
//        },
//        (error) => alert(error.message),
//        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );
//     that.watchID = Geolocation.watchPosition((position) => {
//       //Will give you the location on location change
//         console.log(position);
//         const currentLongitude = JSON.stringify(position.coords.longitude);
//         //getting the Longitude from the location json
//         const currentLatitude = JSON.stringify(position.coords.latitude);
//         //getting the Latitude from the location json
//        that.setState({ currentLongitude:currentLongitude });
//        //Setting state Longitude to re re-render the Longitude Text
//        that.setState({ currentLatitude:currentLatitude });
//        //Setting state Latitude to re re-render the Longitude Text
//     });
//  }
//  componentWillUnmount = () => {
//     Geolocation.clearWatch(this.watchID);
//  }
//  render() {
//     return (
//        <View style = {styles.container}>
//           <Image
//             source={{uri:'https://png.icons8.com/dusk/100/000000/compass.png'}}
//             style={{width: 100, height: 100}}
//           />
//           <Text style = {styles.boldText}>
//              You are Here
//           </Text>
//           <Text style={{justifyContent:'center',alignItems: 'center',marginTop:16}}>
//             Longitude: {this.state.currentLongitude}
//           </Text>
//           <Text style={{justifyContent:'center',alignItems: 'center',marginTop:16}}>
//             Latitude: {this.state.currentLatitude}
//           </Text>
//        </View>
//     )
//  }
// }
// const styles = StyleSheet.create ({
//  container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent:'center',
//     marginTop: 50,
//     padding:16,
//     backgroundColor:'white'
//  },
//  boldText: {
//     fontSize: 30,
//     color: 'red',
//  }
// })

// *************************************************************
// //import liraries
// import React, { Component } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';

// // create a component
// class App extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//       <TouchableOpacity style={styles.button}>
//       <LinearGradient colors={['#43D4FF', '#38ABFD', '#2974FA']} style={styles.gradient}>
//         <Text style={styles.text}>Gradient Button</Text>
//       </LinearGradient>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.button}>
//       <LinearGradient colors={['#123456','#765332','white','red']} style={styles.gradient}>
//         <Text style={styles.text}>Gradient Button</Text>
//       </LinearGradient>
//       </TouchableOpacity>

//       </View>
//     );
//   }
// }

// // define your styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems:'center',
//     justifyContent:'center',
//   },
//   gradient: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems:'center',
//     borderRadius: 30

//   },
//   button: {
//     width: '70%',
//     height: 45,
//   },
//   text: {
//     color: 'white',
//     fontSize: 16
//   }
// });

// //make this component available to the app
// export default App;





