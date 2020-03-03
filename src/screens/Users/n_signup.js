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
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

export default class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ImageSource: null,
            data: null,
            Name: '',
            Category: '',
            Mo_no: '',
            Email: '',
            Address: '',
            City: '',
            Username: '',
            Password: ''
        }
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
InsertDataToServer = () => {

   
      

    RNFetchBlob.fetch('POST', 'https://ngoapp.000webhostapp.com/ngoapp/n_signup.php', {
        Authorization: "Bearer access-token",
        otherHeader: "foo",
        'Content-Type': 'multipart/form-data',
    }, [
        { name: 'name', data: this.state.Name },
        { name: 'category', data: this.state.Category },
        { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },
        { name: 'mo_no', data: this.state.Mo_no },
        { name: 'email', data: this.state.Email },
        { name: 'address', data: this.state.Address },
        { name: 'city', data: this.state.City },
        { name: 'username', data: this.state.Username },
        { name: 'password', data: this.state.Password },
        
    ]).then((resp) => {
        var tempMSG = resp.data;
        tempMSG = tempMSG.replace(/^"|"$/g, '');
        Alert.alert(tempMSG);
    }).catch((error) => {
        console.error(error);
    });

}


render() {

    let category = [{
        value: 'Food NGO',
    }, {
        value: 'Health NGO',
    }, {
        value: 'Clothes NGO ',
    }, {
        value: 'Poverty NGO',
    }, {
        value: 'Blood NGO'
    }];

    let city = [
        {
            value: 'Anand',
        },
        {
            value: 'Vadodra'
        },
        {
            value: 'Surat'
        },
        {
            value: 'Ahmedabad'
        },


    ]
return (
    <View style={styles.container}>
        <ScrollView>
            <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    placeholder="Enter NGO Name"
                    underlineColorAndroid='transparent'
                    onChangeText={Name => this.setState({ Name })} />
            </View>

            <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    underlineColorAndroid='transparent'
                    placeholder="Select Username"
                    onChangeText={Username => this.setState({ Username })} />
            </View>

            <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    underlineColorAndroid='transparent'
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={Password => this.setState({ Password })} />
            </View>

            <Dropdown
                label='Choose Category'
                data={category}
                onChangeText={Category => this.setState({ Category })}
            />

            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>

                <View style={styles.ImageContainer}>
                    {this.state.ImageSource === null ? <Text>Select a Photo</Text> :
                        <Image style={styles.ImageContainer} source={this.state.ImageSource} />
                    }
                </View>
            </TouchableOpacity>

            <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    keyboardType="numeric"
                    underlineColorAndroid='transparent'
                    placeholder="Mobile Number"
                    onChangeText={Mo_no => this.setState({ Mo_no })} />
            </View>

            <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    placeholder="Email Address"
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={Email => this.setState({ Email })} />
            </View>


            <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    placeholder="Address"
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={Address => this.setState({ Address })} />
            </View>

            <Dropdown
                label='Choose City'
                data={city}
                onChangeText={City => this.setState({ City })}
            />


            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.InsertDataToServer}>
                <Text style={styles.loginText}>Signup</Text>
            </TouchableHighlight>
        </ScrollView>
    </View>

        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF8E1',
    },

    ImageContainer: {
        borderRadius: 10,
        width: 300,
        height: 250,
        borderColor: '#9B9B9B',
        borderWidth: 10 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#3641',
        marginTop:20,
        marginBottom:25
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
        backgroundColor: '#00BCD4',
        borderRadius: 7,
        marginTop: 20
    },

    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        padding: 10
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    inputContainer: {
        //  backgroundColor: '#FFFFFF',
        //   borderRadius:25,
        // borderBottomWidth:3,
        width: 300,
        height: 50,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        //  borderBottomColor:'#023e56',
        borderColor: '#023e56',
        borderWidth: 3,
        borderRadius: 19,
        borderRadius: 11,
      },
    // inputContainer: {
    //     borderBottomColor: '#F5FCFF',
    //     backgroundColor: '#FFFFFF',
    //     borderRadius: 30,
    //     borderBottomWidth: 1,
    //     width: 250,
    //     height: 45,
    //     marginBottom: 20,
    //     flexDirection: 'row',
    //     alignItems: 'center'
    // },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
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
    loginButton: {
        backgroundColor: 'red'// "#00b5ec",
    },
    loginText: {
        color: 'white',
    }
});



