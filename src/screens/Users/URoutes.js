import React, { Component } from 'react';
import Login from './login';
// import Signup from './signup'
import Profile from './Profile';
import Nsignup from './n_signup';
import Nlogin from './n_login';
import NHome from '../Home/NHome'
// import Request from '../Home/Request'

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

const MyProject = createStackNavigator(
  {

    // Login: { screen: Login },
    // Signup: { screen: Signup },
    Profile: { screen: Profile },
    Nsignup: {screen: Nsignup},
    // Nlogin: {screen: Nlogin},
    // NHome:{screen: NHome},
    // Request: {screen: Request},

  },
  {
    initialRouteName: 'Profile',
    headerMode: 'none',

  })


export default createAppContainer(MyProject)

