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
  animating,
  Modal
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
      userid: '',
      ImageSource: null,
      data: null,
      latitude: null,
      longitude: null,
      Problem: '',
      Address: '',
      Mo_no: '',
      loading: false
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
      this.setState({ userid: value })
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
        ;
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

      (error) => alert('Error: Please Turn ON Your GPS'),

      // (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }

  //Functio That will send data to server
  InsertDataToServer = () => {
    //   VALIDATION
    let phoneno = /^[0]?[6789]\d{9}$/;
    // console.warn(this.state.Name)
    if (this.state.userid == '' || this.state.Problem == '' || this.state.Address == '' || this.state.Mo_no == '') {
      Alert.alert('Input Fields should not be Empty !')
    }

    else if (this.state.ImageSource == null || this.state.data == null) {
      Alert.alert('You must Upload Your NGO Image !');
      return false;
    }
    else if (this.state.latitude == null || this.state.longitude == null) {
      Alert.alert('Please turn ON Your GPS !');
      return false;
    }
    else if (phoneno.test(this.state.Mo_no) === false) {
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

        { name: 'latitude', data: JSON.stringify(this.state.latitude) },
        { name: 'longitude', data: JSON.stringify(this.state.longitude) },

        { name: 'address', data: this.state.Address },
        { name: 'mo_no', data: this.state.Mo_no },

      ]).then((resp) => {
        var tempMSG = resp.data;
        tempMSG = tempMSG.replace(/\"/g, "");
        Alert.alert(tempMSG);
        this.setState({
          loading: false,
        });
        this.props.navigation.navigate('UHome');
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
      value: 'Garment',
    }, {
      value: 'Poverty',
    }, {
      value: 'Blood'
    }];

    return (
      <View style={styles.container}>
        <ScrollView style={{ padding: 25 }} >
          <View style={[styles.Dropdown,{marginBottom:20}]}>
            <Dropdown
              label='Select a Problem'
              data={Problem}
              onChangeText={Problem => this.setState({ Problem })}
            />
          </View>

          <Text style={{ fontSize: 20, color: 'back', marginBottom: 7 }}>Take a Photo of Victim:</Text>
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            <View style={styles.ImageContainer}>

              {this.state.ImageSource === null ? <Icon style={styles.Icon} name="camera" size={50} color="#000" /> :
                <Image style={styles.ImageContainer3} source={this.state.ImageSource} />
              }
            </View>
          </TouchableOpacity>

          <Text style={{ fontSize: 20, color: 'back', marginBottom: 1 }}>Get Your Location:</Text>
          <View style={styles.ImageContainer2}>
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
              <Icon style={{ padding: 9 }} size={25} name='location-arrow' color='blue' />
            </TouchableOpacity>
          </View>


          <Text> Your Location is : {(JSON.stringify(this.state.latitude))},{(JSON.stringify(this.state.longitude))} </Text>

          <View style={[styles.inputContainer,{marginTop:20}]}>
            <Icon style={styles.Icon} name="map-marker" size={25} color="#000" />
            <TextInput style={styles.inputs}
              placeholder="Enter Address Manually"
              keyboardType="default"
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

          <TouchableHighlight style={[styles.buttonContainer, styles.rButton]} onPress={this.InsertDataToServer}>
            <Text style={styles.loginText}>Send Request</Text>
          </TouchableHighlight>
        </ScrollView>

        {this.state.loading &&
          <Modal
            transparent={false}
            animationType="none"
            visible={this.state.loading}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
              <Text> Please Wait ...</Text>
              <ActivityIndicator
                animating={animating}
                color='#bc2b78'
                size={70}
                loading={this.state.loading}
              />
            </View>
          </Modal>
        }

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
    padding: 10,
    alignItems: 'center',
    alignContent: 'center',
    marginBottom:20
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
    color: '#373b6e'
  },
  inputs: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    justifyContent: 'center',
    alignContent: "center",
  },

  ImageContainer: {
    borderRadius: 10,
    width: 300,
    height: 200,
    borderWidth: 10 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3641',
    backgroundColor: 'white',
    marginBottom: 25
  },
  ImageContainer2: {
    borderRadius: 10,
    width: 300,
    height: 200,
    borderWidth: 10 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3641',
    backgroundColor: 'white',
    marginBottom: 5
  },

  ImageContainer3: {
    borderRadius: 10,
    width: 295,
    height: 195,
    marginTop:22,
    // borderColor: '#9B9B9B',
    borderWidth: 10 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3641',
    backgroundColor: 'white',
    // marginTop: 5,
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
  rButton: {
    margin: 20,
    marginLeft: 70,
    marginBottom: 100,
    width: 150,
    backgroundColor: "#980953",
    borderWidth: 2,
    borderColor: '#000'
  },
  loginText: {
    color: 'white',
  }

});