// import React, { Component } from 'react';
// import {
//     StyleSheet,
//     Text,
//     View,
//     TextInput,
//     Button,
//     TouchableHighlight,
//     Image,
//     Alert,
//     ScrollView,
//     TouchableOpacity,
//     PixelRatio,
//     ImageBackground,
//     Platform,
// } from 'react-native';
// import { Dropdown } from 'react-native-material-dropdown';
// import ImagePicker from 'react-native-image-picker';
// import RNFetchBlob from 'rn-fetch-blob';

// export default class LoginView extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             ImageSource: null,
//             data: null,
//             Name: '',
//             Category: '',
//             Mo_no: '',
//             Email: '',
//             Address: '',
//             City: '',
//             Username: '',
//             Password: ''
//         }
//     }
//     selectPhotoTapped() {
//         const options = {
//             quality: 1.0,
//             maxWidth: 500,
//             maxHeight: 500,
//             storageOptions: {
//                 skipBackup: true
//             }
//         }
//         ImagePicker.showImagePicker(options, (response) => {
//             console.log('Response = ', response);
//             if (response.didCancel) {
//                 console.log('User cancelled photo picker');
//             }
//             else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             }
//             else if (response.customButton) {
//                 console.log('User tapped custom button: ', response.customButton);
//             }
//             else {
//                 let source = { uri: response.uri };

//                 this.setState({
//                     ImageSource: source,
//                     data: response.data
//                 });
//             }
//         });
//     }
// InsertDataToServer = () => {
//     RNFetchBlob.fetch('POST', 'https://ngoapp.000webhostapp.com/ngoapp/n_signup.php', {
//         Authorization: "Bearer access-token",
//         otherHeader: "foo",
//         'Content-Type': 'multipart/form-data',
//     }, [
//         { name: 'name', data: this.state.Name },
//         { name: 'category', data: this.state.Category },
//         { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },
//         { name: 'mo_no', data: this.state.Mo_no },
//         { name: 'email', data: this.state.Email },
//         { name: 'address', data: this.state.Address },
//         { name: 'city', data: this.state.City },
//         { name: 'username', data: this.state.Username },
//         { name: 'password', data: this.state.Password },

//     ]).then((resp) => {
//         var tempMSG = resp.data;
//         tempMSG = tempMSG.replace(/^"|"$/g, '');
//         Alert.alert(tempMSG);
//     }).catch((error) => {
//         console.error(error);
//     });
// }


// render() {

//     let category = [{
//         value: 'Food NGO',
//     }, {
//         value: 'Health NGO',
//     }, {
//         value: 'Clothes NGO ',
//     }, {
//         value: 'Poverty NGO',
//     }, {
//         value: 'Blood NGO'
//     }];

//     let city = [
//         {
//             value: 'Anand',
//         },
//         {
//             value: 'Vadodra'
//         },
//         {
//             value: 'Surat'
//         },
//         {
//             value: 'Ahmedabad'
//         },


//     ]
// return (
//     <View style={styles.container}>
//         <ScrollView>
//             <View style={styles.inputContainer}>
//                 <TextInput style={styles.inputs}
//                     placeholder="Enter NGO Name"
//                     underlineColorAndroid='transparent'
//                     onChangeText={Name => this.setState({ Name })} />
//             </View>

