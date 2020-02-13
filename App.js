
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
//     borderRadius: 5
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

import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Index from './src/screens/index';
import Profile from './src/screens/Users/Profile'
export class App extends Component {
  render() {
    return    <Index/>

    
  }
}
export default App



