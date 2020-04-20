import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Card } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  Alert,
  ActivityIndicator,
  animating,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  BackHandler,
  ImageBackground
} from 'react-native';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      modal: false,
      loading: false,
      profile: false
    };
  }
  //To store AsyncStorage value in state.
  componentDidMount() {
    AsyncStorage.getItem('username').then(value =>
      //AsyncStorage returns a promise so adding a callback to get the value
      this.setState({ username: value, isLoading: false })
      //Setting the value in Text  
    );
  }
  //Function to Open PROFILE
  profile = () => {
    const { username } = this.state;
    this.setState({
      modal: true,
      loading: true,
      profile: false
    })
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
          this.setState({
            dataSource: responseJson,
            loading: false,
            profile:true
          })
      }
      ).catch((error) => {
        // console.error(error);
        Alert.alert("Network Error !");
        this.setState({
          loading: false
        })
      });
  }

  render() {
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
          <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('Request')}>
            <Text style={styles.loginText}>Post A Request</Text>
          </TouchableHighlight>

          <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('UStatus')}>
            <Text style={styles.loginText}>Your Activity</Text>
          </TouchableHighlight>

          <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('List')}>
            <Text style={styles.loginText}>NGO List</Text>
          </TouchableHighlight>
          <View>
          </View>


          <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('Gallery')}>
            <Text style={styles.loginText}>Image Gallery</Text>
          </TouchableHighlight>


          <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('Donate')}>
            <Text style={styles.loginText}>Donate to NGO</Text>
          </TouchableHighlight>

        </View>


        {/* FOR PROFILE */}
        <FlatList
          data={this.state.dataSource}
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
                      <Icon style={styles.Icon} name="user" size={20} />
                      <Text style={{alignItems:'center', fontSize:17,paddingTop:10}}> {item.username} </Text>
                      </View>
                      </Card>

                      <Card style={styles.mycard}>
                      <View style={styles.cardContent}>
                      <Icon style={styles.Icon} name="mobile" size={25} color="" />
                      <Text style={{alignItems:'center', fontSize:17,paddingTop:12}}> {item.mo_no} </Text>
                      </View>
                      </Card>

                      <Card style={styles.mycard}>
                      <View style={styles.cardContent}>
                      <Icon style={styles.Icon} name="envelope" size={20} />
                      <Text style={{alignItems:'center', fontSize:17,paddingTop:12}}> {item.email} </Text>
                      </View>
                      </Card>

                  </View>

                  <TouchableOpacity style={[styles.buttonContainer, styles.signupButton]}
                          onPress={this._logout}
                        >
                          <Text style={{color: 'white'}}>Logout</Text>
                        </TouchableOpacity>

                </View>
              }


            </Modal>
          }
          keyExtractor={(item, index) => index}
        />
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
    backgroundColor:'#DCDCDC',
  },
  container2: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 10
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
    justifyContent:'space-around',
    color: '#373b6e'
  },
  Button: {
    backgroundColor: "#694fad",
  },
  loginText: {
    color: 'white',
  },
  slider: {
    justifyContent: 'center',
    flex: 1,
  },
  mycard: {
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

   buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
},

signupButton: {
    margin: 20,
    marginLeft: 110,
    marginBottom: 50,
    width: 150,
    backgroundColor: "#8803fc",
    borderWidth: 2,
    borderColor: '#000'
},

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
    padding:30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#8803fc",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },

});

export default Home;