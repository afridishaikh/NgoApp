import React, { Component } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, Linking, Platform } from 'react-native';

export default class mainapp extends Component {

  dialCall = () => {

    let phoneNumber = '123';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${1234567890}';
    }
    else {
      phoneNumber = 'telprompt:${1234567890}';
    }

    Linking.openURL(phoneNumber);
  };

  render() {
    return (
      <View style={styles.MainContainer}>

        <TouchableOpacity onPress={this.dialCall} activeOpacity={0.7} style={styles.button} >

          <Text style={styles.TextStyle}>OPEN PHONE NUMBER IN DIAL SCREEN</Text>

        </TouchableOpacity>

      </View>

    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {

    width: '80%',
    padding: 6,
    backgroundColor: '#FF6F00',
    borderRadius: 7,
  },

  TextStyle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  }

});