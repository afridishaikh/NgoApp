import React, { Component } from 'react'
import { Text, Platform, StatusBar, animating, Button, StyleSheet, ToastAndroid, View, ScrollView, Clipboard, FlatList, Alert, TouchableHighlight, ActivityIndicator, Linking, Image, Modal, TouchableOpacity, ImageBackground } from 'react-native';
import { SocialIcon } from 'react-native-elements'
export default class HowToUse extends Component {
    render() {
        return (
            <ScrollView>
                <View>
                    <View style={styles.header}></View>
                    <Image style={styles.avatar} source={require('../../assets/icons/logo/dev.jpg')} />
                    <View style={styles.body}>
                        <View style={styles.bodyContent}>
                            <Text style={styles.name}>Afridi Shaikh</Text>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between', margin: 10
                            }}>
                                <SocialIcon
                                    //Social Icon using react-native-elements
                                    type="facebook"
                                    //Type of Social Icon
                                    onPress={() => {
                                        Linking.openURL('https://www.facebook.com/afridi.shaikh.15')
                                    }}
                                />

                                <SocialIcon
                                    //Social Icon using react-native-elements
                                    type="instagram"
                                    //Type of Social Icon
                                    onPress={() => {
                                        Linking.openURL('https://www.instagram.com/afridi_shaikh15')
                                    }}
                                />
                                <SocialIcon
                                    //Social Icon using react-native-elements
                                    type="envelope"
                                    //Type of Social Icon
                                    onPress={() => {
                                        Linking.openURL('mailto:afridishaikh1517@gmail.com')
                                    }}
                                />

                                <SocialIcon
                                    //Social Icon using react-native-elements
                                    type="github"
                                    //Type of Social Icon
                                    onPress={() => {
                                        Linking.openURL('https://www.github.com/afridishaikh')
                                    }}
                                />

                            </View>
                        </View>



                        <View style={styles.bodyContent2}>
                            <Text style={styles.name}>Mustakim Kaji</Text>
                        </View>

                        <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'center' }}>

                            <SocialIcon
                                //Social Icon using react-native-elements
                                type="facebook"
                                //Type of Social Icon
                                onPress={() => {
                                    Linking.openURL('https://www.facebook.com/mustakim.kazi.923')
                                }}
                            />
                            <SocialIcon
                                //Social Icon using react-native-elements
                                type="instagram"
                                //Type of Social Icon
                                onPress={() => {
                                    Linking.openURL('https://www.instagram.com/mr.m.k.kaji')
                                }}
                            />
                            <SocialIcon
                                //Social Icon using react-native-elements
                                type="envelope"
                                //Type of Social Icon
                                onPress={() => {
                                    Linking.openURL('mailto:mustakimkaji28@gmail.com')
                                }}
                            />

                        </View>

                        <View style={styles.bodyContent2}>
                            <Text style={styles.name}>Solanki Govind</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 10 }}>
                            <SocialIcon
                                //Social Icon using react-native-elements
                                type="facebook"
                                //Type of Social Icon
                                onPress={() => {
                                    Linking.openURL('https://www.facebook.com/govind.solanki.98871174')
                                }}
                            />
                            <SocialIcon
                                //Social Icon using react-native-elements
                                type="envelope"
                                //Type of Social Icon
                                onPress={() => {
                                    Linking.openURL('mailto:solankigovind421@gmail.com')
                                }}
                            />



                        </View>
                    </View>
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
    },


    header: {
        backgroundColor: "#8803fc",
        height: 100,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 60
    },

    avatar2: {
        width: 55,
        height: 55,
        borderRadius: 63,
        margin: 3,
        marginBottom: 40,
        marginRight: 20,
        alignSelf: 'center',
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 2,
        alignItems: 'center',
        paddingTop: 50,

    },
    bodyContent2: {
        alignItems: 'center',
    },
    name: {
        fontSize: 23,
        color: "#696969",
        fontWeight: "600"
    },
    info: {
        fontSize: 16,
        color: "#8803fc",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center'
    },

});

