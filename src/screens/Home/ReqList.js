
import React, { Component } from 'react';
import { Text, Platform,animating, StyleSheet, View, FlatList, Alert, TouchableHighlight, ActivityIndicator, Linking, Image, Modal, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import openMap from 'react-native-open-maps';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import { Card, Button } from 'react-native-paper'

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: true,
      ModalVisibleStatus: false,
      TempImageURL: '',
      userid: '',
      r_id: ''
    }
  }



  //Fetching data from server
  componentDidMount() {
    AsyncStorage.getItem('username').then(value =>
      //AsyncStorage returns a promise so adding a callback to get the value
      this.setState({ userid: value }),
    );
    // console.warn(this.state.userid)

    return fetch('https://ngoapp3219.000webhostapp.com/db/reqList.php')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        }, function () {
          // In this block you can do something with new state.
        });
      })
      .catch((error) => {
        // console.error(error);
        Alert.alert('Network Error!')
      });
  }


  //Function That will send data to server
  Status = (r_id) => {
    this.setState({
      r_id: r_id,
      isLoading: true,
    });
    console.warn(this.state.r_id)
    RNFetchBlob.fetch('POST', 'https://ngoapp3219.000webhostapp.com/db/status/pending.php', {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [
      { name: 'username', data: this.state.userid },
      { name: 'r_id', data: r_id }

    ]).then((resp) => {
      var tempMSG = resp.data;
      // tempMSG = tempMSG.replace(/^"|"$/g, '');
      tempMSG = tempMSG.replace(/\"/g, "");
      this.setState({

        isLoading: false,
      });
      Alert.alert(tempMSG);
    }).catch((error) => {
      // console.error(error);
      Alert.alert('Network Error !')
    });
  }


  // For Modal Storing and Defining Parameters , which will store the server data 
  ShowModalFunction(visible, r_id, image, problem, address, mo_no, latitude, longitude) {
    this.setState({
      r_id: r_id,
      ModalVisibleStatus: visible,
      Image: image,
      Problem: problem,
      Naddress: address,
      Nmo_no: mo_no,
      Latitude: latitude,
      Longitude: longitude
    });
    // console.warn(address)
  }

  //function to make call and store the mo_no
  dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else { phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);
  };

  _goToYosemite = (lat, long) => {
    JSON.stringify(lat)
    JSON.stringify(long)
    //When you use 100percent of your brain lol
    let a = lat
    let b = long
    let c = a + ',' + b
    openMap({ query: c });
  };

  // The Activityindicator
  render() {

    if (this.state.isLoading) {
      return (
      
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <Text> Please Wait ...</Text>
          <ActivityIndicator
            animating={animating}
            color='#bc2b78'
            size={70}
            loading={this.state.loading}
          />
        </View>
      
      );
    }
    return (
      <View style={{ flex: 1, flexDirection: 'row', marginBottom: 3 }}>


        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.renderSeprator}
          renderItem={({ item }) =>
            <View>
              <TouchableOpacity onPress={this.ShowModalFunction.bind(this, true, item.r_id, item.image, item.problem, item.address, item.mo_no, item.latitude, item.longitude)} >
                <Card style={styles.mycard}>
                  <View style={{ flexDirection: 'row' }}>

                    <Image style={{ width: 100, height: 100, margin: 5, borderRadius: 5, borderWidth: 2, borderColor: 'black', flexDirection: 'row' }} source={{ uri: item.image }} />
                    <View style={{ justifyContent: 'space-evenly', padding: 5 }}>
                      <View style={{ justifyContent: 'center', alignContent: 'center', marginLeft: 20, marginTop: 70 }}>
                        <Text style={{ fontSize: 15, color: 'black', }}>Problem
                         </Text>
                        <Text style={{ fontSize: 18, color: 'darkblue', marginBottom: 15, flexDirection: 'row' }}>
                          {item.problem}
                        </Text>
                    
                      </View>
                      <Button style={{ marginLeft: 130, marginBottom: 50 }} width={90} uppercase={false} mode="contained" onPress={this.Status.bind(this, item.r_id)}>
                        Accept</Button>
                    </View>

                  </View>

                </Card>

              </TouchableOpacity>
            </View>
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

                <View style={styles.modalView2}>
                  <Text style={styles.modalFont}>Problem
                         </Text>
                  <Text style={styles.modalText}>
                    {this.state.Problem}
                  </Text>

                  <Text style={styles.modalFont}>Address
                         </Text>
                  <Text style={styles.modalText}>
                    {this.state.Naddress}
                  </Text>

                  <Text style={styles.modalFont}>Mobile Number</Text>
                  <Text style={styles.modalText}>
                    {this.state.Nmo_no}
                  </Text>

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                  <TouchableOpacity onPress={() => { this.dialCall(this.state.Nmo_no) }} activeOpacity={0.7} style={styles.buttonn} >
                    <Icon style={{ paddingLeft: 50 }} name="phone" size={35} color="#fff" />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => { this._goToYosemite(this.state.Latitude, this.state.Longitude) }} activeOpacity={0.7} style={styles.buttonn} >

                    <Icon style={{ paddingLeft: 50 }} name="map-marker" size={35} color="#fff" />

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
  modalView2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: 'white'
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
  },
  mycard: {
    margin: 5,
    height: 120,
    flexDirection: 'row',
    backgroundColor: '#e0d238',
    alignItems: 'center',
    borderWidth: 2,
    borderBottomColor: 'black'

  },
  modalFont: {
    fontSize: 15,
    color: 'black',
  },
  modalText: {
    fontSize: 18,
    color: '#8803fc',
    marginBottom: 15
  },
}
);


