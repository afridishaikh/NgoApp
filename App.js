import React, { Component } from 'react'

import Routes from './src/screens/Routes'
import UI  from './backupfiles/Try/UI'
import Login from './backupfiles/Try/loginn.js'
import Req from './src/screens/Home/Request'
import Map from './src/screens/Home/location'
export class App extends Component {
  render() {
    return <Routes/>
    // return <Req/>
    // return <Map/>
      // return <UI />
   //  return <Login/>
  }
}
export default App

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

