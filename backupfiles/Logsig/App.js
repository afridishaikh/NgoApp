import React, { Component } from 'react';
//import MainActivity from './Modules/MainActivity' ;
//import SecondActivity from './Modules/SecondActivity' ;
//import {Text,View} from 'react-native';
import Logsig from './src/screens/Logsig'; 
import login from './src/screens/login'; 
import signup from './src/screens/signup';
         
//Navgation Code
import { createStackNavigator } from 'react-navigation-stack';
import {  createAppContainer } from 'react-navigation';

const MyProject = createStackNavigator(
{

First: { screen: Logsig },
 
Second: { screen: login },

Third: {screen: signup}

});

export default createAppContainer(MyProject);




//....................................
// const MyProject = createStackNavigator(
// {

//  First: { screen: Logsig },
 
//  Second: { screen: login }

// });

// export default createAppContainer(MyProject)

