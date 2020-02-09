import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView, View, ImageComponent } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import HomeRoute from '../Home/HRoutes'
import UserRoute from '../Users/URoutes'

class HomeScreen extends Component {
    render() {
        return (
            <HomeRoute />
        )
    }
}
class UserScreen extends Component {
    render() {
        return (
            <UserRoute />
        )
    }
}

const TabNavigator = createMaterialBottomTabNavigator(
    //Define Routes & Tabs
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{ color: tintColor }]} size={25} name={'home'} />
                    </View>
                )
            }
        },
        UserScreen: {
            screen: UserScreen,
            navigationOptions: {
                tabBarLabel: 'User',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{ color: tintColor }]} size={25} name={'user'} />
                    </View>
                )
            },

        }
    },
    //Styles for BottomTabs
    {
        initialRouteName: 'Home',
        activeColor: 'white',
        inactiveColor: '#3e2465',
        barStyle: {
            backgroundColor: '#694fad',


        },
    }
);

//Styles for Componets
const style = StyleSheet.create({

    cotntainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default createAppContainer(TabNavigator);

