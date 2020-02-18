import React, { Component } from 'react';
import Home from './Home' ;
import Request from './Request';
import List from './List'


import { createStackNavigator } from 'react-navigation-stack';
import {  createAppContainer } from 'react-navigation';

const MyProject = createStackNavigator(
{

 Home: { screen: Home},
 Request: {screen: Request},
 List: {screen: List}


},
{
    initialRouteName:'Home',
    headerMode:'none',
    
  })


export default createAppContainer(MyProject)
