import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert,
    ScrollView,
    TouchableOpacity,
    PixelRatio,
    ImageBackground,
    Platform,
    ActivityIndicator,
    animating,
    Modal
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ImageSource: null,
            data: null,
            Comment: '',
            username: 'New User',
            loading:false

        }
    }

    componentDidMount = () => {
        AsyncStorage.getItem('username').then(value =>
          this.setState({ username: value })
        );
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

    //Function to send all data to server
    InsertDataToServer = () => {

        if (this.state.Comment == '') {
            Alert.alert('Input Field should not be Empty !')
        }
        else if (this.state.ImageSource == null || this.state.data == null) {
            Alert.alert('You must Upload Your NGO image !');
            //    this.setState({Password:text}) 
            return false;
        }

        else {
            this.setState({
                loading: true,
            });
            RNFetchBlob.fetch('POST', 'https://ngoapp3219.000webhostapp.com/db/feedback.php', {
                Authorization: "Bearer access-token",
                otherHeader: "foo",
                'Content-Type': 'multipart/form-data',
            }, [
                { name: 'username', data: this.state.username },
                { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },
                { name: 'comment', data: this.state.Comment },


            ]).then((resp) => {
                var tempMSG = resp.data;
                tempMSG = tempMSG.replace(/\"/g, "");
                Alert.alert(tempMSG);
                // this.props.navigation.replace('Nlogin');
                this.props.navigation.goBack();
                this.setState({
                    loading: false,
                });
            }).catch((error) => {
                // console.error(error);
                Alert.alert('Network Error !')
            });
        }
    }


    render() {

    
        return (
            <View style={styles.Container}>
                <ScrollView style={{ padding: 30 }}>


                
                    <Text style={{ fontSize: 20, color: 'back', marginTop:20, marginBottom: 10 }}>Attach Screenshot:</Text>
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        <View style={styles.ImageContainer}>
                            {/* <Icon style={styles.Icon} name="camera" size={50} color="#000" /> */}
                            {this.state.ImageSource === null ? <Icon style={styles.Icon} name="camera" size={50} color="grey" /> :
                                <Image style={styles.ImageContainer3} source={this.state.ImageSource} />
                            }
                        </View>
                    </TouchableOpacity>

                    <View style={styles.inputContainer}>
                        <Icon style={styles.Icon} name="mobile" size={30} color="#000" />
                        <TextInput style={styles.inputs}
                            keyboardType="default"
                            underlineColorAndroid='transparent'
                            placeholder="Write Your Feedback"
                            multiline = {true}
                            onChangeText={ Comment => this.setState({ Comment })} />
                    </View>

                    

                    <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.InsertDataToServer}>
                        <Text style={styles.loginText}>Send Feedback</Text>
                    </TouchableHighlight>
                </ScrollView>

                {this.state.loading &&
                    <Modal
                        transparent={false}
                        animationType="none"
                        visible={this.state.loading}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                            <Text> Please Wait ...</Text>
                            <ActivityIndicator
                                animating={animating}
                                color='#bc2b78'
                                size={70}
                                loading={this.state.loading}
                            />
                        </View>
                    </Modal>
                }
            </View>


        );
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    inputContainer: {
        backgroundColor: 'white',
        width: 300,
        height: 50,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 23,
    },
    Dropdown: {
        height: 60,
        justifyContent: 'center',
        borderColor: 'black',
        // borderBottomColor: 'black',
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 23,
        padding: 10
    },
    Icon: {
        padding: 15,
        color: '#373b6e'
    },
    inputs: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        justifyContent: 'center',
        alignContent: "center",

    },

    ImageContainer: {
        borderRadius: 10,
        width: 300,
        height: 200,
        // borderColor: '#9B9B9B',
        borderWidth: 10 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3641',
        backgroundColor: 'white',
        // marginTop: 5,
        marginBottom: 25
    },

    ImageContainer3: {
        borderRadius: 10,
        width: 295,
        height: 195,
        marginTop:22,
        // borderColor: '#9B9B9B',
        borderWidth: 10 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3641',
        backgroundColor: 'white',
        // marginTop: 5,
        marginBottom: 25
    },

    TextInputStyle: {
        textAlign: 'center',
        height: 40,
        width: '80%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#028b53',
        marginTop: 20
    },

    button: {

        width: '80%',
        backgroundColor: '#694fad',
        borderRadius: 7,
        marginTop: 20
    },

    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        padding: 10
    },


    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },

    signupButton: {
        margin: 20,
        marginLeft: 70,
        marginBottom: 100,
        width: 150,
        backgroundColor: "#694fad",
        borderWidth: 2,
        borderColor: '#000'
    },
    loginText: {
        color: 'white',
    }

});


