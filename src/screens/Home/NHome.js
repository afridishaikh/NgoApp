import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, ScrollView, TouchableHighlight ,BackHandler,ImageBackground} from 'react-native';
import Slider from './slider'

export default class Home extends Component {
      //Adding BackButton Exit Event
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
  }
  handleBackButton() {
    BackHandler.exitApp();
  }

  render() {
    return (

      <View style={styles.container}>
        {/* <ImageBackground source={require('../../assets/bg.jpg')} style={{width:'100%',height:'100%',alignItems:'center'}}> */}
        <View style={styles.slider}>
          {/* <Slider /> */}
        </View>
        <Text> This is NGO's Side Screen </Text>
        <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('Request')}>
          <Text style={styles.loginText}>Requests</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('List')}>
          <Text style={styles.loginText}>Top NGO</Text>
        </TouchableHighlight>
      
      
   
        <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('List')}>
          <Text style={styles.loginText}>Gallery</Text>
        </TouchableHighlight>

        
        <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('List')}>
          <Text style={styles.loginText}>Donation History</Text>
        </TouchableHighlight>
        {/* </ImageBackground> */}
        </View>
    

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
