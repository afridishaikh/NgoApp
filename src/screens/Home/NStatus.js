import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Modal,
    PixelRatio,
    ActivityIndicator,
    animating,
    Text,
    Alert,
    View,
    FlatList,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    BackHandler,
    ImageBackground,
    Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import openMap from 'react-native-open-maps';
import RNFetchBlob from 'rn-fetch-blob';
import { Button } from 'react-native-paper';
import { Card } from 'react-native-paper'

class Home extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            ModalVisibleStatus: false,
            secondModal: false,
            ModalComplete: false,
            TempImageURL: '',
            userid: '',
            r_id: '',
            loading: false
        }
    }


    // To store AsyncStorage value in state.
    componentDidMount() {
        AsyncStorage.getItem('username').then(value =>
            //AsyncStorage returns a promise so adding a callback to get the value
            this.setState({ userid: value }),
        );
    }

    FetchPending = () => {
        // console.warn(this.state.userid)
        this.setState({
            ModalVisibleStatus: true,
            loading: true,
        });
        const { userid } = this.state;
        console.warn(userid)
        fetch('https://ngoapp3219.000webhostapp.com/db/status/n_pending.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userid,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson === 'Invalid') {

                    Alert.alert('No any Pending Request found');
                    this.props.navigation.goBack();
                }
                else {
                    this.setState({
                        dataSource: responseJson,
                        loading: false,
                    })
                }
                console.warn(responseJson)
            }
            ).catch((error) => {
                // console.error(error);
                Alert.alert('Network Error !')
                this.setState({
                    loading: false,
                    ModalVisibleStatus: false,
                })
            });
    }

    FetchComplete = () => {
        // console.warn(this.state.userid)
        this.setState({
            loading: true,
            ModalComplete: true,
        });
        const { userid } = this.state;
        console.warn(userid)
        fetch('https://ngoapp3219.000webhostapp.com/db/status/n_complete.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userid,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson === 'Invalid') {
                    Alert.alert('No any Complete Request found !');
                    this.props.navigation.goBack();
                }
                else {
                    this.setState({
                        dataSource: responseJson,
                        loading: false,
                    })
                }
            }
            ).catch((error) => {
                // console.error(error);
                Alert.alert('Network Error !')
                this.setState({
                    loading: false,
                    ModalComplete: false,
                })
            });
    }



    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        }
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                this.setState({
                    ImageSource: source,
                    data: response.data
                });
            }
        });
    }


    Complete = (r_id) => {
        this.setState({
            r_id: r_id,
            loading: true,
        });
        console.warn(this.state.userid)

        if (this.state.ImageSource == null || this.state.data == null) {
            Alert.alert('You must Upload Image !');
            return false;
        }
        else {
            // RNFetchBlob.fetch('POST', 'https://ngoapp.000webhostapp.com/ngoapp/n_signup.php', {
            RNFetchBlob.fetch('POST', 'https://ngoapp3219.000webhostapp.com/db/complete.php', {
                Authorization: "Bearer access-token",
                otherHeader: "foo",
                'Content-Type': 'multipart/form-data',
            }, [
                { name: 'username', data: this.state.userid },
                { name: 'r_id', data: r_id },
                { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },

            ]).then((resp) => {
                var tempMSG = resp.data;
                tempMSG = tempMSG.replace(/\"/g, "");
                Alert.alert(tempMSG);
                this.setState({
                    loading: false,
                });
                this.props.navigation.goBack();
            }).catch((error) => {
                console.error(error);
            });
        }

    }

    Cancel = (r_id) => {
        console.warn(r_id)
        this.setState({
            r_id: r_id,
            loading: true
        });
        console.warn(this.state.userid)
        RNFetchBlob.fetch('POST', 'https://ngoapp3219.000webhostapp.com/db/status/cancel.php', {
            Authorization: "Bearer access-token",
            otherHeader: "foo",
            'Content-Type': 'multipart/form-data',
        }, [
            { name: 'username', data: this.state.userid },
            { name: 'r_id', data: r_id }

        ]).then((resp) => {
            var tempMSG = resp.data;
            // tempMSG = tempMSG.replace(/^"|"$/g, '');
            tempMSG = tempMSG.replace(/\"/g, "");
            Alert.alert(tempMSG);
            this.setState({
                r_id: r_id,
                loading: false
            });
            this.props.navigation.goBack();
        }).catch((error) => {
            console.error(error);
        });
    }


    ShowModalFunction(visible, r_id, image, problem, address, mo_no, latitude, longitude) {
        this.setState({
            r_id: r_id,
            secondModal: visible,
            Image: image,
            Problem: problem,
            Naddress: address,
            Nmo_no: mo_no,
            Latitude: latitude,
            Longitude: longitude
        });
    }

    //function to make call and store the mo_no
    dialCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
        else { phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
    };

    _goToYosemite = (lat, long) => {
        JSON.stringify(lat)
        JSON.stringify(long)
        //When you use 100percent of your brain lol
        let a = lat
        let b = long
        let c = a + ',' + b
        openMap({ query: c });
    };


    render() {

        if (this.state.loading) {
            return (
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', }}>
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

            <ImageBackground source={require('../../assets/bg.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>


                <Button style={{ marginBottom: 50 }} uppercase={false} color="#eeff00" icon="clock-outline" mode="contained" onPress={this.FetchPending}>
                    Pending Requests</Button>

                <Button icon="check-decagram" uppercase={false} mode="contained" color="#00ea0c" onPress={this.FetchComplete}>
                    Completed Requests</Button>

                <Modal
                    transparent={false}
                    animationType={"fade"}
                    visible={this.state.ModalComplete}
                    onRequestClose={() => { this.setState({ ModalComplete: false }); }} >

<View style={{
                        backgroundColor: '#bc2b78',
                        justifyContent: 'center',
                        alignContent: 'center',
                        paddingLeft:50,
                        margin:10,
                        borderColor:'black',
                        borderWidth:2
                    }}>
                        <Text style={[styles.loginText, { fontSize: 18 }]} >Your Completed Requests List </Text>
                    </View>

                    <FlatList
                        data={this.state.dataSource}

                        renderItem={({ item }) =>
                            <View>

                                <TouchableOpacity
                                    onPress={this.ShowModalFunction.bind(this, true, item.r_id, item.image, item.problem, item.address, item.mo_no, item.latitude, item.longitude)} >
                                    <Card style={styles.mycard}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image style={{ width: 100, height: 100, margin: 5, borderRadius: 5, borderWidth: 2, borderColor: 'black', flexDirection: 'row' }} source={{ uri: item.image }} />
                                            <View style={{ justifyContent: 'center', alignContent: 'center', marginLeft: 20 }}>
                                                <Text style={{ fontSize: 15, color: 'black', }}>Problem
                         </Text>
                                                <Text style={{ fontSize: 18, color: 'darkblue', marginBottom: 15, flexDirection: 'row' }}>
                                                    {item.name}
                                                </Text>
                                                <Text style={{ fontSize: 15, color: 'black', }}>NGO Service Type
                         </Text>
                                                <Text style={{ fontSize: 18, color: 'darkblue', marginBottom: 15, flexDirection: 'row' }}>
                                                    {item.category}
                                                </Text>
                                            </View>
                                        </View>
                                    </Card>
                                </TouchableOpacity>
                            </View>
                        }
                        keyExtractor={(item, index) => index}
                    />
                </Modal>

                <Modal
                    transparent={false}
                    animationType={"fade"}
                    visible={this.state.ModalVisibleStatus}
                    onRequestClose={() => { this.setState({ ModalVisibleStatus: false }); }} >

<View style={{
                        backgroundColor: '#bc2b78',
                        justifyContent: 'center',
                        alignContent: 'center',
                        paddingLeft:50,
                        margin:10,
                        borderColor:'black',
                        borderWidth:2
                    }}>
                        <Text style={[styles.loginText, { fontSize: 18 }]} >Your Pending Requests List </Text>
                    </View>

                    <FlatList
                        data={this.state.dataSource}

                        renderItem={({ item }) =>
                            <View>

                                <TouchableOpacity
                                    onPress={this.ShowModalFunction.bind(this, true, item.r_id, item.image, item.problem, item.address, item.mo_no, item.latitude, item.longitude)} >
                                    <Card style={styles.mycard}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image style={{ width: 100, height: 100, margin: 5, borderRadius: 5, borderWidth: 2, borderColor: 'black', flexDirection: 'row' }} source={{ uri: item.image }} />
                                            <View style={{ justifyContent: 'center', alignContent: 'center', marginLeft: 20 }}>
                                                <Text style={{ fontSize: 15, color: 'black', }}>Problem:
                         </Text>
                                                <Text style={{ fontSize: 18, color: 'darkblue', marginBottom: 15, flexDirection: 'row' }}>
                                                    {item.problem}
                                                </Text>

                                            </View>
                                        </View>
                                    </Card>
                                </TouchableOpacity>
                            </View>
                        }
                        keyExtractor={(item, index) => index}
                    />
                </Modal>


                {
                    this.state.secondModal
                        ?
                        (
                            <Modal
                                transparent={false}
                                animationType={"fade"}
                                visible={this.state.ModalVisibleStatus}
                                onRequestClose={() => { this.ShowModalFunction(!this.state.secondModal) }} >
                                <View style={styles.modalView}>
                                    {/* <Image style={styles.mainImage} source={{ uri: this.state.Image }} /> */}
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        style={styles.TouchableOpacity_Style}
                                        onPress={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus) }}>
                                    </TouchableOpacity>
                                </View>

                                <View>

                                    <View style={{ flexDirection: 'row' }}>


                                        <View>
                                            <Image style={{ width: 200, height: 200, margin: 5, borderRadius: 5, borderWidth: 2, borderColor: 'black', flexDirection: 'row' }} source={{ uri: this.state.Image }} />
                                        </View>
                                        <View style={{ paddingTop: 20 }}>
                                            <Text style={styles.modalFont}>Problem </Text>
                                            <Text style={styles.modalText}>
                                                {this.state.Problem}
                                            </Text>

                                            <Text style={styles.modalFont}>Address
                         </Text>
                                            <Text style={styles.modalText}>
                                                {this.state.Naddress}
                                            </Text>

                                            <Text style={styles.modalFont}>Mobile Number</Text>
                                            <Text style={styles.modalText}>
                                                {this.state.Nmo_no}
                                            </Text>
                                        </View>

                                    </View>

                                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                        <Text style={{ paddingTop: 10, fontSize: 18 }}>Take A Photo With Victim</Text>
                                        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                                            <View style={styles.ImageContainer}>

                                                {this.state.ImageSource === null ? <Icon style={styles.Icon} name="camera" size={50} color="grey" /> :
                                                    <Image style={styles.ImageContainer} source={this.state.ImageSource} />
                                                }
                                            </View>

                                        </TouchableOpacity>
                                    </View>


                                    <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                                        <TouchableOpacity onPress={() => { this.dialCall(this.state.Nmo_no) }} activeOpacity={0.7} style={styles.buttonn} >
                                            <Icon style={{ paddingLeft: 50 }} name="phone" size={35} color="#fff" />
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => { this._goToYosemite(this.state.Latitude, this.state.Longitude) }} activeOpacity={0.7} style={styles.buttonn} >

                                            <Icon style={{ paddingLeft: 50 }} name="map-marker" size={35} color="#fff" />

                                        </TouchableOpacity>
                                    </View>


                                    <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', padding: 10 }}>
                                        <Button width={150} style={{ margin: 10 }} uppercase={false} icon="cancel" mode="contained" color='#e86100' onPress={this.Cancel.bind(this, this.state.r_id)}>
                                            Cancel</Button>



                                        <Button width={150} style={{ margin: 10 }} icon="check-decagram" uppercase={false} mode="contained" color="#00ea0c" onPress={this.Complete.bind(this, this.state.r_id)}>
                                            Complete</Button>
                                    </View>

                                </View>



                            </Modal>
                        )
                        :
                        null
                }

            </View>




</ImageBackground>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ImageContainer: {

        borderRadius: 10,
        width: 150,
        height: 150,
        borderColor: 'black',
        borderWidth: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 20,
        marginBottom: 25
    },
    buttonContainer: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        width: 250,
        borderRadius: 30,
    },
    buttonCon: {
        height: 50,
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        // marginLeft:10,
        margin: 30,
        width: 120,
        borderRadius: 10,
    },
    Button: {
        backgroundColor: "#980953",


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
    Button2: {
        backgroundColor: "green",
        borderWidth: 2,
        borderColor: 'black'
    },

    
    backgroundImage: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },

    loginText: {
        color: 'white',
        alignContent: 'center',
        justifyContent: 'center'
    },
    slider: {
        justifyContent: 'center',
        padding: 10
    },
    mainImage: {

        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '98%',
        resizeMode: 'contain'

    },

    buttonn: {

        width: '40%',
        height: 45,
        margin: 20,
        padding: 6,
        backgroundColor: 'green',
        borderRadius: 50,
        marginBottom: 30
    },

    mycard: {
        margin: 5,
        height: 120,
        flexDirection: 'row',
        backgroundColor: '#e0d238',
        alignItems: 'center',
        borderWidth: 2,
        borderBottomColor: 'black'

    },
});

export default Home;