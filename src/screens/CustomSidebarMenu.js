//This is an example code for Navigation Drawer with Custom Side bar//
import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
export default class CustomSidebarMenu extends Component {
  constructor() {
    super();


    this.state = {username: null};
    

    //Setting up the Main Top Large Image of the Custom Sidebar
    this.proileImage =
      'https://aboutreact.com/wp-content/uploads/2018/07/sample_img.png';
    this.items = [
      {
        navOptionThumb: 'home',
        navOptionName: 'Home',
        screenToNavigate: 'Screen1',
      },
      {
        navOptionThumb: 'image',
        navOptionName: 'NGO List',
        screenToNavigate: 'Screen2',
      },
      {
        navOptionThumb: 'build',
        navOptionName: 'How to Use ?',
        screenToNavigate: 'Screen3',
      },
      {
        navOptionThumb: 'pencil',
        navOptionName: 'Feedback',
        screenToNavigate: 'Screen4',
      },
      {
        navOptionThumb: 'pencil',
        navOptionName: 'About Us',
        screenToNavigate: 'Screen5',
      },
    ];

 

  }

  componentDidMount() {
    AsyncStorage.getItem('username').then(value =>
      //AsyncStorage returns a promise so adding a callback to get the value
      this.setState({ username: value})
      //Setting the value in Text  
    );
  }

  
  render() {
    return (
      <View style={styles.sideMenuContainer}>
        {/*Top Large Image */}
        <Image
          source={{ uri: this.proileImage }}
          style={styles.sideMenuProfileIcon}
        />

<Text style={styles.text}> username: {this.state.username} </Text>

        {/*Divider between Top Image and Sidebar Option*/}
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: global.currentScreenIndex === key ? '#e0dbdb' : '#ffffff',
              }}
              key={key}>
              <View style={{ marginRight: 10, marginLeft: 20 }}>
                <Icon name={item.navOptionThumb} size={25} color="#808080" />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  color: global.currentScreenIndex === key ? 'red' : 'black',
                }}
                onPress={() => {
                  global.currentScreenIndex = key;
                  this.props.navigation.navigate(item.screenToNavigate);
                }}>
                {item.navOptionName}
              </Text>
            </View>
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
    backgroundColor: 'grey',
    alignItems: 'center',
    paddingTop: 20,
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 150,
    height: 150,
    marginTop: 20,
    borderRadius: 150 / 2,
  },
});