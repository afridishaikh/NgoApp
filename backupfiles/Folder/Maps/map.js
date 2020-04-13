//Working Fine
import React, { Component } from 'react';
import {
   View,
   StyleSheet,
   Dimensions,
   PermissionsAndroid,
   Button,
   Text,
   ActivityIndicator,
   TextInput,
   TouchableOpacity,
   Alert
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import openMap from 'react-native-open-maps';
import RNFetchBlob from 'rn-fetch-blob';

export default class map extends Component {

   constructor(props) {
      super(props);
      this.state = {
         latitude: null,
         longitude: null,
      }
   }

   componentDidMount = () => {
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





    // _goToYosemite() {

    //   openMap({latitude: this.state.latitude, longitude: this.state.longitude});
    // }


   InsertDataToServer = () => {
      console.warn(this.state.latitude)
   //    fetch('https://ngoapp3219.000webhostapp.com/db/map.php', {
   //       method: 'POST',
   //       headers: {
   //          'Accept': 'application/json',
   //          'Content-Type': 'application/json',
   //       },
   //       body: JSON.stringify({
   //          latitude: this.state.latitude,
   //          longitude: this.state.longitude,
   //       })

   //    }).then((response) => response.json())
   //       .then((responseJson) => {
   //          // Showing response message coming from server after inserting records.
   //          Alert.alert(responseJson);
   //       }).catch((error) => {
   //          console.error(error);
   //       });
   // }

   RNFetchBlob.fetch('POST', 'https://ngoapp3219.000webhostapp.com/db/map.php', {
       Authorization: "Bearer access-token",
       otherHeader: "foo",
       'Content-Type': 'multipart/form-data',
      //  body: JSON.stringify({
      //    latitude: this.state.latitude,
      //    longitude: this.state.longitude,
      // })
   }, [
      //  { name: 'latitude', data:JSON.stringify(this.state.latitude)},
      { name: 'latitude', data: JSON.stringify(this.state.latitude)},
      
      //  { name: 'longitude', data:this.state.longitude},
       { name: 'longitude', data: JSON.stringify(this.state.longitude)},


   

      //  { name: 'location', data: this.state.Location },
      //  { name: 'address', data: this.state.Address },
      //  { name: 'mo_no', data: this.state.Mo_no },

         ]).then((resp) => {
             var tempMSG = resp.data;
             tempMSG = tempMSG.replace(/^"|"$/g, '');
             Alert.alert(tempMSG);
         }).catch((error) => {
             console.error(error);
         });

     }


   render() {
      return (
         <View style={styles.container}>
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
               width: 60, height: 60,
               position: "absolute", bottom: 20, right: 20, borderRadius: 30, backgroundColor: "#d2d2d2"
            }}>
               {/* <Image
            style={{ width: 40, height: 40 }}
            source={Images.myLocation}
          /> */}
            </TouchableOpacity>


            <Text>{(JSON.stringify(this.state.latitude))},{(JSON.stringify(this.state.longitude))} </Text>

            {/* <Text>{(JSON.stringify(Object.values((this.state.co))))} </Text> */}
{/* 
            <Button
        color={'#bdc3c7'}
        onPress={this._goToYosemite}
        title="Click To Open Maps 🗺" /> */}


            <Button title='post' onPress={this.InsertDataToServer} />


         </View>

      )
   }
}

