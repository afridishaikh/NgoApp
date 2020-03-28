import React, { Component } from 'react';
import { SafeAreaView,StyleSheet, Text, View, Button, Image, TextInput, ScrollView, TouchableHighlight ,BackHandler,ImageBackground} from 'react-native';
import Slider from './slider'


class Home extends Component {
//   componentDidMount() {
//     BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
// }
// handleBackButton(){
//           BackHandler;
//       }

  //Adding BackButton Exit Event
  
  // componentDidMount() {
  //   BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
  // }
  // handleBackButton() {
  //   BackHandler.exitApp();
  // }
  render() {
    return (

      // <View style={styles.container}>
      <SafeAreaView>

        <ImageBackground source={require('../../assets/bg1.jpg')} style={{width:'100%',height:'100%',alignItems:'center'}}>
        <View style={styles.slider}>
          <Slider />
        </View>
        <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('Request')}>
          <Text style={styles.loginText}>Post A Request</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('List')}>
          <Text style={styles.loginText}>List Of NGO</Text>
        </TouchableHighlight>
      
      
   
        <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('List')}>
          <Text style={styles.loginText}>Option 3</Text>
        </TouchableHighlight>

        
        <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('List')}>
          <Text style={styles.loginText}>Donate to NGO</Text>
        </TouchableHighlight>
        </ImageBackground>
        </SafeAreaView>
        // </View>
    

    );
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