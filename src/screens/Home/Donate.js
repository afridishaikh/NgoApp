
import React, { Component } from 'react';
import { Text, Platform, animating, StyleSheet, ToastAndroid, View, Clipboard, FlatList, Alert, TouchableHighlight, ActivityIndicator, Linking, Image, Modal, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import openMap from 'react-native-open-maps';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import { Card, Button } from 'react-native-paper'

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: true,
            ModalVisibleStatus: false,
            TempImageURL: '',
            upi: '',
            n_id: ''
        }
    }

    //Fetching data from server
    componentDidMount() {
        AsyncStorage.getItem('username').then(value =>
            //AsyncStorage returns a promise so adding a callback to get the value
            this.setState({ userid: value }),
        );
        
        this.setState({
            isLoading: true,
        })

        return fetch('https://ngoapp3219.000webhostapp.com/db/update/donation.php')
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson === 'Invalid') {
                    Alert.alert('No any NGO Found with UPI !');
                    this.props.navigation.goBack();
                }
                else {
                    this.setState({
                        dataSource: responseJson,
                        isLoading: false,
                    })
                }       
            })
            .catch((error) => {
                // console.error(error);
            Alert.alert('Network Error !');
            this.setState({
                isLoading: false,
            });
            this.props.navigation.goBack();
            });
    }



    // For Modal Storing and Defining Parameters , which will store the server data 
    ShowModalFunction(visible, n_id, name, image, category, mo_no, email, username, upi) {
        this.setState({
            ModalVisibleStatus: visible,
            n_id: n_id,
            Name: name,
            Image: image,
            Category: category,
            Mo_no: mo_no,
            Email: email,
            Username: username,
            upi: upi,
        });

    }
    //To copy in clipBoard
    copy = async () => {
        await Clipboard.setString(this.state.upi);

        ToastAndroid.showWithGravity(
            "Copied To Clipboard",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
        )
    }

    // The Activityindicator
    render() {

        if (this.state.isLoading) {
            return (

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <Text> Please Wait ...</Text>
                    <ActivityIndicator
                        animating={animating}
                        color='#bc2b78'
                        size={70}
                        loading={this.state.loading}
                    />
                </View>

            );
        }
        return (
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 3 }}>


                <FlatList
                    data={this.state.dataSource}
                    ItemSeparatorComponent={this.renderSeprator}
                    renderItem={({ item }) =>
                        <View>
                            {/* <TouchableOpacity onPress={this.ShowModalFunction.bind(this, true, item.n_id,item.name, item.image, item.category,item.mo_no, item.email, item.username, item.upi)} > */}
                            <TouchableOpacity onPress={this.ShowModalFunction.bind(this, true, item.n_id, item.name, item.image, item.category, item.mo_no, item.email, item.username, item.upi)} >
                                <Card style={styles.mycard}>
                                    <View style={{ flexDirection: 'row' }}>

                                        <Image style={{ width: 100, height: 100, margin: 5, borderRadius: 5, borderWidth: 2, borderColor: 'black', flexDirection: 'row' }} source={{ uri: item.image }} />
                                        <View style={{ justifyContent: 'space-evenly', padding: 5 }}>
                                            <View style={{ justifyContent: 'center', alignContent: 'center', marginLeft: 20, marginTop: 70 }}>
                                                <Text style={{ fontSize: 15, color: 'black', }}>NGO Name:
                         </Text>
                         <Text style={{ fontSize: 18, color: 'darkblue', marginBottom: 15, flexDirection: 'row' }}>
                                                {item.name}
                                            </Text>
                                                <Text style={{ fontSize: 18, color: 'darkblue', marginBottom: 15, flexDirection: 'row' }}>
                                                    {item.problem}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>

                                </Card>

                            </TouchableOpacity>
                        </View>
                    }
                    keyExtractor={(item, index) => index}
                />
                {
                    this.state.ModalVisibleStatus
                        ?
                        (
                            <Modal
                                transparent={false}
                                animationType={"fade"}
                                visible={this.state.ModalVisibleStatus}
                                onRequestClose={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus) }} >
                                <View style={styles.modalView}>
                                    <Image style={styles.mainImage} source={{ uri: this.state.Image }} />
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        style={styles.TouchableOpacity_Style}
                                        onPress={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus) }}>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.modalView2}>
                                    <Text style={styles.modalFont}>Name
                         </Text>
                                    <Text style={styles.modalText}>
                                        {this.state.Name}
                                    </Text>

                                    <Text style={styles.modalFont}>NGO Service
                         </Text>
                                    <Text style={styles.modalText}>
                                        {this.state.Category}
                                    </Text>

                                    <Text style={styles.modalFont}>Mobile Number</Text>
                                    <Text style={styles.modalText}>
                                        {this.state.Mo_no}
                                    </Text>

                                    <Text style={styles.modalFont}>Email</Text>
                                    <Text style={styles.modalText}>
                                        {this.state.Email}
                                    </Text>

                                    <Text style={styles.copy}> STEP 1 : </Text>
                                    <Text style={styles.copy2}> Copy The UPI Address </Text>
                                    <Text style={styles.modalFont}>UPI Id</Text>
                                    <View style={{ flexDirection: 'row' }}>

                                        <Text style={styles.modalText}>
                                            {this.state.upi}
                                        </Text>
                                        <TouchableOpacity style={[styles.buttonContainer2, styles.upiButton]}
                                            onPress={this.copy}
                                        >

                                            <Text style={{ color: 'white' }}>Copy UPI</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <Text style={styles.copy}> STEP 2 : </Text>
                                    <Text style={styles.copy2}>{"\t"}Open any Payment app, {"\n"} Paste UPI ID and Donate to NGO.</Text>

                                </View>


                            </Modal>
                        )
                        :
                        null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {
        flexDirection: 'row',
        textDecorationColor: 'white',
        justifyContent: 'center',

        flex: 1,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0

    },

    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 180,
        width: 150,
        position: "relative",
        resizeMode: "contain"
    },

    mainImage: {

        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '98%',
        resizeMode: 'contain'

    },

    modalView: {
        flexDirection: "column",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'black'

    },

    copy: {

        // Define your HEX color code here.
        color: '#F44336'
    },

    copy2: {

        // Define your HEX color code here.
        color: '#00ab5e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView2: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        backgroundColor: 'white'
    },

    buttonContainer2: {
        height: 30,
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        borderRadius: 30,
    },


    upiButton: {
        width: 80,
        marginLeft: 10,
        backgroundColor: "#8803fc",
        borderWidth: 2,
        borderColor: '#000'
    },

    TouchableOpacity_Style: {

        width: 25,
        height: 25,
        top: 9,
        right: 9,
        position: 'absolute',
    },
    //button

    buttonn: {

        width: '40%',
        height: 45,
        margin: 20,
        padding: 6,
        backgroundColor: 'green',
        borderRadius: 50,
        marginBottom: 30
    },

    TextStyle: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    mycard: {
        margin: 5,
        height: 120,
        flexDirection: 'row',
        backgroundColor: '#f7f12f',
        alignItems: 'center',
        borderWidth: 2,
        borderBottomColor: 'black'

    },
    modalFont: {
        fontSize: 15,
        color: 'black',
    },
    modalText: {
        fontSize: 18,
        color: '#8803fc',
        marginBottom: 15
    },
}
);


