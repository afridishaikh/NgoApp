import React, { Component } from 'react'
import { Text, Platform,StatusBar, animating, StyleSheet, ToastAndroid, View,ScrollView, Clipboard, FlatList, Alert, TouchableHighlight, ActivityIndicator, Linking, Image, Modal, TouchableOpacity, ImageBackground } from 'react-native';

export default class HowToUse extends Component {
    render() {
        return (
            <ScrollView>


            <View style={styles.container}>

                <View style={{
                    backgroundColor: '#bc2b78',
                    justifyContent: 'center',
                    alignContent: 'center',
                    margin: 25,
                    borderColor: 'black',
                    borderWidth: 2
                }}>
                    <Text style={[styles.loginText, { fontSize: 18 }]} > Guide for Users</Text>
                </View>

                <Text style={styles.copy2}>User of This App can Help a Person who is Helpless.</Text>
                <Text style={styles.copy2}>User of This App can See details of The NGO and Make contact with NGO.</Text>
                <Text style={styles.copy2}>Also User can Donate to the NGO.</Text>
                <Text style={[styles.copy, { fontSize: 15 }]}>STEP 1</Text>
            <Text style={styles.copy2}>Go To 'Post A Request' And Fill all The details of the Victim or Helpless Person.</Text>

            <Text style={[styles.copy, { fontSize: 15 }]}>STEP 2</Text>
            <Text style={styles.copy2}>Click 'Send Request' to send Details, The details will be sent to the NGOs.</Text>

            <Text style={[styles.copy, { fontSize: 15 }]}>STEP 3</Text>
            <Text style={styles.copy2}>User can Track The status of Request by going 'Your Activity.'</Text>

            <View style={{
                    backgroundColor: '#bc2b78',
                    justifyContent: 'center',
                    alignContent: 'center',
                    margin: 25,
                    borderColor: 'black',
                    borderWidth: 2
                }}>
                    <Text style={[styles.loginText, { fontSize: 18 }]} > Guide for NGO</Text>
            </View>
                    <Text style={styles.copy2}>NGO will Get all the Infromation Of the Person who is Required Help</Text>
                <Text style={[styles.copy, { fontSize: 15 }]}>STEP 1</Text>
            <Text style={styles.copy2}>Go To 'Request List' to see the Requests of the Users.</Text>

            <Text style={[styles.copy, { fontSize: 15 }]}>STEP 2</Text>
            <Text style={styles.copy2}>Click 'Accept' to accept the Request.</Text>

            <Text style={[styles.copy, { fontSize: 15 }]}>STEP 3</Text>
            <Text style={styles.copy2}>NGO can track the Status of the Request in "Your Activity".</Text>

            
            <Text style={[styles.copy, { fontSize: 15 }]}>STEP 4</Text>
            <Text style={styles.copy2}>NGO has to "Complete" the Request and Attach photo with the Victim to fully complete the Request.</Text>
                </View>
                

                <View style={{
                    backgroundColor: 'black',
                    justifyContent: 'center',
                    alignContent: 'center',
                    margin: 25,
                    borderColor: 'black',
                    borderWidth: 2
                    }}>
                    <Text style={[styles.loginText, { fontSize: 16 }]}>Let's Keep Spreading Some Happiness.</Text>
                </View>


             </ScrollView>
         
        )
    }
}

const styles = StyleSheet.create({



    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#dcdcdc'
    },

    
    copy: {
        color: '#F44336',
        padding:3,
    
    },

    copy2: {
        color: "#007313",
        justifyContent: 'center',
        alignItems: 'center',
        padding:7
    },


    loginText: {
        color: 'white',
      },
}
);


