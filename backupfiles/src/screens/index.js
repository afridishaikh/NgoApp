import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation';


import Splash from './Splash';
import TabIndex from '../Pages/TabIndex';
// import logsig from './Logsig';
// import TabNavigator from './TabNavigator'


// const navigationOptions= {
//   header: null,
// },
   

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
  
})

export default createAppContainer(Index)

