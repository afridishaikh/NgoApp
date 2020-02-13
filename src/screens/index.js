import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';

import Splash from './Splash';
import TabIndex from './Pages/TabIndex';



const Index = createStackNavigator({

//Screens goes here
        Splash: {
          screen: Splash
        },
        TabNavigator: {
          screen: TabIndex,
        },
},
//Navigation Options
  {
    initialRouteName: 'Splash',
    header: null,
    headerMode: 'none'
  })

export default createAppContainer(Index)

