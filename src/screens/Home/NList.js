
import React, { Component } from 'react';
import { Text, Platform, StyleSheet, View, FlatList, ActivityIndicator, Linking, Image, Modal, TouchableOpacity, BackHandler ,ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class App extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: true,
      ModalVisibleStatus: false,
      TempImageURL: ''
    }
  }
//Fetching data from server
  componentDidMount() {
    return fetch('https://ngoapp3219.000webhostapp.com/db/ngo_list.php')
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
        console.error(error);
      });
  }
// For Modaal Storing and Defining Parameters , which will store the server data 
  ShowModalFunction(visible, image, name, address, mo_no,category,city) {
    this.setState({
      ModalVisibleStatus: visible,
      Image: image,
      Iname: name,
      Naddress: address,
      Nmo_no: mo_no,
      NCategory: category,
      Ncity : city
    });
  }

  //function to make call and store the mo_no
  dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else { phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);
  };
// making Seprators between the Flatlist
  renderSeprator = () => {
    return (
      <View style={{ height: 2, width: "100%", backgroundColor: 'black' }}>
      </View>
    )
  }
// The loading Circle


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, flexDirection: 'row', marginBottom: 3 }}>

        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.renderSeprator}
          renderItem={({ item }) =>


            <TouchableOpacity onPress={this.ShowModalFunction.bind(this, true, item.image, item.name, item.address, item.mo_no,item.category,item.city)} >

              <Image style={{ width: 100, height: 100, margin: 5, flexDirection: 'row' }} source={{ uri: item.image }} />
              <Text style={{ fontSize: 15, color: 'black', }}>Name:
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

                  <Text style={styles .modalFont}>Name:
                         </Text>
                  <Text style={styles .modalText}>
                    {this.state.Iname}
                  </Text>

                  <Text style={styles .modalFont}>Address:
                         </Text>
                  <Text style={styles .modalText}>
                    {this.state.Naddress}
                  </Text>

                  <Text style={styles .modalFont}>Mobile: </Text>
                  <Text style={styles .modalText}>
                    {this.state.Nmo_no}
                  </Text>

                  
                  <Text style={styles .modalFont}>Type Of NGO: </Text>
                  <Text style={styles .modalText}>
                    {this.state.NCategory}
                  </Text>

                  <Text style={styles .modalFont}>City: </Text>
                  <Text style={styles .modalText}>
                    {this.state.Ncity}
                  </Text>
                

                </View>


                <View>
                  <TouchableOpacity onPress={() => { this.dialCall(this.state.Nmo_no) }} activeOpacity={0.7} style={styles.buttonn} >
                  <Icon style={{paddingLeft:50}} name="phone" size={35} color="#fff" />
                    {/* <Text style={styles.TextStyle}>Call Now</Text> */}
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
  modalFont: {
    fontSize: 15,
     color: 'black', 
    
  },
  modalText: {
    fontSize: 15,
     color: 'blue',
     marginBottom: 15 
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