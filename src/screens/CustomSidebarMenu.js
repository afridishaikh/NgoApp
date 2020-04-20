import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
export default class CustomSidebarMenu extends Component {
  constructor() {
    super();

    this.items = [
      {
        navOptionThumb: 'home',
        navOptionName: 'Home',
        screenToNavigate: 'Screen1',
      },
      {
        navOptionThumb: 'list-ul',
        navOptionName: 'NGO List',
        screenToNavigate: 'Screen2',
      },
      {
        navOptionThumb: 'question-circle',
        navOptionName: 'How to Use ?',
        screenToNavigate: 'Screen3',
      },
      {
        navOptionThumb: 'comments',
        navOptionName: 'Feedback',
        screenToNavigate: 'Screen4',
      },
      {
        navOptionThumb: 'address-card',
        navOptionName: 'About Us',
        screenToNavigate: 'Screen5',
      },
    ];

 

  }
  
  render() {
    return (
      <View style={styles.sideMenuContainer}>
        
        <Image
          source={require('../assets/images/bgdra.jpg')}
          style={styles.sideMenuProfileIcon}
        />


  
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#e2e2e2',
            marginTop: 15,
          }}
        />
        {/*Setting up Navigation Options from option array using loop*/}
        <View style={{ width: '100%' }}>
          {this.items.map((item, key) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: global.currentScreenIndex === key ? '#e0dbdb' : '#ffffff',
              }}

              key={key}
              onPress={() => {
                global.currentScreenIndex = key;
                this.props.navigation.navigate(item.screenToNavigate);
              }}
              >
              <View style={{ marginRight: 10, marginLeft: 20 }}>
                <Icon name={item.navOptionThumb} size={25} color="#808080" />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  color: global.currentScreenIndex === key ? '#00aaff' : 'black',
                }}
    
                >
                {item.navOptionName}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    // paddingTop: 20,
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 490,
    height: 155,
    // marginTop: 20,
    // borderRadius: 150 / 2,
  },
});