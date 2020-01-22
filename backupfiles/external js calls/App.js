import React, { Component } from 'react';


import MainActivity from './Modules/MainActivity' ;


import SecondActivity from './Modules/SecondActivity' ;


import { createStackNavigator } from 'react-navigation-stack';
import {  createAppContainer } from 'react-navigation';




const MyProject = createStackNavigator(
{

 First: { screen: MainActivity },
 
 Second: { screen: SecondActivity }

});

export default createAppContainer(MyProject)

