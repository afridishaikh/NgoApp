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
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/FontAwesome';
import storage from '@react-native-firebase/storage';
import firebase from '../../../config'

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
            Password: '',
            loading: false
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


    Signup = async() =>{
        console.warn('Firebase call')
        const { Name } = this.state;
        const { Category } = this.state;
        const { Mo_no } = this.state;
        const { Address } = this.state;
        const { City } = this.state;
        const { Email } = this.state;
        const { Password } = this.state;

        //   VALIDATION
        // let phoneno = /^[0]?[6789]\d{9}$/;
        // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        // // console.warn(this.state.Name)
        // if (this.state.Name == '' || this.state.Address == '' || this.state.Username == '' || this.state.City == '' || this.state.Category == '') {
        //     Alert.alert('Input Field should not be Empty !')
        // }
        // else if (this.state.Password.length <= 6) {
        //     Alert.alert('Password Must Be Greater than 6 Characters !');
        //     //    this.setState({Password:text}) 
        //     return false;
        // }
        // else if (this.state.ImageSource == null || this.state.data == null) {
        //     Alert.alert('You must Upload Your NGO image !');
        //     //    this.setState({Password:text}) 
        //     return false;
        // }
        // else if (phoneno.test(this.state.Mo_no) === false) {
        //     Alert.alert('Mobile Number is Invalid !');
        //     //   this.setState({Mo_no:text}) 
        //     return false;
        // }
        // else if (reg.test(this.state.Email) === false) {
        //     Alert.alert('Email Address is Invalid !');
        //     //    this.setState({Email:text}) 
        //     return false;
        // }

        // else {
        //     this.setState({
        //         loading: true,
        //     });

        const { uri } = this.state.ImageSource;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        var storageRef = storage().ref('NgoImg/'+filename);
        await  storageRef.putFile(uploadUri);
        const url = await storageRef.getDownloadURL().catch((error) => {throw error});



        await  firebase.auth().createUserWithEmailAndPassword(Email, Password)
          .then(()=>{  
            this.props.navigation.goBack();
            // AsyncStorage.setItem('userType', 'ngo');
            // AsyncStorage.setItem('username', this.state.username);
            this.setState({
              loading: false,
            });
          })
          .catch(error=>{
            alert(error.message)
            this.setState({
              loading: false,
            });
          })

          
        await  firebase.database().ref('NgoData/').push({
            name:Name,
            ngoType: Category,
            email: Email,
            mo_no : Mo_no,
            password: Password,
            ngoImg: url,
            address : Address,
            city: City
        
          });
        }
    
    //   }
    
    // //Function to send all data to server
    // InsertDataToServer = () => {
    //     //   VALIDATION
    //     let phoneno = /^[0]?[6789]\d{9}$/;
    //     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    //     // console.warn(this.state.Name)
    //     if (this.state.Name == '' || this.state.Address == '' || this.state.Username == '' || this.state.City == '' || this.state.Category == '') {
    //         Alert.alert('Input Field should not be Empty !')
    //     }
    //     else if (this.state.Password.length <= 6) {
    //         Alert.alert('Password Must Be Greater than 6 Characters !');
    //         //    this.setState({Password:text}) 
    //         return false;
    //     }
    //     else if (this.state.ImageSource == null || this.state.data == null) {
    //         Alert.alert('You must Upload Your NGO image !');
    //         //    this.setState({Password:text}) 
    //         return false;
    //     }
    //     else if (phoneno.test(this.state.Mo_no) === false) {
    //         Alert.alert('Mobile Number is Invalid !');
    //         //   this.setState({Mo_no:text}) 
    //         return false;
    //     }
    //     else if (reg.test(this.state.Email) === false) {
    //         Alert.alert('Email Address is Invalid !');
    //         //    this.setState({Email:text}) 
    //         return false;
    //     }

    //     else {
    //         this.setState({
    //             loading: true,
    //         });
    //         RNFetchBlob.fetch('POST', 'https://ngoapp3219.000webhostapp.com/db/ngo_signup.php', {
    //             Authorization: "Bearer access-token",
    //             otherHeader: "foo",
    //             'Content-Type': 'multipart/form-data',
    //         }, [
    //             { name: 'name', data: this.state.Name },
    //             { name: 'category', data: this.state.Category },
    //             { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },
    //             { name: 'mo_no', data: this.state.Mo_no },
    //             { name: 'email', data: this.state.Email },
    //             { name: 'address', data: this.state.Address },
    //             { name: 'city', data: this.state.City },
    //             { name: 'username', data: this.state.Username },
    //             { name: 'password', data: this.state.Password },

    //         ]).then((resp) => {
    //             var tempMSG = resp.data;
    //             tempMSG = tempMSG.replace(/\"/g, "");
    //             Alert.alert(tempMSG);
    //             // this.props.navigation.replace('Nlogin');
    //             this.props.navigation.goBack();
    //             this.setState({
    //                 loading: false,
    //             });
    //         }).catch((error) => {
    //             // console.error(error);
    //             Alert.alert('Network Error !')
    //             this.setState({
    //                 loading: false,
    //               });
    //         });
    //     }
    // }


    render() {

        let category = [{
            value: 'Food NGO',
        }, {
            value: 'Health NGO',
        }, {
            value: 'Garment NGO ',
        }, {
            value: 'Poverty NGO',
        }, {
            value: 'Blood NGO'
        },
        {
            value: 'Other'
        },
        ];

        let city = [
            {
                value: 'Anand',
            },
            {
                value: 'Vadodara'
            },
            {
                value: 'Surat'
            },
            {
                value: 'Ahmedabad'
            },
        ]
        return (
            <View style={styles.Container}>
                <ScrollView style={{ padding: 30 }}>
                    <View style={styles.inputContainer}>
                        <Icon style={styles.Icon} name="pencil" size={25} color="#000" />
                        <TextInput style={styles.inputs}
                            inlineImageLeft='username'
                            inlineImagePadding={2}
                            underlineColorAndroid='transparent'
                            placeholder="Enter NGO Name"
                            underlineColorAndroid='transparent'
                            onChangeText={Name => this.setState({ Name })} />
                    </View>

                    <View style={styles.Dropdown}>
                        {/* <Icon style={styles.Icon} name="user" color="#000"/> */}
                        <Dropdown
                            label='Choose Service Type'
                            data={category}
                            onChangeText={Category => this.setState({ Category })}
                        />
                    </View>

                   
                   

                
                    <Text style={{ fontSize: 20, color: 'back', marginTop:20, marginBottom: 10 }}>Upload Photo of NGO:</Text>
                        


                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        <View style={styles.ImageContainer}>
                            {/* <Icon style={styles.Icon} name="camera" size={50} color="#000" /> */}
                            {this.state.ImageSource === null ? <Icon style={styles.Icon} name="camera" size={50} color="grey" /> :
                                <Image style={styles.ImageContainer3} source={this.state.ImageSource} />
                            }
                        </View>
                    </TouchableOpacity>

                    <View style={styles.inputContainer}>
                        <Icon style={styles.Icon} name="envelope" size={20} color="#000" />
                        <TextInput style={styles.inputs}
                            placeholder="Email Address"
                            keyboardType="email-address"
                            autoCapitalize='none'
                            underlineColorAndroid='transparent'
                            onChangeText={Email => this.setState({ Email })} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon style={styles.Icon} name="lock" size={25} color="#000" />
                        <TextInput style={styles.inputs}
                            underlineColorAndroid='transparent'
                            placeholder="Create Password"
                            secureTextEntry={true}
                            onChangeText={Password => this.setState({ Password })} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon style={styles.Icon} name="mobile" size={30} color="#000" />
                        <TextInput style={styles.inputs}
                            keyboardType="numeric"
                            underlineColorAndroid='transparent'
                            placeholder="Mobile Number"
                            maxLength={10}
                            onChangeText={Mo_no => this.setState({ Mo_no })} />
                    </View>

                   



                    <View style={styles.inputContainer}>
                        <Icon style={styles.Icon} name="map-marker" size={25} color="#000" />
                        <TextInput style={styles.inputs}
                            placeholder="Address"
                            keyboardType="default"
                            underlineColorAndroid='transparent'
                            onChangeText={Address => this.setState({ Address })} />
                    </View>

                    <View style={styles.Dropdown}>
                        <Dropdown
                            label='Choose City'
                            data={city}
                            onChangeText={City => this.setState({ City })}
                        />
                    </View>

                    <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.Signup}>
                        <Text style={styles.loginText}>Signup</Text>
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







//BACKUP PHP
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
//     ActivityIndicator,
//     animating,
//     Modal
// } from 'react-native';
// import { Dropdown } from 'react-native-material-dropdown';
// import ImagePicker from 'react-native-image-picker';
// import RNFetchBlob from 'rn-fetch-blob';
// import Icon from 'react-native-vector-icons/FontAwesome';

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
//             Password: '',
//             loading: false
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

//     //Function to send all data to server
//     InsertDataToServer = () => {
//         //   VALIDATION
//         let phoneno = /^[0]?[6789]\d{9}$/;
//         let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
//         // console.warn(this.state.Name)
//         if (this.state.Name == '' || this.state.Address == '' || this.state.Username == '' || this.state.City == '' || this.state.Category == '') {
//             Alert.alert('Input Field should not be Empty !')
//         }
//         else if (this.state.Password.length <= 6) {
//             Alert.alert('Password Must Be Greater than 6 Characters !');
//             //    this.setState({Password:text}) 
//             return false;
//         }
//         else if (this.state.ImageSource == null || this.state.data == null) {
//             Alert.alert('You must Upload Your NGO image !');
//             //    this.setState({Password:text}) 
//             return false;
//         }
//         else if (phoneno.test(this.state.Mo_no) === false) {
//             Alert.alert('Mobile Number is Invalid !');
//             //   this.setState({Mo_no:text}) 
//             return false;
//         }
//         else if (reg.test(this.state.Email) === false) {
//             Alert.alert('Email Address is Invalid !');
//             //    this.setState({Email:text}) 
//             return false;
//         }

//         else {
//             this.setState({
//                 loading: true,
//             });
//             RNFetchBlob.fetch('POST', 'https://ngoapp3219.000webhostapp.com/db/ngo_signup.php', {
//                 Authorization: "Bearer access-token",
//                 otherHeader: "foo",
//                 'Content-Type': 'multipart/form-data',
//             }, [
//                 { name: 'name', data: this.state.Name },
//                 { name: 'category', data: this.state.Category },
//                 { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },
//                 { name: 'mo_no', data: this.state.Mo_no },
//                 { name: 'email', data: this.state.Email },
//                 { name: 'address', data: this.state.Address },
//                 { name: 'city', data: this.state.City },
//                 { name: 'username', data: this.state.Username },
//                 { name: 'password', data: this.state.Password },

//             ]).then((resp) => {
//                 var tempMSG = resp.data;
//                 tempMSG = tempMSG.replace(/\"/g, "");
//                 Alert.alert(tempMSG);
//                 // this.props.navigation.replace('Nlogin');
//                 this.props.navigation.goBack();
//                 this.setState({
//                     loading: false,
//                 });
//             }).catch((error) => {
//                 // console.error(error);
//                 Alert.alert('Network Error !')
//                 this.setState({
//                     loading: false,
//                   });
//             });
//         }
//     }


//     render() {

//         let category = [{
//             value: 'Food NGO',
//         }, {
//             value: 'Health NGO',
//         }, {
//             value: 'Garment NGO ',
//         }, {
//             value: 'Poverty NGO',
//         }, {
//             value: 'Blood NGO'
//         },
//         {
//             value: 'Other'
//         },
//         ];

//         let city = [
//             {
//                 value: 'Anand',
//             },
//             {
//                 value: 'Vadodara'
//             },
//             {
//                 value: 'Surat'
//             },
//             {
//                 value: 'Ahmedabad'
//             },
//         ]
//         return (
//             <View style={styles.Container}>
//                 <ScrollView style={{ padding: 30 }}>
//                     <View style={styles.inputContainer}>
//                         <Icon style={styles.Icon} name="pencil" size={25} color="#000" />
//                         <TextInput style={styles.inputs}
//                             inlineImageLeft='username'
//                             inlineImagePadding={2}
//                             underlineColorAndroid='transparent'
//                             placeholder="Enter NGO Name"
//                             underlineColorAndroid='transparent'
//                             onChangeText={Name => this.setState({ Name })} />
//                     </View>

//                     <View style={styles.inputContainer}>
//                         <Icon style={styles.Icon} name="user" size={25} color="#000" />
//                         <TextInput style={styles.inputs}
//                             underlineColorAndroid='transparent'
//                             placeholder="Create Username"
//                             autoCapitalize='none'
//                             onChangeText={Username => this.setState({ Username })} />
//                     </View>

//                     <View style={styles.inputContainer}>
//                         <Icon style={styles.Icon} name="lock" size={25} color="#000" />
//                         <TextInput style={styles.inputs}
//                             underlineColorAndroid='transparent'
//                             placeholder="Create Password"
//                             secureTextEntry={true}
//                             onChangeText={Password => this.setState({ Password })} />
//                     </View>

//                     <View style={styles.Dropdown}>
//                         {/* <Icon style={styles.Icon} name="user" color="#000"/> */}
//                         <Dropdown
//                             label='Choose Service Type'
//                             data={category}
//                             onChangeText={Category => this.setState({ Category })}
//                         />
//                     </View>

                
//                     <Text style={{ fontSize: 20, color: 'back', marginTop:20, marginBottom: 10 }}>Upload Photo of NGO:</Text>
                        


//                     <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
//                         <View style={styles.ImageContainer}>
//                             {/* <Icon style={styles.Icon} name="camera" size={50} color="#000" /> */}
//                             {this.state.ImageSource === null ? <Icon style={styles.Icon} name="camera" size={50} color="grey" /> :
//                                 <Image style={styles.ImageContainer3} source={this.state.ImageSource} />
//                             }
//                         </View>
//                     </TouchableOpacity>

//                     <View style={styles.inputContainer}>
//                         <Icon style={styles.Icon} name="mobile" size={30} color="#000" />
//                         <TextInput style={styles.inputs}
//                             keyboardType="numeric"
//                             underlineColorAndroid='transparent'
//                             placeholder="Mobile Number"
//                             maxLength={10}
//                             onChangeText={Mo_no => this.setState({ Mo_no })} />
//                     </View>

//                     <View style={styles.inputContainer}>
//                         <Icon style={styles.Icon} name="envelope" size={20} color="#000" />
//                         <TextInput style={styles.inputs}
//                             placeholder="Email Address"
//                             keyboardType="email-address"
//                             autoCapitalize='none'
//                             underlineColorAndroid='transparent'
//                             onChangeText={Email => this.setState({ Email })} />
//                     </View>


//                     <View style={styles.inputContainer}>
//                         <Icon style={styles.Icon} name="map-marker" size={25} color="#000" />
//                         <TextInput style={styles.inputs}
//                             placeholder="Address"
//                             keyboardType="default"
//                             underlineColorAndroid='transparent'
//                             onChangeText={Address => this.setState({ Address })} />
//                     </View>

//                     <View style={styles.Dropdown}>
//                         <Dropdown
//                             label='Choose City'
//                             data={city}
//                             onChangeText={City => this.setState({ City })}
//                         />
//                     </View>

//                     <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this.InsertDataToServer}>
//                         <Text style={styles.loginText}>Signup</Text>
//                     </TouchableHighlight>
//                 </ScrollView>

//                 {this.state.loading &&
//                     <Modal
//                         transparent={false}
//                         animationType="none"
//                         visible={this.state.loading}>
//                         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
//                             <Text> Please Wait ...</Text>
//                             <ActivityIndicator
//                                 animating={animating}
//                                 color='#bc2b78'
//                                 size={70}
//                                 loading={this.state.loading}
//                             />
//                         </View>
//                     </Modal>
//                 }
//             </View>


//         );
//     }
// }

// const styles = StyleSheet.create({
//     Container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#DCDCDC',
//     },
//     inputContainer: {
//         backgroundColor: 'white',
//         width: 300,
//         height: 50,
//         marginBottom: 20,
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderColor: 'black',
//         borderWidth: 2,
//         borderRadius: 23,
//     },
//     Dropdown: {
//         height: 60,
//         justifyContent: 'center',
//         borderColor: 'black',
//         // borderBottomColor: 'black',
//         backgroundColor: 'white',
//         borderWidth: 2,
//         borderRadius: 23,
//         padding: 10
//     },
//     Icon: {
//         padding: 15,
//         color: '#373b6e'
//     },
//     inputs: {
//         flex: 1,
//         paddingTop: 10,
//         paddingRight: 10,
//         paddingBottom: 10,
//         paddingLeft: 0,
//         justifyContent: 'center',
//         alignContent: "center",

//     },

//     ImageContainer: {
//         borderRadius: 10,
//         width: 300,
//         height: 200,
//         // borderColor: '#9B9B9B',
//         borderWidth: 10 / PixelRatio.get(),
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#3641',
//         backgroundColor: 'white',
//         // marginTop: 5,
//         marginBottom: 25
//     },

//     ImageContainer3: {
//         borderRadius: 10,
//         width: 295,
//         height: 195,
//         marginTop:22,
//         // borderColor: '#9B9B9B',
//         borderWidth: 10 / PixelRatio.get(),
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#3641',
//         backgroundColor: 'white',
//         // marginTop: 5,
//         marginBottom: 25
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
//         backgroundColor: '#694fad',
//         borderRadius: 7,
//         marginTop: 20
//     },

//     TextStyle: {
//         color: '#fff',
//         textAlign: 'center',
//         padding: 10
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

//     signupButton: {
//         margin: 20,
//         marginLeft: 70,
//         marginBottom: 100,
//         width: 150,
//         backgroundColor: "#694fad",
//         borderWidth: 2,
//         borderColor: '#000'
//     },
//     loginText: {
//         color: 'white',
//     }

// });


