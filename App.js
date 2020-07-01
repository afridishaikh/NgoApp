// import React, { Component } from 'react'
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Platform,
//   Image,
//   ActivityIndicator,
//   PixelRatio
// } from 'react-native'
// import ImagePicker from 'react-native-image-picker'
// import RNFetchBlob from 'rn-fetch-blob'
// import firebase from 'firebase'

// // Init Firebase
// const config = {
//   apiKey: "AIzaSyArLlvKVYY9qRBqxqU_HiDE-xdr25wQcCA",
//   authDomain: "pukaar-c2f79.firebaseapp.com",
//   databaseURL: "https://pukaar-c2f79.firebaseio.com",
//   projectId: "pukaar-c2f79",
//   storageBucket: "pukaar-c2f79.appspot.com",
//   messagingSenderId: "469968586511",
//   appId: "1:469968586511:web:c78e4bacd5b9169685607a",
//   measurementId: "G-Z27HEBXMFD"

// }
// firebase.initializeApp(config)
// const storage = firebase.storage()

// // Prepare Blob support
// const Blob = RNFetchBlob.polyfill.Blob
// const fs = RNFetchBlob.fs
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
// window.Blob = Blob

// const uploadImage = (uri, mime = 'application/octet-stream') => {
//   return new Promise((resolve, reject) => {
//     const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
//     const sessionId = new Date().getTime()
//     let uploadBlob = null
//     const imageRef = storage.ref('images').child(`${sessionId}.jpg`)

//     fs.readFile(uploadUri, 'base64')
//       .then((data) => {
//         return Blob.build(data, { type: `${mime};BASE64` })
//       })
//       .then((blob) => {
//         uploadBlob = blob
//         return imageRef.put(blob, { contentType: mime })
//       })
//       .then(() => {
//         uploadBlob.close()
//         return imageRef.getDownloadURL()
//       })
//       .then((url) => {
//         resolve(url)
//       })
//       .catch((error) => {
//         reject(error)
//     })

//     console.warn(typeof(imageRef))
//   })
// }


// class Demo extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       url: null
//     }
//   }

//    //
//   _pickImage() {
//     this.setState({ uploadURL: '' })
//     ImagePicker.launchImageLibrary({}, response  => {
//       uploadImage(response.uri)
//         .then(url => this.setState({ uploadURL: url }))
//         .catch(error => console.log(error))
//     })
//   }

//   render() {
//     return (
//       <View style={ styles.container }>
//         {
//           (() => {
//             switch (this.state.uploadURL) {
//               case null:
//                 return null
//               case '':
//                 return <ActivityIndicator />
//               default:
//                 return (
//                   <View>

// <Text style={{ fontSize: 20, color: 'back', marginBottom: 7 }}>Take a Photo of Victim:</Text>
//           <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
//             <View style={styles.ImageContainer}>

//               {this.state.ImageSource === null ? <Icon style={styles.Icon} name="camera" size={50} color="#000" /> :
//                 <Image style={styles.ImageContainer3} source={{ uri: this.state.uploadURL }} />
//               }
//             </View>
//           </TouchableOpacity>

//                     {/* <Image
//                       source={{ uri: this.state.uploadURL }}
//                       style={ styles.image }
//                     /> */}
//                     <Text>{ this.state.uploadURL }</Text>
//                   </View>
//                 )
//             }
//           })()
//         }
//         <TouchableOpacity onPress={ () => this._pickImage() }>
//           <Text style={ styles.upload }>
//             Upload
//           </Text>
//         </TouchableOpacity>
//       </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   image: {
//     height: 200,
//     resizeMode: 'contain',
//   },
//   upload: {
//     textAlign: 'center',
//     color: '#333333',
//     padding: 10,
//     marginBottom: 5,
//     borderWidth: 1,
//     borderColor: 'gray'
//   },
  
//   ImageContainer3: {
//     borderRadius: 10,
//     width: 295,
//     height: 195,
//     marginTop:22,
//     // borderColor: '#9B9B9B',
//     borderWidth: 10 / PixelRatio.get(),
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#3641',
//     backgroundColor: 'white',
//     // marginTop: 5,
//     marginBottom: 25
// },

// })

// export default Demo



////////////////////////////////////////////////////////////////

// import React, { useState } from 'react';
// import {
//   View,
//   SafeAreaView,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Platform,
//   Alert,
//   Image
// } from 'react-native';
// import ImagePicker from 'react-native-image-picker';
// // import firebase from './config'
// import storage from '@react-native-firebase/storage';
// // import * as Progress from 'react-native-progress';

// // const storage = firebase.storage()


// export default function UploadScreen() {
//   const [image, setImage] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [transferred, setTransferred] = useState(0);

//   const selectImage = () => {
//     const options = {
//       maxWidth: 2000,
//       maxHeight: 2000,
//       storageOptions: {
//         skipBackup: true,
//         path: 'images'
//       }
//     };
//     ImagePicker.showImagePicker(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//       } else {
//         const source = { uri: response.uri };
//         console.log(source);
//         setImage(source);
//         console.warn(response.uri)
//       }
//     });
//   };

  
//   const uploadImage = async () => {
//     const { uri } = image;
//     const filename = uri.substring(uri.lastIndexOf('/') + 1);
//     const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  
//     setUploading(true);
//     setTransferred(0);
  
//     const task = storage()
//       .ref(filename)
//       .putFile(uploadUri);
  
//     // set progress state
//     task.on('state_changed', snapshot => {
//       setTransferred(
//         Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
//       );
//     });
  
//     try {
//       await task;
//     } catch (e) {
//       console.error(e);
//     }
  
//     setUploading(false);
  
//     Alert.alert(
//       'Photo uploaded!',
//       'Your photo has been uploaded to Firebase Cloud Storage!'
//     );
  
//     setImage(null);
//   };
  
//   return (
//     <SafeAreaView style={styles.container}>
//       <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
//         <Text style={styles.buttonText}>Pick an image</Text>
//       </TouchableOpacity>
//       <View style={styles.imageContainer}>
//         {image !== null ? (
//           <Image source={{ uri: image.uri }} style={styles.imageBox} />
//         ) : null}
//         {uploading ? (
//           <View style={styles.progressBarContainer}>
//             {/* <Progress.Bar progress={transferred} width={300} /> */}
//             <Text> Uploading ... </Text>
//           </View>
//         ) : (
//           <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
//             <Text style={styles.buttonText}>Upload image</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </SafeAreaView>
//   );

// }





// // // export default function UploadScreen() {
// // //   //... rest of the code

 
// // // }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#bbded6'
//   },
//   selectButton: {
//     borderRadius: 5,
//     width: 150,
//     height: 50,
//     backgroundColor: '#8ac6d1',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   uploadButton: {
//     borderRadius: 5,
//     width: 150,
//     height: 50,
//     backgroundColor: '#ffb6b9',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 20
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold'
//   },
//   imageContainer: {
//     marginTop: 30,
//     marginBottom: 50,
//     alignItems: 'center'
//   },
//   progressBarContainer: {
//     marginTop: 20
//   },
//   imageBox: {
//     width: 300,
//     height: 300
//   }
// });


// HOme
import React, { Component } from 'react'
import Routes from './src/screens/Routes'
import { StatusBar } from 'react-native'
// console.disableYellowBox = true;
export class App extends Component {
  render() {
    return(

    <Routes />

    );
  }
}
export default App
