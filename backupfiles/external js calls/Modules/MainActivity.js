import React, { Component } from 'react';

import { StyleSheet, Text, View, Button } from 'react-native';

class MainActivity extends Component {

static navigationOptions =
 {
    title: 'MainActivity',
 };

 NavigateActivityFunction = () =>
 {
    this.props.navigation.navigate('Second');
    
 }

 render()
 {
    return(
       <View style = { styles.MainContainer }>

          <Text style = { styles.ActivityNameTextCss }> This Is MainActivity. </Text>

          <Button onPress = { this.NavigateActivityFunction } title = 'Open Second Activity'/>
        
       </View>
    );
 }
}

const styles = StyleSheet.create(
{
 MainContainer: {

    flex:1,
    justifyContent: 'center',
    margin: 5
  
 },

 ActivityNameTextCss: {

    textAlign: 'center',
    fontSize: 20,
    color: '#000',
 },

});

export default MainActivity;