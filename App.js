import React, { Component } from 'react'


import Routes from './src/screens/Routes'
export class App extends Component {
  render() {
    return <Routes/>

  }
}
export default App

// 888888888888888888888888888888888888888888888888888888888888888888

// import React, { Component } from 'react';
 
// import { StyleSheet, Text, View, PixelRatio, TouchableOpacity, Image, TextInput, Alert ,ScrollView} from 'react-native';
 
// import ImagePicker from 'react-native-image-picker';
 
// import RNFetchBlob from 'rn-fetch-blob';
 
// export default class upload extends Component {
 
//   constructor() {
 
//     super();
 
//     this.state = {
 
//       ImageSource: null,
 
//       data: null,
 
//       Image_TAG: ''
 
//     }
//   }
 
//   selectPhotoTapped() {
//     const options = {
//       quality: 1.0,
//       maxWidth: 500,
//       maxHeight: 500,
//       storageOptions: {
//         skipBackup: true
//       }
//     };
 
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
 
  
 
//   render() {
//     return (
//       <View style={styles.MainContainer}>
//         <ScrollView horizontal={true}>
//  <View style={styles.columes} >
//           <View style={styles.rows}>
//         <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
 
//           <View style={styles.ImageContainer}>
 
//             {this.state.ImageSource === null ? <Text>Select a Photo</Text> :
//               <Image style={styles.ImageContainer} source={this.state.ImageSource} />
//             }
 
//           </View>
 
//         </TouchableOpacity>

// {/*  
 
//         <TouchableOpacity onPress={this.uploadImageToServer} activeOpacity={0.6} style={styles.button} >
 
//           <Text style={styles.TextStyle}> UPLOAD IMAGE TO SERVER </Text>
 
//         </TouchableOpacity> */}
//         </View>
//         </View>
//         </ScrollView>
//       </View>
//     );
//   }
 
// }
 
// const styles = StyleSheet.create({
 
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#FFF8E1',
//     paddingTop: 20
//   },
 
//   ImageContainer: {
//     borderRadius:10,
//     width: 180,
//     height: 180,
//     // borderColor: '#9B9B9B',
//     borderWidth: 1 / PixelRatio.get(),

//     justifyContent: 'center',
//     // alignItems: 'center',
//     backgroundColor: 'white',

//   },
 
//   TextInputStyle: {
 
//     textAlign: 'center',
//     height: 40,
//     width: '30%',
//     borderRadius: 10,
//     borderWidth: 1,
//     // borderColor: '#028b53',
//     // marginTop: 20
//     alignItems:'center'
//   },
 
//   button: {
 
//     width: '50%',
//     height:'10%',
//     backgroundColor: '#00BCD4',
//     borderRadius: 40,
//     marginTop: 20,
//     alignItems:'center'
//   },
 
//   TextStyle: {
//     color: '#fff',
//     textAlign: 'center',
//     padding: 10
//   },
//   MainContainer: {
//     flex: 1,
//     // backgroundColor: '#FFF8E1',
//     justifyContent: 'center',
//     alignItems: 'center',
//   borderColor:'#023056',
//   borderWidth:3,
//   marginBottom:20,
//    paddingTop:80,

//   },
//   rows:
//   {
//     flex:2,
//     flexDirection:"row",
//     paddingTop:25
//   },
//   columes:
//   {
//     flex:2,
//     flexDirection:"row",
//     paddingTop:25
//   },
 
// });



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





