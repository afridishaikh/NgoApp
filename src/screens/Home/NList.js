
import React, { Component } from 'react';
import { Text, Platform, StyleSheet, View, FlatList, ActivityIndicator, Linking, Image, Modal, TouchableOpacity, BackHandler ,ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from 'react-native-paper'

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
        // console.error(error);
        Alert.alert('Network Error !')
      });
  }
// For Modaal Storing and Defining Parameters , which will store the server data 
  ShowModalFunction(visible, image, name, address, mo_no,category,city,email) {
    this.setState({
      ModalVisibleStatus: visible,
      Image: image,
      Iname: name,
      Naddress: address,
      Nmo_no: mo_no,
      NCategory: category,
      Ncity : city,
      Nemail: email
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
      <View style={{ height: 2, width: "100%", backgroundColor: 'darkblue' }}>
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
          // ItemSeparatorComponent={this.renderSeprator}
          renderItem={({ item }) =>

            
            <TouchableOpacity onPress={this.ShowModalFunction.bind(this, true, item.image, item.name, item.address, item.mo_no,item.category,item.city,item.email)} >
              <Card style={styles.mycard}>
                <View style={{flexDirection:'row'}}>
              <Image style={{ width: 100, height: 100, margin: 5,borderRadius:5, borderWidth:2, borderColor:'black', flexDirection: 'row' }} source={{ uri: item.image }} />
              <View style={{justifyContent:'center',alignContent:'center', marginLeft:20}}>
              <Text style={{ fontSize: 15, color: 'black', }}>NGO Name:
                         </Text>
              <Text style={{ fontSize: 18, color: 'darkblue', marginBottom: 15, flexDirection: 'row' }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 15, color: 'black', }}>NGO Service Type:
                         </Text>
              <Text style={{ fontSize: 18, color: 'darkblue', marginBottom: 15, flexDirection: 'row' }}>
                {item.category}
                </Text>
              </View>
              </View>
              </Card>
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
                    activeOpacity={0.3}
                    style={styles.TouchableOpacity_Style}
                    onPress={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus) }}>
                  </TouchableOpacity>
                </View>

                <View style={styles.modalView2}>

                  <Text style={styles .modalFont}>NGO Name
                         </Text>
                  <Text style={styles .modalText}>
                    {this.state.Iname}
                  </Text>


                  <Text style={styles .modalFont}>Address
                         </Text>
                  <Text style={styles .modalText}>
                    {this.state.Naddress}
                  </Text>

                  <Text style={styles .modalFont}>Mobile Number</Text>
                  <Text style={styles .modalText}>
                    {this.state.Nmo_no}
                  </Text>

                  <Text style={styles .modalFont}>Email Address</Text>
                  <Text style={styles .modalText}>
                    {this.state.Nemail}
                  </Text>

                  
                  <Text style={styles .modalFont}>NGO Service Type</Text>
                  <Text style={styles .modalText}>
                    {this.state.NCategory}
                  </Text>

                  <Text style={styles .modalFont}>City</Text>
                  <Text style={styles .modalText}>
                    {this.state.Ncity}
                  </Text>
                

                </View>


                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <TouchableOpacity onPress={() => { this.dialCall(this.state.Nmo_no) }} activeOpacity={0.7} style={styles.buttonn} >
                  <Icon  name="phone" size={35} color="#fff" />
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

  mainImage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  modalView: {
    flexDirection: "column",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
    margin:5,
    backgroundColor: 'black',
    borderRadius:10
  },
  modalView2: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor:'white'
  },

  mycard2: {
    margin:3,
    justifyContent:'space-around',
    borderColor:'white',
    borderBottomColor:'#8803fc',
    borderWidth:1,
    },
  
    cardContent: {
      margin:3,
      flexDirection:'row'
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
  TouchableOpacity_Style: {
    width: 25,
    height: 25,
    top: 9,
    right: 9,
    position: 'absolute',
  },
  buttonn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '35%',
    height: 45,
    backgroundColor: 'green',
    borderRadius: 50,
    marginBottom: 30
  },
  mycard: {
    margin: 5,
    height: 120,
    flexDirection: 'row',
    backgroundColor: '#f7f12f',
    alignItems: 'center',
    borderWidth:2,
    borderBottomColor:'black'

},
  TextStyle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  }
}
);