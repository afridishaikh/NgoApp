import React, { Component } from 'react';
import { SafeAreaView,StyleSheet, Text, View, Button, Image, TextInput, ScrollView, TouchableHighlight ,BackHandler,ImageBackground} from 'react-native';
import Slider from './slider'


class Home extends Component {
  render() {
    return (

      // <View style={styles.container}>
      <SafeAreaView>

        <ImageBackground source={require('../../assets/bg1.jpg')} style={{width:'100%',height:'100%',alignItems:'center'}}>
        <View style={styles.slider}>
          <Slider />
        </View>

        {/* <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('Request')}>
          <Text style={styles.loginText}>Post A Request</Text>
        </TouchableHighlight> */}

        <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('List')}>
          <Text style={styles.loginText}>List Of NGO</Text>
        </TouchableHighlight>


        <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('Gallery')}>
          <Text style={styles.loginText}>Image Gallery</Text>
        </TouchableHighlight>
      
      
        <View style={{ flexDirection: 'row',alignItems:'center',alignContent:'center'}}>
        <TouchableHighlight style={[styles.buttonCon, styles.Button2]} onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.loginText}>Login As User</Text>
        </TouchableHighlight>

        <Text style={{fontWeight:'bold',letterSpacing:2,textDecorationLine:'underline'}}>OR</Text>

        <TouchableHighlight style={[styles.buttonCon, styles.Button2]} onPress={() => this.props.navigation.navigate('Nlogin')}>
          <Text style={styles.loginText}>Login As NGO</Text>
        </TouchableHighlight>
        </View>
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
  buttonCon: {
    height: 50,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    // marginLeft:10,
    margin:30,
    width: 120,
    borderRadius: 10,
  },
  Button: {
    backgroundColor: "#980953",
 
  },
  Button2: {
    backgroundColor: "green",
    borderWidth: 2,
    borderColor: 'black'
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