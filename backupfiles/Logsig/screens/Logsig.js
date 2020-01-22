import React, {Component} from 'react';
import {Text,
        View, 
        Button,
        StyleSheet} from 'react-native';

export default class logsig extends Component {
    
    static navigationOptions =
 {
    title: 'Login',
 };

//   NavigateActivityFunction = () =>
//   {
//      this.props.navigation.navigate('Second');

//      this.props.navigation.navigate ('Third');
    
//   }

    render() {
        
        return( 
            <View>

            <Text> Welcome to NGO </Text>
                
            <Button
                color="red" 
                title='Log In'
                onPress = {() => this.props.navigation.navigate('Second')}
                //onPress = {this.NavigateActivityFunction}
            
            />
            
            <Button
                color="blue" 
                title='Sign Up'
                onPress = {() => this.props.navigation.navigate('Third')}
               // onPress = {this.NavigateActivityFunction}
            
            />

            </View>
        );   
        }
}
           
