// import React, { Component } from 'react';
// import { withNavigationFocus } from 'react-navigation';
// import AsyncStorage from '@react-native-community/async-storage';
// import { SafeAreaView,StyleSheet, Text, View, Alert,Button, Image, TextInput, ScrollView, TouchableHighlight ,BackHandler,ImageBackground} from 'react-native';
// import Slider from './slider'


// class Home extends Component {

//   // componentWillMount() {
//   //   BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
//   // }

//   // componentWillUnmount() {
//   //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
//   // }

//   // handleBackButton = () => {
//   //   if (this.props.navigation.goBack(null)) {
//   //     Alert.alert(
//   //       'Exit App',
//   //       'Exiting the application?',
//   //       [
//   //         {
//   //           text: 'Cancel',
//   //           onPress: () => console.log('Cancel Pressed'),
//   //           style: 'cancel'
//   //         },
//   //         {
//   //           text: 'OK',
//   //           onPress: () => BackHandler.exitApp()
//   //         }
//   //       ],
//   //       {
//   //         cancelable: false
//   //       }
//   //     );
//   //     return true;
//   //   }
//   // };
  

//   // // Adding BackButton Exit Event
  
//   // componentDidMount() {
//   //   BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
//   // }
//   // handleBackButton() {
//   //   if(this.props.navigation.goBack(null)){
//   //   BackHandler.exitApp();
//   //   }
    

//   // }

  
// //   // working fine
// // constructor(props) {
// //   super(props)
// //   this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
// // }

// // componentWillMount() {
// //   BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
// // }

// // componentWillUnmount() {
// //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
// // }

// // handleBackButtonClick() {
// //   if(
// //   this.props.navigation.navigate('Login'))
// //   return true;

// // }


// // onButtonPress = () => {
// //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
// //   // then navigate
// //   this.navigate.navigate('UHome');
// // }

// // handleBackButton = () => {
  
// //       this.props.navigation.goBack(null)
      
// //  Alert.alert(
// //      'Exit App',
// //      'Exiting the application?', [{
// //          text: 'Cancel',
// //          onPress: () => console.log('Cancel Pressed'),
// //          style: 'cancel'
// //      }, {
// //          text: 'OK',
// //          onPress: () => BackHandler.exitApp()
// //      }, ], {
// //          cancelable: false
// //      }
// //   )
// //   return true;
    

// // } 

// // componentDidMount() {
// //   BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
// // }

// // componentWillUnmount() {
// //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
// // }




//   render() {
//     return (

//       // <View style={styles.container}>
//       <SafeAreaView>

//         <ImageBackground source={require('../../assets/bg1.jpg')} style={{width:'100%',height:'100%',alignItems:'center'}}>
//         <View style={styles.slider}>
//           <Slider />
//         </View>
//         <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('Request')}>
//           <Text style={styles.loginText}>Post A Request</Text>
//         </TouchableHighlight>

//         <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('List')}>
//           <Text style={styles.loginText}>List Of NGO</Text>
//         </TouchableHighlight>
      
//         <Text style={styles.text}> lol: {this.state.username} </Text>
      
   
//         <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('List')}>
//           <Text style={styles.loginText}>Option 3</Text>
//         </TouchableHighlight>

//         <TouchableHighlight style={[styles.buttonContainer, styles.Button]} 
//         onPress={this._logout}
//         // onPress={()=> this.props.navigation.navigate('Home')}
//         >
//              <Text style={styles.loginText}>LogOut</Text>
//         </TouchableHighlight> 


        
//         <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('List')}>
//           <Text style={styles.loginText}>Donate to NGO</Text>
//         </TouchableHighlight>
//         </ImageBackground>
//         </SafeAreaView>
//         // </View>
    

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

// export default Home;





import React, { Component } from 'react';
import { withNavigationFocus } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView,StyleSheet, Text, View, Alert,Button, TouchableOpacity,Image, TextInput, ScrollView, TouchableHighlight ,BackHandler,ImageBackground} from 'react-native';
// import Slider from './slider'


class Home extends Component {
    constructor(props) {
    super(props);
    this.state = {username: null};
    // this.loadCredentials();
}

  //To store AsyncStorage value in state.
  componentDidMount() {
    AsyncStorage.getItem('username').then(value =>
      //AsyncStorage returns a promise so adding a callback to get the value
      this.setState({ userid: value , isLoading:false})
      //Setting the value in Text  
    );
  }


// async loadCredentials() {
//     try {
//         const username = await AsyncStorage.getItem('IsLoggedIN');
//         this.setState({username: username,  userid:''});
//     }
//     catch (error) {
//         // Manage error handling
//     }
// }

  render() {
    return (


      <SafeAreaView style={styles.container}>

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
   
        <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('List')}>
          <Text style={styles.loginText}>Option 3</Text>
        </TouchableHighlight>

        
        <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('List')}>
          <Text style={styles.loginText}>Donate to NGO</Text>
        </TouchableHighlight>
        {/* </ImageBackground> */}

        
        <TouchableHighlight style={[styles.buttonContainer, styles.Button]} 
        onPress={this._logout}
        // onPress={()=> this.props.navigation.navigate('Home')}
        >
             <Text style={styles.loginText}>LogOut</Text>
        </TouchableHighlight> 

        <Text style={styles.text}> lol: {this.state.userid} </Text>



        </SafeAreaView>

    

    );
  }
  getValueFunction = () => {
    console.warn( AsyncStorage.getItem('IsLoggedIN'))
    //function to get the value from AsyncStorage
    AsyncStorage.getItem('IsLoggedIN').then(value =>
      //AsyncStorage returns a promise so adding a callback to get the value
      this.setState({ getValue: value })
      //Setting the value in Text 
    );}

  _logout = async() => {

    // await AsyncStorage.setItem('isLoggedIn','0');
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth')
}
}

const styles = StyleSheet.create({
  container: {
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
  }
});

export default Home;