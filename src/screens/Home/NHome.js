import React, { Component } from 'react';
import { StyleSheet, 
  Text, 
  View, 
  Button, 
  Image, 
  TextInput, 
  ScrollView, 
  TouchableHighlight ,
  BackHandler,
  ImageBackground,
  FlatList,
  Modal,
  TouchableOpacity
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

export default class Home extends Component {
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
  fetch('https://ngoapp3219.000webhostapp.com/db/n_profile.php', {
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

      <View style={styles.container1}>
        {/* <ImageBackground source={require('../../assets/bg.jpg')} style={{width:'100%',height:'100%',alignItems:'center'}}> */}
        <View style={styles.slider}>
          {/* <Slider /> */}
        </View>

          {/* FOR PROFILE */}

                
        <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={this.profile}>
          <Text style={styles.loginText}>Profile</Text>
        </TouchableHighlight>

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

        <Text> This is NGO's Side Screen </Text>
        <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('ReqList')}>
          <Text style={styles.loginText}>Requests</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('List')}>
          <Text style={styles.loginText}>Top NGO</Text>
        </TouchableHighlight>
      
      
   
        <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('List')}>
          <Text style={styles.loginText}>Gallery</Text>
        </TouchableHighlight>

        
        <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('NStatus')}>
          <Text style={styles.loginText}>STATUS</Text>
        </TouchableHighlight>
        {/* </ImageBackground> */}

        <TouchableHighlight style={[styles.buttonContainer, styles.Button]} 
        onPress={this._logout}
        // onPress={()=> this.props.navigation.navigate('Home')}
        >
             <Text style={styles.loginText}>LogOut</Text>
        </TouchableHighlight> 

        </View>
    

    );
  }
  _logout = async() => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
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



// import React, { Component } from 'react';
// import { StyleSheet, Text, View, Button, Image, TextInput, ScrollView, TouchableHighlight ,BackHandler,ImageBackground} from 'react-native';
// import Slider from './slider'
// import AsyncStorage from '@react-native-community/async-storage';

// export default class Home extends Component {

//   //     //Adding BackButton Exit Event
//   // componentDidMount() {
//   //   BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
//   // }
//   // handleBackButton() {
//   //   BackHandler.exitApp();
//   // }

//   render() {

//     return (

//       <View style={styles.container}>
//         {/* <ImageBackground source={require('../../assets/bg.jpg')} style={{width:'100%',height:'100%',alignItems:'center'}}> */}
//         <View style={styles.slider}>
//           {/* <Slider /> */}
//         </View>
//         <Text> This is NGO's Side Screen </Text>
//         <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('ReqList')}>
//           <Text style={styles.loginText}>Requests</Text>
//         </TouchableHighlight>

//         <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('List')}>
//           <Text style={styles.loginText}>Top NGO</Text>
//         </TouchableHighlight>
      
      
   
//         <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('List')}>
//           <Text style={styles.loginText}>Gallery</Text>
//         </TouchableHighlight>

        
//         <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('List')}>
//           <Text style={styles.loginText}>Donation History</Text>
//         </TouchableHighlight>
//         {/* </ImageBackground> */}

//         <TouchableHighlight style={[styles.buttonContainer, styles.Button]} 
//         onPress={this._logout}
//         // onPress={()=> this.props.navigation.navigate('Home')}
//         >
//              <Text style={styles.loginText}>LogOut</Text>
//         </TouchableHighlight> 

//         </View>
    

//     );
//   }
//   _logout = async() => {

//     // await AsyncStorage.setItem('isLoggedIn','0');
//     await AsyncStorage.clear();
//     this.props.navigation.replace('Auth')
// }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // backgroundColor: '#DCDCDC',
//   },
//   buttonContainer: {
//     height: 50,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 30,
//     width: 250,
//     borderRadius: 30,
//   },
//   Button: {
//     backgroundColor: "#980953",
//   },
//   loginText: {
//     color: 'white',
//   },
//   slider:{
//     justifyContent:'center',
//     flex: 1, 
//   }
// });
