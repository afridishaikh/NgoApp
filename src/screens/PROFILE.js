
import React, { Component } from 'react';
import { Text, Platform, StyleSheet, View, FlatList, Button, ActivityIndicator, Linking, Image, Modal, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import openMap from 'react-native-open-maps';
import AsyncStorage from '@react-native-community/async-storage'

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: true,
      ModalVisibleStatus: false,
      TempImageURL: '',

   username:''
    // password:'ad'
    }
  }


  //To store AsyncStorage value in state.
  componentDidMount() {
    AsyncStorage.getItem('any_key_here').then(value =>
      //AsyncStorage returns a promise so adding a callback to get the value
      this.setState({ username: value , isLoading:false})
      //Setting the value in Text  
    );
  }

//downloaded example
//   componentDidMount() {
//     this.fetchUser(this.state.username);
//  }
 
//  function fetchUser(username) {
//     let url = `https://api.github.com/users/${username}`;
//     this.fetchApi(url);
//  };
 
//  function fetchApi(url) {
//     fetch(url)
//     .then((res) => res.json())
//        .... some data that is being fetched .... 
//     });
//  };

  UserLoginFunction = () => {

    AsyncStorage.getItem('any_key_here').then(value =>
      //AsyncStorage returns a promise so adding a callback to get the value
      this.setState({ username: value , isLoading:false})
      //Setting the value in Text  
    );
  const { username } = this.state;
  console.warn(username)
  fetch('https://ngoapp3219.000webhostapp.com/db/profile.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
    })
  }).then((response) => response.json())
    .then((responseJson) => {
      if (responseJson[0].username == username) {
        this.setState({
          dataSource: responseJson

          })
        }
        else{
            alert('Please Login Again');
            //alert for the empty InputText
          }
      }
    ).catch((error) => {
      console.error(error);
    });
}


  // For Modal Storing and Defining Parameters , which will store the server data 
  ShowModalFunction(visible, image, name, address, mo_no, latitude, longitude) {
    this.setState({
      ModalVisibleStatus: visible,
      Image: image,
      Iname: name,
      Naddress: address,
      Nmo_no: mo_no,
      Latitude: latitude,
      Longitude: longitude
    });
  }


  // The Activityindicator
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
          
         <TouchableOpacity
          onPress={this.UserLoginFunction}
          style={styles.button}>
          <Text style={styles.buttonText}> SAVE VALUE </Text>
        </TouchableOpacity>

        </View>
      );
    }
    return (
      // console.warn(this.state.username),
      <View style={{ flex: 1, flexDirection: 'row', marginBottom: 3 }}>
         
         <Text style={styles.text}> lol: {this.state.username} </Text>

         <TouchableOpacity
          onPress={this.UserLoginFunction}
          style={styles.button}>
          <Text style={styles.buttonText}> SAVE VALUE </Text>
        </TouchableOpacity>

        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.renderSeprator}
          renderItem={({ item }) =>
            <TouchableOpacity onPress={this.ShowModalFunction.bind(this, true, item.image, item.name, item.address, item.mo_no, item.latitude, item.longitude)} >
              <Image style={{ width: 100, height: 100, margin: 5, flexDirection: 'row' }} source={{ uri: item.image }} />
              <Text style={{ fontSize: 15, color: 'black', }}>Problem:
                         </Text>
              <Text style={{ fontSize: 18, color: 'orange', marginBottom: 15, flexDirection: 'row' }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          }
          keyExtractor={(item, index) => index}
        />
        {
          this.state.ModalVisibleStatus
            ?
            (
              <Modal
                transparent={false}
                animationType={"fade"}
                visible={this.state.ModalVisibleStatus}
                onRequestClose={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus) }} >
                <View style={styles.modalView}>
                  <Image style={styles.mainImage} source={{ uri: this.state.Image }} />
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.TouchableOpacity_Style}
                    onPress={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus) }}>
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 2 }}>

                  <Text style={{ fontSize: 15, color: 'black', }}>Name:
                         </Text>
                  <Text style={{ fontSize: 18, color: 'blue', marginBottom: 1 }}>
                    {this.state.Iname}
                  </Text>

                  <Text style={{ fontSize: 15, color: 'black', }}>Address:
                         </Text>
                  <Text style={{ fontSize: 18, color: 'orange', marginBottom: 15 }}>
                    {this.state.Naddress}
                  </Text>

                  <Text style={{ fontSize: 15, color: 'black', }}>Mobile: </Text>
                  <Text style={{ fontSize: 18, color: 'orange', marginBottom: 15 }}>
                    {this.state.Nmo_no}
                  </Text>

                  <Text style={{ fontSize: 15, color: 'black', }}>Location: </Text>
                  <Text style={{ fontSize: 18, color: 'orange', marginBottom: 15 }}>
                    {this.state.Latitude}, {this.state.Longitude}
                  </Text>

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                  <TouchableOpacity onPress={() => { this.dialCall(this.state.Nmo_no) }} activeOpacity={0.7} style={styles.buttonn} >
                    <Icon style={{ paddingLeft: 50 }} name="phone" size={35} color="#fff" />
                  </TouchableOpacity>


                  <TouchableOpacity onPress={() => { this._goToYosemite(this.state.Latitude, this.state.Longitude) }} activeOpacity={0.7} style={styles.buttonn} >
                    {/* <Icon style={{ paddingLeft: 50 }} name="palm" size={35} color="#fff" />
                     */}
                     <Text style={{fontSize:15,color:'white'}}>  GoFor Help </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            )
            :
            null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {
    flexDirection: 'row',
    textDecorationColor: 'white',
    justifyContent: 'center',

    flex: 1,
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0

  },

  imageThumbnail: {

    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
    width: 150,
    position: "relative",
    resizeMode: "contain"
  },

  mainImage: {

    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '98%',
    resizeMode: 'contain'

  },

  modalView: {
    flexDirection: "column",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'black'

  },

  TouchableOpacity_Style: {

    width: 25,
    height: 25,
    top: 9,
    right: 9,
    position: 'absolute',
  },
  //button

  buttonn: {

    width: '40%',
    height: 45,
    margin: 20,
    padding: 6,
    backgroundColor: 'green',
    borderRadius: 50,
    marginBottom: 30
  },

  TextStyle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  }
}
);