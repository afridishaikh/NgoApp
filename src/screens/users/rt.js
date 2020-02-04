import React, { Component } from 'react';


import MainActivity from './MainActivity' ;


import SecondActivity from './SecondActivity' ;
import Signup from './signup'

import { createStackNavigator } from 'react-navigation-stack';
import {  createAppContainer } from 'react-navigation';




const MyProject = createStackNavigator(
{

 First: { screen: MainActivity},
 
 Second: { screen: SecondActivity },

 Signup: {screen: Signup}

},
{
    initialRouteName:'First',
    headerMode:'none',
    
  })


export default createAppContainer(MyProject)

