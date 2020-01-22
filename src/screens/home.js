import React, {Component} from 'react';
import {View,
        Text,
        StyleSheet } from 'react-native';
import {Card, Title} from 'react-native-paper';


export default class home extends Component {

    render() {

    return(

 <View> 
     <View> 
         <Card>
            <Card.Title/>                       
                <Card.Content>
                     <Title> POST A REQUEST </Title>                            
                 </Card.Content>  
         </Card>  
         
     </View>



 </View>


    );
    }

}