
import React, { Component } from 'react';
import { Text, Platform, StyleSheet, View, FlatList, ActivityIndicator, Linking, Image, Modal, TouchableOpacity, ImageBackground } from 'react-native';
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
  ShowModalFunction(visible, image, name, address, mo_no) {
    this.setState({
      ModalVisibleStatus: visible,
      Image: image,
      Iname: name,
      Naddress: address,
      Nmo_no: mo_no
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


            <TouchableOpacity onPress={this.ShowModalFunction.bind(this, true, item.image, item.name, item.address, item.mo_no)} >

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

                  <Text style={{ fontSize: 15, color: 'black', }}>Name:
                         </Text>
                  <Text style={{ fontSize: 18, color: 'orange', marginBottom: 1 }}>
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

// import React, { Component } from 'react'
// import {
//     Platform,
//     StyleSheet,
//     View,
//     FlatList,
//     ActivityIndicator,
//     Image,
//     TouchableOpacity,
//     ImageBackground,
//     Text,
//     ToastAndroid,
//     Button
// } from 'react-native'
// import Modal from "react-native-modal";

// export class List extends Component {
//     constructor() {
//         super();
//         this.state = {
//             isLoading: true,
//             isModalVisible: false
//         }
//     }

//     toggleModal = () => {
//         this.setState({ isModalVisible: !this.state.isModalVisible });
//     };

//     componentDidMount() {
//         const url = 'https://ngoapp3219.000webhostapp.com/db/ngo_list.php'
//         fetch(url)
//             .then((Response) => Response.json())
//             .then((responseJson) => {
//                 this.setState({
//                     dataSource: responseJson,
//                     isLoading: false,
//                 })
//             })
//             .catch((error) => {
//                 console.log(error)
//             })
//     }
//     renderItem = ({ item }) => {
//         return (

//             this.state.isLoading
//                 ?
//                 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                     <ActivityIndicator size="large" color='red' animating />
//                 </View>
//                 :
//                 <View style={{ flex: 1, flexDirection: 'row', marginBottom: 3 }}>

//                     <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginBottom: 3 }}
//                         // onPress={()=>ToastAndroid.show(item.name, ToastAndroid.SHORT)}
//                         onPress={this.toggleModal} >

//                         <Image style={{ width: 100, height: 100, margin: 5 }}
//                             source={{ uri: item.image }} />
//                         <View style={{ flex: 1, justifyContent: 'center' }}>

//                             <Text style={{ fontSize: 15, color: 'black', }}>Name:
//                         </Text>
//                             <Text style={{ fontSize: 18, color: 'orange', marginBottom: 15 }}>
//                                 {item.name}
//                             </Text>

//                             <Text style={{ fontSize: 15, color: 'black', }}>Type Of NGO:
//                         </Text>
//                             <Text style={{ fontSize: 18, color: '#985263', marginBottom: 15 }}>
//                                 {item.category}
//                             </Text>
//                             {/* <Text style={{ fontSize: 18, color: '#985263', marginBottom: 15 }}>
//                             {item.address}
//                         </Text> */}
//                         </View>
//                     </TouchableOpacity>
//                     <View>
//                         <Modal 
//                            transparent={false}
//                            animationType={"fade"}
//               isVisible={this.state.isModalVisible}>
//                             <View style={{ flex: 1 }}>
//                     <Text style={{color:'white'}}> {item.name} </Text>
//                                 <Button title="Hide modal" onPress={this.toggleModal} />
//                             </View>
//                         </Modal>
//                     </View>
//                 </View> 
//         )
//     }

//     renderSeprator = () => {
//         return (
//             <View style={{ height: 2, width: "100%", backgroundColor: 'black' }}>
//             </View>
//         )
//     }

//     render() {
//         return (
//             <View>
//                 <FlatList
//                     data={this.state.dataSource}
//                     renderItem={this.renderItem}
//                     keyExtractor={(item, index) => index}
//                     ItemSeparatorComponent={this.renderSeprator}
//                 />
//             </View>
//         )
//     }
// }
// export default List