//             <View style={styles.inputContainer}>
//                 <TextInput style={styles.inputs}
//                     underlineColorAndroid='transparent'
//                     placeholder="Select Username"
//                     onChangeText={Username => this.setState({ Username })} />
//             </View>

//             <View style={styles.inputContainer}>
//                 <TextInput style={styles.inputs}
//                     underlineColorAndroid='transparent'
//                     placeholder="Password"
//                     secureTextEntry={true}
//                     onChangeText={Password => this.setState({ Password })} />
//             </View>

//             <Dropdown
//                 label='Choose Category'
//                 data={category}
//                 onChangeText={Category => this.setState({ Category })}
//             />

//             <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>

//                 <View style={styles.ImageContainer}>
//                     {this.state.ImageSource === null ? <Text>Select a Photo</Text> :
//                         <Image style={styles.ImageContainer} source={this.state.ImageSource} />
//                     }
//                 </View>
//             </TouchableOpacity>

//             <View style={styles.inputContainer}>
//                 <TextInput style={styles.inputs}
//                     keyboardType="numeric"
//                     underlineColorAndroid='transparent'
//                     placeholder="Mobile Number"
//                     onChangeText={Mo_no => this.setState({ Mo_no })} />
//             </View>

//             <View style={styles.inputContainer}>
//                 <TextInput style={styles.inputs}
//                     placeholder="Email Address"
//                     keyboardType="email-address"
//                     underlineColorAndroid='transparent'
//                     onChangeText={Email => this.setState({ Email })} />
//             </View>


//             <View style={styles.inputContainer}>
//                 <TextInput style={styles.inputs}
//                     placeholder="Address"
//                     keyboardType="email-address"
//                     underlineColorAndroid='transparent'
//                     onChangeText={Address => this.setState({ Address })} />
//             </View>

//             <Dropdown
//                 label='Choose City'
//                 data={city}
//                 onChangeText={City => this.setState({ City })}
//             />


//             <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.InsertDataToServer}>
//                 <Text style={styles.loginText}>Signup</Text>
//             </TouchableHighlight>
//         </ScrollView>
//     </View>

//         );
//     }
// }

// const styles = StyleSheet.create({

//     container: {
//         flex: 1,
//         alignItems: 'center',
//         backgroundColor: '#FFF8E1',
//         paddingTop: 20
//     },

//     ImageContainer: {
//         borderRadius: 10,
//         width: 250,
//         height: 250,
//         borderColor: '#9B9B9B',
//         borderWidth: 1 / PixelRatio.get(),
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#CDDC39',

//     },

//     TextInputStyle: {

//         textAlign: 'center',
//         height: 40,
//         width: '80%',
//         borderRadius: 10,
//         borderWidth: 1,
//         borderColor: '#028b53',
//         marginTop: 20
//     },

//     button: {

//         width: '80%',
//         backgroundColor: '#00BCD4',
//         borderRadius: 7,
//         marginTop: 20
//     },

//     TextStyle: {
//         color: '#fff',
//         textAlign: 'center',
//         padding: 10
//     },
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#DCDCDC',
//     },
//     inputContainer: {
//         borderBottomColor: '#F5FCFF',
//         backgroundColor: '#FFFFFF',
//         borderRadius: 30,
//         borderBottomWidth: 1,
//         width: 250,
//         height: 45,
//         marginBottom: 20,
//         flexDirection: 'row',
//         alignItems: 'center'
//     },
//     inputs: {
//         height: 45,
//         marginLeft: 16,
//         borderBottomColor: '#FFFFFF',
//         flex: 1,
//     },
//     inputIcon: {
//         width: 30,
//         height: 30,
//         marginLeft: 15,
//         justifyContent: 'center'
//     },
//     buttonContainer: {
//         height: 45,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 20,
//         width: 250,
//         borderRadius: 30,
//     },
//     loginButton: {
//         backgroundColor: 'red'// "#00b5ec",
//     },
//     loginText: {
//         color: 'white',
//     }
// });
