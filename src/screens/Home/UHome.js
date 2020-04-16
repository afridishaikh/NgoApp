import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView,StyleSheet, Text, View,Modal, FlatList,Alert,Button, TouchableOpacity,Image, TextInput, ScrollView, TouchableHighlight ,BackHandler,ImageBackground} from 'react-native';
// import Slider from './slider'

class Home extends Component {
    constructor(props) {
    super(props);
    this.state = {
      username: null,
      modal:false
  };
}

  //To store AsyncStorage value in state.
  componentDidMount() {
    AsyncStorage.getItem('username').then(value =>
      //AsyncStorage returns a promise so adding a callback to get the value
      this.setState({ username: value , isLoading:false})
      //Setting the value in Text  
    );
  }

  profile=()=>{
  const { username } = this.state;
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
          dataSource: responseJson,
          modal: true,
        })
      }
      else {
        alert('Please Login Again');
        //alert for the empty InputText
      }
    }
    ).catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (


      <SafeAreaView style={styles.container1}>

  {/* <ImageBackground source={require('../../assets/bg1.jpg')} style={{width:'100%',height:'100%',alignItems:'center'}}> */}
        <View style={styles.slider}>
          {/* <Slider /> */}
        </View>
        <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('Request')}>
          <Text style={styles.loginText}>Post A Request</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('List')}>
          <Text style={styles.loginText}>List Of NGO</Text>
        </TouchableHighlight>
      
        <View>
</View>
   
        
<TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('UStatus')}>
          <Text style={styles.loginText}>STATUS</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('Gallery')}>
          <Text style={styles.loginText}>Gallery</Text>
        </TouchableHighlight>

        
        <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('List')}>
          <Text style={styles.loginText}>Donate to NGO</Text>
        </TouchableHighlight>
        {/* </ImageBackground> */}

           
        <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={this.profile}>
          <Text style={styles.loginText}>Profile</Text>
        </TouchableHighlight>
   
      {/* FOR PROFILE */}
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.renderSeprator}
          renderItem={({ item }) =>
            <Modal
              transparent={false}
              animationType="none"
              // visible={this.state.ModalVisibleStatus}
              visible={this.state.modal}
              onRequestClose={() => { this.setState({ modal: false}); }} >

              <View style={styles.container}>
                <View style={styles.header}></View>
                <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
                <View style={styles.body}>
                  <View style={styles.bodyContent}>
                    <Text style={styles.name}> {item.name} {this.state.Iname}</Text>
                    <Text style={styles.info}> {item.mo_no} </Text>
                    <Text style={styles.description}>{item.email} </Text>

                    <TouchableOpacity style={styles.buttonContainer}
                    onPress={this._logout}
                    >
                      <Text>LOGOUT </Text>
                    </TouchableOpacity>
                  </View>
                </View>

              </View>

            </Modal>
          }
          keyExtractor={(item, index) => index}
        />



        



        </SafeAreaView>

    

    );
  }


  _logout = async() => {

    // await AsyncStorage.setItem('isLoggedIn','0');
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth')
}
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#DCDCDC',
  },
  buttonContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    width: 250,
    borderRadius: 30,
  },
  Button: {
    backgroundColor: "#980953",
  },
  loginText: {
    color: 'white',
  },
  slider:{
    justifyContent:'center',
    flex: 1, 
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
    backgroundColor: "#00BFFF",
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
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
});

export default Home;