import React, { Component } from 'react';
import {
  SafeAreaView, StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  BackHandler,
  ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { IconButton, Colors } from 'react-native-paper';
import Slider from './slider'

class Home extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.slider}>
          <Slider />
        </View>
        
        <TouchableOpacity style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('List')}>
          <Text style={styles.buttonText}>NGO List</Text>
        </TouchableOpacity>
        
            
        <TouchableOpacity style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('Gallery')}>
          <Text style={styles.buttonText}>Image Gallery</Text>
        </TouchableOpacity>

        <TouchableHighlight style={[styles.buttonContainer, styles.Button]} onPress={() => this.props.navigation.navigate('How')}>
          <Text style={styles.buttonText}>How to Use ?</Text>
        </TouchableHighlight>

        <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>

                  <TouchableOpacity style={[styles.buttonCon, styles.Button2]} activeOpacity={0.7} onPress={() => this.props.navigation.navigate('Login')} >
                    <Icon name="user" size={17} color="#fff" />
                    <Text style={styles.buttonText}>Login as User</Text>
                  </TouchableOpacity>
         
          <Text style={{ fontWeight: 'bold', letterSpacing: 2 }}>OR</Text>
          <TouchableOpacity style={[styles.buttonCon, styles.Button2]} activeOpacity={0.7} onPress={() => this.props.navigation.navigate('Nlogin')}>
                    <Icon name="users" size={17} color="#fff"  />
                    <Text style={styles.buttonText}>Login as NGO</Text>
                  </TouchableOpacity>
         


        </View>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#DCDCDC'
  },
  buttonContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    width: 230,
    borderRadius: 30,
  },
  buttonCon: {
    height: 50,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    // marginLeft:10,
    margin: 30,
    width: 120,
    borderRadius: 10,
  },
  Button: {
    backgroundColor: "#694fad",

  },
  Button2: {
    backgroundColor: "#00ab5e",
    borderWidth: 2,
    borderColor: 'black'
  },
  buttonText: {
    color: 'white',
  },
  slider: {
    justifyContent: 'center',
    flex: 1,
  }
});

export default Home;