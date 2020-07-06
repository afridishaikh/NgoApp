import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  FlatList,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  animating,
  TextInput,
  Alert
} from 'react-native';
import { Card } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from '../../../config'
import RNFetchBlob from 'rn-fetch-blob';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      modal: false,
      upidata: '',
      id: null,
      dataArray: [],
      loading: false,
      profile: false,
      upimodal: false,
    };
  }

  //To store AsyncStorage value in state.
  componentDidMount() {
    AsyncStorage.getItem('username').then(value =>
      this.setState({ username: value, isLoading: false })
    );
  }

  profile = async() => {
   await this.setState({
    loading: true,
     
    })
    const { username } = this.state;
    const root = firebase.database().ref();
    const dataa = root.child('NgoData').orderByChild('email').equalTo(username);
    // Here is the magic
   await dataa.on('value', Snapshot => {
      Snapshot.forEach(item => {
        this.state.dataArray.push({ id: item.key, ...item.val() })

        this.setState({
          id: item.key,
        })
      })

      this.setState({
        loading: false,
        modal: true,
        profile: true,
      })
    });
  }

  storename = () => {
    const username = this.state.username;
    const root = firebase.database().ref();
    const dataa = root.child('NgoData').orderByChild('email').equalTo(username);
    dataa.on('value', Snapshot => {
      Snapshot.forEach(item => {
        AsyncStorage.setItem('n_name', item.val().name);
      })
    });

  }

  upi = () => {
    this.setState({
      upimodal: true,
    })
  }

  upiSet =() => {
    this.setState({
      loading: true,
    });

    if (this.state.upidata == '' || this.state.username == '') {
      Alert.alert('Input Fields should not be Empty !');
      this.setState({
        loading: false,
      })

    }
    else {
      const root = firebase.database().ref();
      const data = root.child('NgoData').child(this.state.id)
      data.update({ 'upi': this.state.upidata })

      this.setState({
        loading: false,
        profile: false,
        modal: false,
        upimodal:false,
      })
      this.props.navigation.goBack();
      Alert.alert('UPI is Updated !', 'Your UPI ID is updated !')

    }
  }



  render() {
    console.warn(this.state.dataArray)
    if (this.state.loading) {
      return (
        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', }}>
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
      <View style={styles.container1}>
        <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
          <TouchableOpacity onPress={this.profile}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
              <Image style={styles.avatar2} source={require('../../assets/images/user.jpg')} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.container2}>
          <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => { this.props.navigation.navigate('ReqList'), this, this.storename() }}>
            <Text style={styles.loginText}>Request List</Text>
          </TouchableHighlight>

          <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('NStatus')}>
            <Text style={styles.loginText}>Your Activity</Text>
          </TouchableHighlight>


          <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('Gallery')}>
            <Text style={styles.loginText}>Image Gallery</Text>
          </TouchableHighlight>


          <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('How')}>
            <Text style={styles.loginText}>How To Use ?</Text>
          </TouchableHighlight>


          {/* FOR PROFILE */}
          <FlatList
            data={this.state.dataArray}
            ItemSeparatorComponent={this.renderSeprator}
            renderItem={({ item }) =>
              <Modal
                transparent={false}
                animationType="none"
                visible={this.state.modal}
                onRequestClose={() => { this.setState({ modal: false }); }} >


                {this.state.profile &&
                  <View style={styles.container}>
                    <View style={styles.header}></View>
                    <Image style={styles.avatar} source={require('../../assets/images/user.jpg')} />
                    <View style={styles.body}>
                      <View style={styles.bodyContent}>
                        <Text style={styles.name}> {item.name}</Text>
                      </View>



                      <Card style={styles.mycard}>
                        <View style={styles.cardContent}>
                          <Icon style={styles.Icon} name="mobile" size={25} color="" />
                          <Text style={{ alignItems: 'center', fontSize: 17, paddingTop: 12 }}> {item.mo_no} </Text>
                        </View>
                      </Card>

                      <Card style={styles.mycard}>
                        <View style={styles.cardContent}>
                          <Icon style={styles.Icon} name="envelope" size={20} />
                          <Text style={{ alignItems: 'center', fontSize: 17, paddingTop: 12 }}> {item.email} </Text>
                        </View>
                      </Card>


                      <Card style={styles.mycard}>
                        <View style={styles.cardContent}>
                          <Icon style={styles.Icon} name="qrcode" size={20} />
                          <Text style={{ alignItems: 'center', fontSize: 17, paddingTop: 12 }}> {item.upi} </Text>
                          <View style={{ flexDirection: 'row', paddingTop: 3, paddingLeft: 160 }}>


                          </View>

                        </View>
                      </Card>

                    </View>
                    <View style={{ flexDirection: 'row-reverse' }}>
                      <TouchableOpacity style={[styles.buttonContainer2, styles.upiButton]}
                        onPress={this.upi}
                      >
                        <Text style={{ color: 'white' }}>Your UPI</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                      <TouchableOpacity style={[styles.buttonContainer, styles.logoutButton]}
                        onPress={this._logout}
                      >
                        <Text style={{ color: 'white' }}>Logout</Text>
                      </TouchableOpacity>
                    </View>

                  </View>
                }


              </Modal>
            }
            keyExtractor={(item, index) => index}
          />

          {
            this.state.upimodal
              ?
              (
                <Modal
                  transparent={false}
                  animationType={"fade"}
                  visible={this.state.upimodal}
                  onRequestClose={() => { this.setState({ upimodal: false }); }} >



                  <View style={{
                    flex: 1, justifyContent: 'center',
                    alignItems: 'center'
                  }}>


                    <View style={{
                      backgroundColor: '#bc2b78',
                      justifyContent: 'center',
                      alignContent: 'center',
                      marginBottom: 50,
                      margin: 10,
                      borderColor: 'black',
                      borderWidth: 2
                    }}>
                      <Text style={[styles.loginText, { fontSize: 18 }]} >Add or Update Your UPI ID</Text>
                    </View>

                    <Text>*User Will be use this UPI address for the Donation</Text>

                    <View style={styles.inputContainer}>

                      <TextInput style={styles.inputs}
                        autoCapitalize="none"
                        placeholder="   Enter Your UPI Address   "
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(upidata) => this.setState({ upidata })}
                        value={this.state.upidata} />
                    </View>
                    <TouchableOpacity style={[styles.buttonContainer, styles.innUpiButton]}
                      onPress={this.upiSet}
                    >
                      <Text style={{ color: 'white' }}>Update Your UPI</Text>
                    </TouchableOpacity>

                  </View>


                </Modal>
              )
              :
              null
          }

        </View>

      </View>

    );
  }
  _logout = async () => {

    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#dcdcdc'
  },
  container2: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profile: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    width: 70,
    borderRadius: 50,
    margin: 10
  },
  Icon: {
    padding: 10,
    justifyContent: 'space-around',
    color: '#373b6e'
  },
  avatar2: {
    width: 60,
    height: 60,
    borderRadius: 63,
    borderWidth: 2,
    margin: 3,
    borderColor: "black",
    marginBottom: 80,
    marginRight: 10,
    alignSelf: 'center',
    // marginTop: 130
  },
  Button: {
    backgroundColor: "#694fad"
  },
  loginText: {
    color: 'white',
  },
  slider: {
    justifyContent: 'center',
    flex: 1,
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

  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    // marginLeft:60
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
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

  mycard: {
    margin: 3,
    justifyContent: 'space-around',
    borderColor: 'white',
    borderBottomColor: '#8803fc',
    borderWidth: 1,
  },

  cardContent: {
    margin: 3,
    flexDirection: 'row'
  },


  TextStyle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  header: {
    backgroundColor: "#8803fc",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
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

  buttonContainer2: {
    height: 30,
    marginLeft: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    borderRadius: 30,
  },

  logoutButton: {
    margin: 20,
    // marginLeft: 10,
    marginBottom: 50,
    width: 150,
    backgroundColor: "#8803fc",
    borderWidth: 2,
    borderColor: '#000'
  },

  innUpiButton: {
    margin: 20,
    marginBottom: 50,
    width: 150,
    backgroundColor: "#8803fc",
    borderWidth: 2,
    borderColor: '#000'
  },

  upiButton: {
    width: 80,
    marginLeft: 100,
    backgroundColor: "#8803fc",
    borderWidth: 2,
    borderColor: '#000'
  },

});