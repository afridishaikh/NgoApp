import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';

import Splash from './Splash';
import Drawer from './Pages/Drawer';
import Login1 from './Pages/login1';
import Login from './Users/login';
// import Signup from './Users/signup'
import Profile from './Users/Profile';
import Home from './Home/Home';
// import Request from './Home/Request';
import List from './Home/List'
import Ntabs from './Pages/NTabs'
import UHome from './Home/UHome'
import Utabs from './Pages/UTabs'
import Nsignup from './Users/n_signup'
// import Request from './Home/Request'

export default class Routes extends Component {
    render() {
        return <AppContainer />;
    }
}
const AppNavigator = createStackNavigator({

    Splash: {
        screen: Splash
    },
    Drawer: {
        screen: Drawer,
    },
    Login1: {
        screen: Login1,
    },
    Login: {
        screen: Login,
    },
    // Signup: {
    //     screen: Signup,
    // },
    Profile:
    {
        screen: Profile,
    },
    Ntabs:
    {
        screen: Ntabs,
    },
    UHome:
    {
        screen: UHome,
    },
    Utabs:
    {
        screen: Utabs,
    },
    // Nsignup: {
    //     screen: Nsignup,
    // },
    Home: { screen: Home },
    // Request: { screen: Request },
    // Request: { screen: RList }
},
    //Navigation Options
    {
        initialRouteName: 'Splash',
        header: null,
        headerMode: 'none'
    })

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});