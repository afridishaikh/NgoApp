import React, { Component } from 'react';
import Home from './Home' ;
// import Request from './Request';
import List from './List';
import NHome from './NHome';
// import RList from './ReqList'
import UHome from './UHome'
import { createStackNavigator } from 'react-navigation-stack';
import {  createAppContainer } from 'react-navigation';

const MyProject = createStackNavigator(
{

 Home: { screen: Home},
//  Request: {screen: Request},
 List: {screen: List},
 NHome:{screen: NHome},
//  RList:{screen: RList},
UHome: {screen: UHome},
// Utabs: {screen: Utabs}

},
{
    initialRouteName:'NHome',
    headerMode:'none',
    
  })


export default createAppContainer(MyProject)

