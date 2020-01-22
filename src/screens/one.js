import React, { Component } from 'react';
import Logsig from '../screens/Logsig'; 
import login from '../screens/login'; 
import signup from '../screens/signup';
import home from '../screens/home';


//Navgation Code
import { createStackNavigator } from 'react-navigation-stack';
import {  createAppContainer } from 'react-navigation';

const MyProject = createStackNavigator(
{

First: { screen: Logsig },
 
Second: { screen: login },

Third: {screen: signup},

Fourth: {screen: home}

});

export default createAppContainer(MyProject);
