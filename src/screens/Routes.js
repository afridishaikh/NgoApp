import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer,createSwitchNavigator } from 'react-navigation';

import Splash from './Pages/Splash';
import Drawer from './Drawer';

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