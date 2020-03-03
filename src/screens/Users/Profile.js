import React, { Component } from 'react';
import { StyleSheet, Text, View, PixelRatio, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
export default class Project extends Component {

  constructor() {
    super();
    this.state = {

      ImageSource: null,

      data: null,

      Image_TAG: '',
      address: ''

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
          data: response.data,
          // address:''
        });
      }
    });
  }

  uploadImageToServer = () => {

     RNFetchBlob.fetch('POST', 'http://192.168.42.250/Project/upload_image.php', {

      // RNFetchBlob.fetch('POST', 'https://ngoapp3219.000webhostapp.com/db/upload_image.php', {

      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [
        { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },
        { name: 'image_tag', data: this.state.Image_TAG },
        {name:'address', data:this.state.address}
      ]).then((resp) => {

        var tempMSG = resp.data;

        tempMSG = tempMSG.replace(/^"|"$/g, '');

        Alert.alert(tempMSG);

      }).catch((err) => {
        // ...
      })

  }

  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>

          <View style={styles.ImageContainer}>

            {this.state.ImageSource === null ? <Text>Select a Photo</Text> :
              <Image style={styles.ImageContainer} source={this.state.ImageSource} />
            }

          </View>

        </TouchableOpacity>


        <TextInput

          placeholder="Enter Image Name "

          onChangeText={data => this.setState({ Image_TAG: data })}

          underlineColorAndroid='transparent'

          style={styles.TextInputStyle}
        /> 

        
<TextInput

placeholder="Enter Address"

onChangeText={data => this.setState({ address: data })}

underlineColorAndroid='transparent'

style={styles.TextInputStyle}
/> 


        <TouchableOpacity onPress={this.uploadImageToServer} activeOpacity={0.6} style={styles.button} >

          <Text style={styles.TextStyle}> UPLOAD IMAGE TO SERVER </Text>

        </TouchableOpacity>

      </View>
    );
  }

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingTop: 20
  },

  ImageContainer: {
    borderRadius: 10,
    width: 250,
    height: 250,
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDDC39',

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
  }

});


// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity
// } from 'react-native';

// export class Profile extends Component {

//   render() {
//     return (
//       <View style={styles.container}>
//           <View style={styles.header}></View>
//           <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
//           <View style={styles.body}>
//             <View style={styles.bodyContent}>
//               <Text style={styles.name}>John Doe</Text>
//               <Text style={styles.info}>UX Designer / Mobile developer</Text>
//               <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
              
//               <TouchableOpacity style={styles.buttonContainer}>
//                 <Text>Opcion 1</Text>  
//               </TouchableOpacity>              
//               <TouchableOpacity style={styles.buttonContainer}>
//                 <Text>Opcion 2</Text> 
//               </TouchableOpacity>
//             </View>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   header:{
//     backgroundColor: "#00BFFF",
//     height:200,
//   },
//   avatar: {
//     width: 130,
//     height: 130,
//     borderRadius: 63,
//     borderWidth: 4,
//     borderColor: "white",
//     marginBottom:10,
//     alignSelf:'center',
//     position: 'absolute',
//     marginTop:130
//   },
//   name:{
//     fontSize:22,
//     color:"#FFFFFF",
//     fontWeight:'600',
//   },
//   body:{
//     marginTop:40,
//   },
//   bodyContent: {
//     flex: 1,
//     alignItems: 'center',
//     padding:30,
//   },
//   name:{
//     fontSize:28,
//     color: "#696969",
//     fontWeight: "600"
//   },
//   info:{
//     fontSize:16,
//     color: "#00BFFF",
//     marginTop:10
//   },
//   description:{
//     fontSize:16,
//     color: "#696969",
//     marginTop:10,
//     textAlign: 'center'
//   },
//   buttonContainer: {
//     marginTop:10,
//     height:45,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom:20,
//     width:250,
//     borderRadius:30,
//     backgroundColor: "#00BFFF",
//   },
// });