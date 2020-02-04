import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation';


import Splash from './Splash';
import TabIndex from './Pages/TabIndex';
import Signup from './users/signup';

const Index = createStackNavigator({
 
    //Splash
  Splash: {
    screen: Splash
  },
  TabNavigator:{
    screen: TabIndex,
    header:null
  },
}, {
  initialRouteName:'Splash',
  header: null,
  headerMode: 'none'
})

export default createAppContainer(Index)

