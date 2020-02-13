import React, { Component } from 'react';
import Login from './login' ;
import Signup from './signup'
import Profile from './Profile';

import { createStackNavigator } from 'react-navigation-stack';
import {  createAppContainer } from 'react-navigation';




const MyProject = createStackNavigator(
{

 First: { screen: Login},
 Signup: {screen: Signup},
 Profile: {screen: Profile}


},
{
    initialRouteName:'First',
    headerMode:'none',
    
  })


export default createAppContainer(MyProject)

