import React, { Component } from 'react'
import {Button, Text, View, AppRegistry,TextInput,StyleSheet,Alert} from 'react-native'
// import { Button } from 'native-base'

export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            TextInputName:'',
            TextInputEmail:'',
            TextInputPhoneNumber:''
         }     
        }
        InsertDataToServer = () => {
            const{TextInputName} = this.state;
            const{TextInputEmail} = this.state;
            const{TextInputPhoneNumber} = this.state;

        //Here is main Connection
        fetch('http://192.168.42.250/test/insert.php',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                name: TextInputName,
                email: TextInputEmail,
                phone_no: TextInputPhoneNumber
            })
            }).then((response) => response.json())
            .then((responseJson) => {
              Alert.alert(responseJson);
            }).catch((error) => {
              console.error(error);
            });
        }
render() {
    return (
        <View>
            <TextInput
            placeholder= "Enter Name"
            onChangeText = {TextInputName =>  this.setState({TextInputName})} 
                />

            <TextInput
            placeholder="Enter Email"
            onChangeText = {TextInputEmail =>  this.setState({TextInputEmail})} 
            />

            <TextInput
            placeholder="Enter Phone No"
            onChangeText = {TextInputPhoneNumber =>  this.setState({TextInputPhoneNumber})} 
            />

            <Button title='Save' onPress={this.InsertDataToServer}  />
        </View>
    );
}
    
}
