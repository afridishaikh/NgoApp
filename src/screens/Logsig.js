import React, {Component} from 'react';
import {Text,
        View, 
        Button,
        StyleSheet} from 'react-native';

import login from './login'


export default class logsig extends Component {
    
    static navigationOptions =
 {
    title: null,
 };

    render() {
        
        return( 
            <View>

            <Text> Welcome to NGO </Text>
                
            <Button
                color="red" 
                title='Log In'
                onPress = {() => this.props.navigation.navigate('Second')}
            
            />
            
            <Button
                color="blue" 
                title='Sign Up'
                onPress = {() => this.props.navigation.navigate('Third')}
               // onPress = {this.NavigateActivityFunction}
            
            />

            <Button
            title="Welcome"
            color="pink"
            onPress = {() => this.props.navigation.navigate('Fourth')}
            
            />
            </View>
        );   
        }
}
           