const styles = StyleSheet.create({
   container: {
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
});





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


// import React, { useState, useEffect } from 'react';
// import {
//    View,
//    StyleSheet,
//    Dimensions,
//    PermissionsAndroid,
//    Button,
//    Text,
//    ActivityIndicator,
//    TextInput
// } from 'react-native';

// import Geolocation from '@react-native-community/geolocation';
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

// const intialState = {
//    latitude: null,
//    longitude: null,
//    latitudeDelta: 0.0040,
//    longitudeDelta: 0.0035,
// }

// const App = () => {
//    const [currentPosition, setCurrentPosition] = useState(intialState);

//    useEffect(() => {
//       Geolocation.getCurrentPosition(
//          position => {
//             //  alert(JSON.stringify(position))
//             console.log(JSON.stringify(position))
//             const { latitude, longitude } = position.coords;
//             setCurrentPosition({
//                ...currentPosition,
//                latitude,
//                longitude
//             })
//          },
//          //  error => this.setState({error: error.message}),
//          error => alert(error.message),
//          { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 }
//       );
//    }, [])
//    return currentPosition.latitude ? (
//       <View style={styles.container}>
//          <MapView
//             provider={PROVIDER_GOOGLE} // remove if not using Google Maps
//             style={styles.map}
//             showsUserLocation
//             initialRegion={currentPosition}
//          >
//             {/* <Marker coordinate={this.state} /> */}

//          </MapView>
//          <View>
//          {/* <Button title='Show me number' onpress={alert(JSON.stringify(currentPosition))} /> */}
//           </View>
//           <Text> latitude : {(JSON.stringify(currentPosition.latitude))} longitude: {(JSON.stringify(currentPosition.longitude))}</Text>

//           {/* <TextInput title= {(JSON.stringify(currentPosition.latitude))} /> */}

//       </View>
//    )
//       :
//       <ActivityIndicator style={{ flex: 1 }} animating size="large" />
// }


// const styles = StyleSheet.create({
//    container: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       justifyContent: 'flex-end',
//       alignItems: 'center',
//    },
//    map: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//    },
// });
// export default App;

// 0000000000000000000000000000000000000000000000000000

// /*This is an Example of React Native Map*/
// import React from 'react';
// import { StyleSheet, Text, View, TextInput } from 'react-native';
// import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';



// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       Clatitude: 22.6761,
//       Clongitude: 72.925821,
//       latitudeDelta: 1.555,
//       longitudeDelta: 1.555,
//       error: null
//     };
//   }

//   componentDidMount() {
//     Geolocation.getCurrentPosition(
//       position => {
//         this.setState({
//           Clatitude: position.coords.latitude,
//           Clongitude: position.coords.longitude,
//           error: null
//         });
//       }, error => this.setState({ error: error.message }),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 });

//   }

//   render() {
//     // var mapStyle=[{"elementType": "geometry", "stylers": [{"color": "#242f3e"}]},{"elementType": "labels.text.fill","stylers": [{"color": "#746855"}]},{"elementType": "labels.text.stroke","stylers": [{"color": "#242f3e"}]},{"featureType": "administrative.locality","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "poi","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "poi.park","elementType": "geometry","stylers": [{"color": "#263c3f"}]},{"featureType": "poi.park","elementType": "labels.text.fill","stylers": [{"color": "#6b9a76"}]},{"featureType": "road","elementType": "geometry","stylers": [{"color": "#38414e"}]},{"featureType": "road","elementType": "geometry.stroke","stylers": [{"color": "#212a37"}]},{"featureType": "road","elementType": "labels.text.fill","stylers": [{"color": "#9ca5b3"}]},{"featureType": "road.highway","elementType": "geometry","stylers": [{"color": "#746855"}]},{"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"color": "#1f2835"}]},{"featureType": "road.highway","elementType": "labels.text.fill","stylers": [{"color": "#f3d19c"}]},{"featureType": "transit","elementType": "geometry","stylers": [{"color": "#2f3948"}]},{"featureType": "transit.station","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "water","elementType": "geometry","stylers": [{"color": "#17263c"}]},{"featureType": "water","elementType": "labels.text.fill","stylers": [{"color": "#515c6d"}]},{"featureType": "water","elementType": "labels.text.stroke","stylers": [{"color": "#17263c"}]}];
//     return (

//       <View style={styles.container}>

//         <MapView
//           style={styles.map}
//           showsUserLocation={true}
//           showsMyLocationButton={true}
//           followUserLocation={true}
//           initialRegion={{
//             latitude: this.state.Clatitude,
//             longitude: this.state.Clongitude,
//             latitudeDelta: 0.009,
//             longitudeDelta: 0.004,
//           }
//           }
//         // customMapStyle={mapStyle}
//         >
//           <Marker
//             draggable
//             coordinate={{
//               latitude: this.state.Clatitude,
//               longitude: this.state.Clongitude,
//             }}
//             onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
//             title={'Test Marker'}
//             description={'This is a description of the marker'}
//           />
//         </MapView>
//         <Text> lol: {JSON.stringify(this.state.Clatitude,this.state.Clongitude)}</Text>
//       </View>

//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//   },
//   map: {

//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
// });


// /*This is an Example of React Native Map*/
// import React from 'react';
// import { StyleSheet, Text, View, TextInput } from 'react-native';
// import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';



// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       Clatitude: 22.6761,
//       Clongitude: 72.925821,
//       latitudeDelta: 1.555,
//       longitudeDelta: 1.555,
//       error: null
//     };
//   }

//   componentDidMount() {
//     Geolocation.getCurrentPosition(
//       position => {
//         this.setState({
//           Clatitude: position.coords.latitude,
//           Clongitude: position.coords.longitude,
//           error: null
//         });
//       }, error => this.setState({ error: error.message }),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 });

//   }

//   render() {
//     // var mapStyle=[{"elementType": "geometry", "stylers": [{"color": "#242f3e"}]},{"elementType": "labels.text.fill","stylers": [{"color": "#746855"}]},{"elementType": "labels.text.stroke","stylers": [{"color": "#242f3e"}]},{"featureType": "administrative.locality","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "poi","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "poi.park","elementType": "geometry","stylers": [{"color": "#263c3f"}]},{"featureType": "poi.park","elementType": "labels.text.fill","stylers": [{"color": "#6b9a76"}]},{"featureType": "road","elementType": "geometry","stylers": [{"color": "#38414e"}]},{"featureType": "road","elementType": "geometry.stroke","stylers": [{"color": "#212a37"}]},{"featureType": "road","elementType": "labels.text.fill","stylers": [{"color": "#9ca5b3"}]},{"featureType": "road.highway","elementType": "geometry","stylers": [{"color": "#746855"}]},{"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"color": "#1f2835"}]},{"featureType": "road.highway","elementType": "labels.text.fill","stylers": [{"color": "#f3d19c"}]},{"featureType": "transit","elementType": "geometry","stylers": [{"color": "#2f3948"}]},{"featureType": "transit.station","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "water","elementType": "geometry","stylers": [{"color": "#17263c"}]},{"featureType": "water","elementType": "labels.text.fill","stylers": [{"color": "#515c6d"}]},{"featureType": "water","elementType": "labels.text.stroke","stylers": [{"color": "#17263c"}]}];
//     return (

//       <View style={styles.container}>

//         <MapView
//           style={styles.map}
//           showsUserLocation={true}
//           showsMyLocationButton={true}
//           followUserLocation={true}
//           initialRegion={{
//             latitude: this.state.Clatitude,
//             longitude: this.state.Clongitude,
//             latitudeDelta: 0.009,
//             longitudeDelta: 0.004,
//           }
//           }
//         // customMapStyle={mapStyle}
//         >
//           <Marker
//             draggable
//             coordinate={{
//               latitude: this.state.Clatitude,
//               longitude: this.state.Clongitude,
//             }}
//             onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
//             title={'Test Marker'}
//             description={'This is a description of the marker'}
//           />
//         </MapView>
//         <Text> lol: {JSON.stringify(this.state.Clatitude,this.state.Clongitude)}</Text>
//       </View>

//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//   },
//   map: {

//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
// });

