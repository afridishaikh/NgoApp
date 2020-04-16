
import React, { Component } from 'react';
import { Text, Platform, StyleSheet, View, FlatList, Button,Alert, TouchableHighlight, ActivityIndicator, Linking, Image, Modal, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import openMap from 'react-native-open-maps';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: true,
      ModalVisibleStatus: false,
      TempImageURL: '',
      userid:'',
      r_id:''
    }
  }



  //Fetching data from server
  componentDidMount() {
    AsyncStorage.getItem('username').then(value =>
        //AsyncStorage returns a promise so adding a callback to get the value
        this.setState({ userid: value}),
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
        console.error(error);
      });
  }

  
    //Function That will send data to server
  Status = (r_id) => {
    console.warn(r_id)
    this.setState({
        r_id: r_id,
      });
      console.warn(this.state.r_id)
    RNFetchBlob.fetch('POST', 'https://ngoapp3219.000webhostapp.com/db/status/pending.php', {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [
      { name: 'username', data: this.state.userid },
      {name:'r_id', data:r_id}

    ]).then((resp) => {
      var tempMSG = resp.data;
      // tempMSG = tempMSG.replace(/^"|"$/g, '');
      tempMSG = tempMSG.replace(/\"/g, "");
      Alert.alert(tempMSG);
    }).catch((error) => {
      console.error(error);
    });
  }


  // For Modal Storing and Defining Parameters , which will store the server data 
  ShowModalFunction(visible, r_id, image, name, address, mo_no, latitude, longitude) { 
    this.setState({
      r_id:r_id,
      ModalVisibleStatus: visible,
      Image: image,
      Iname: name,
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

  // making Seprators between the Flatlist
  renderSeprator = () => {
    return (
      <View style={{ height: 2, width: "100%", backgroundColor: 'black' }}>
      </View>
    )
  }

  // The Activityindicator
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
          <View>
            <TouchableOpacity onPress={this.ShowModalFunction.bind(this, true,item.r_id, item.image, item.name, item.address, item.mo_no, item.latitude, item.longitude)} >  
              <Image style={{ width: 100, height: 100, margin: 5, flexDirection: 'row' }} source={{ uri: item.image }} />
              <Text style={{ fontSize: 15, color: 'black', }}>Problem:
                         </Text>
              <Text style={{ fontSize: 18, color: 'orange', marginBottom: 15, flexDirection: 'row' }}>
                {item.problem}
              </Text>

            </TouchableOpacity>

        {/* ACCEPT */}
            <TouchableOpacity onPress={this.Status.bind(this, item.r_id)} >
                <Text style={{ fontSize: 15, color: 'black', }}> ACCEPT </Text>
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




// import React, { Component } from 'react';
// import { Text, Platform, StyleSheet, View, FlatList, Button, ActivityIndicator, Linking, Image, Modal, TouchableOpacity, ImageBackground } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import openMap from 'react-native-open-maps';


// export default class App extends Component {

//   constructor() {
//     super();
//     this.state = {
//       isLoading: true,
//       ModalVisibleStatus: false,
//       TempImageURL: ''
//     }
//   }


//   //Fetching data from server
//   componentDidMount() {
//     return fetch('https://ngoapp3219.000webhostapp.com/db/ReqList.php')
//       .then((response) => response.json())
//       .then((responseJson) => {
//         this.setState({
//           isLoading: false,
//           dataSource: responseJson
//         }, function () {
//           // In this block you can do something with new state.
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }
//   // For Modal Storing and Defining Parameters , which will store the server data 
//   ShowModalFunction(visible, image, name, address, mo_no, latitude, longitude) {
//     this.setState({
//       ModalVisibleStatus: visible,
//       Image: image,
//       Iname: name,
//       Naddress: address,
//       Nmo_no: mo_no,
//       Latitude: latitude,
//       Longitude: longitude
//     });
//   }

//   //function to make call and store the mo_no
//   dialCall = (number) => {
//     let phoneNumber = '';
//     if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
//     else { phoneNumber = `telprompt:${number}`; }
//     Linking.openURL(phoneNumber);
//   };

//   _goToYosemite = (lat, long) => {
//     // console.warn(lat)
//     // openMap({ latitude: parseFloat(lat), longitude: parseFloat(long),query: 'Yosemite Trails' });
//     JSON.stringify(lat)
//     JSON.stringify(long)
//     //When you use 100percent of your brain lol
//     let a = lat
//     let b = long
//     let c = a + ',' + b
//     openMap({ query: c });
//   };

//   // _goToYosemite() {
//   //   openMap({ latitude: this.state.Latitude, longitude: this.state.Longitude });
//   // }

//   // making Seprators between the Flatlist
//   renderSeprator = () => {
//     return (
//       <View style={{ height: 2, width: "100%", backgroundColor: 'black' }}>
//       </View>
//     )
//   }

//   // The Activityindicator
//   render() {
//     if (this.state.isLoading) {
//       return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <ActivityIndicator size="large" />
//         </View>
//       );
//     }
//     return (
//       <View style={{ flex: 1, flexDirection: 'row', marginBottom: 3 }}>

//         <FlatList
//           data={this.state.dataSource}
//           ItemSeparatorComponent={this.renderSeprator}
//           renderItem={({ item }) =>
//             <TouchableOpacity onPress={this.ShowModalFunction.bind(this, true, item.image, item.name, item.address, item.mo_no, item.latitude, item.longitude)} >
//               <Image style={{ width: 100, height: 100, margin: 5, flexDirection: 'row' }} source={{ uri: item.image }} />
//               <Text style={{ fontSize: 15, color: 'black', }}>Problem:
//                          </Text>
//               <Text style={{ fontSize: 18, color: 'orange', marginBottom: 15, flexDirection: 'row' }}>
//                 {item.problem}
//               </Text>
//             </TouchableOpacity>
//           }
//           keyExtractor={(item, index) => index}
//         />
//         {
//           this.state.ModalVisibleStatus
//             ?
//             (
//               <Modal
//                 transparent={false}
//                 animationType={"fade"}
//                 visible={this.state.ModalVisibleStatus}
//                 onRequestClose={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus) }} >
//                 <View style={styles.modalView}>
//                   <Image style={styles.mainImage} source={{ uri: this.state.Image }} />
//                   <TouchableOpacity
//                     activeOpacity={0.5}
//                     style={styles.TouchableOpacity_Style}
//                     onPress={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus) }}>
//                   </TouchableOpacity>
//                 </View>

//                 <View style={{ flex: 2 }}>

//                   <Text style={{ fontSize: 15, color: 'black', }}>Name:
//                          </Text>
//                   <Text style={{ fontSize: 18, color: 'blue', marginBottom: 1 }}>
//                     {this.state.Iname}
//                   </Text>

//                   <Text style={{ fontSize: 15, color: 'black', }}>Address:
//                          </Text>
//                   <Text style={{ fontSize: 18, color: 'orange', marginBottom: 15 }}>
//                     {this.state.Naddress}
//                   </Text>

//                   <Text style={{ fontSize: 15, color: 'black', }}>Mobile: </Text>
//                   <Text style={{ fontSize: 18, color: 'orange', marginBottom: 15 }}>
//                     {this.state.Nmo_no}
//                   </Text>

//                   <Text style={{ fontSize: 15, color: 'black', }}>Location: </Text>
//                   <Text style={{ fontSize: 18, color: 'orange', marginBottom: 15 }}>
//                     {this.state.Latitude}, {this.state.Longitude}
//                   </Text>

//                 </View>

//                 <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
//                   <TouchableOpacity onPress={() => { this.dialCall(this.state.Nmo_no) }} activeOpacity={0.7} style={styles.buttonn} >
//                     <Icon style={{ paddingLeft: 50 }} name="phone" size={35} color="#fff" />
//                   </TouchableOpacity>


//                   <TouchableOpacity onPress={() => { this._goToYosemite(this.state.Latitude, this.state.Longitude) }} activeOpacity={0.7} style={styles.buttonn} >
//                     {/* <Icon style={{ paddingLeft: 50 }} name="palm" size={35} color="#fff" />
//                      */}
//                      <Text style={{fontSize:15,color:'white'}}>  GoFor Help </Text>
//                   </TouchableOpacity>
//                 </View>
//               </Modal>
//             )
//             :
//             null
//         }
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({

//   MainContainer: {
//     flexDirection: 'row',
//     textDecorationColor: 'white',
//     justifyContent: 'center',

//     flex: 1,
//     paddingTop: (Platform.OS) === 'ios' ? 20 : 0

//   },

//   imageThumbnail: {

//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 180,
//     width: 150,
//     position: "relative",
//     resizeMode: "contain"
//   },

//   mainImage: {

//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100%',
//     width: '98%',
//     resizeMode: 'contain'

//   },

//   modalView: {
//     flexDirection: "column",
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: 'black'

//   },

//   TouchableOpacity_Style: {

//     width: 25,
//     height: 25,
//     top: 9,
//     right: 9,
//     position: 'absolute',
//   },
//   //button

//   buttonn: {

//     width: '40%',
//     height: 45,
//     margin: 20,
//     padding: 6,
//     backgroundColor: 'green',
//     borderRadius: 50,
//     marginBottom: 30
//   },

//   TextStyle: {
//     color: '#fff',
//     fontSize: 18,
//     textAlign: 'center',
//   }
// }
// );