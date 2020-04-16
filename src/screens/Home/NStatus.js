import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Modal, PixelRatio,ActivityIndicator, Text, Alert,View, FlatList, Button, Image, TextInput, ScrollView, TouchableOpacity, TouchableHighlight, BackHandler, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'rn-fetch-blob';

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
            r_id: ''
        }
    }


    // To store AsyncStorage value in state.
      componentDidMount() {
        AsyncStorage.getItem('username').then(value =>
            //AsyncStorage returns a promise so adding a callback to get the value
            this.setState({ userid: value}),
        );
      }

    FetchPending = () => {
        // console.warn(this.state.userid)
        this.setState({
            ModalVisibleStatus: true,
        });
        const { userid } = this.state;
        console.warn(userid)
        fetch('https://ngoapp3219.000webhostapp.com/db/status/status_pen.php', {
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
                if (responseJson) {
                    this.setState({
                        dataSource: responseJson
                    })

                }
                else {
                    alert('Please Login Again');
                    //alert for the empty InputText
                }
            }
            ).catch((error) => {
                console.error(error);
            });
    }

    // Complete = () => {
    //     // console.warn(r_id)
    //     this.setState({
    //         r_id: r_id,
    //       });
    //       console.warn(this.state.userid)
    //     RNFetchBlob.fetch('POST', 'https://ngoapp3219.000webhostapp.com/db/status/complete.php', {
    //       Authorization: "Bearer access-token",
    //       otherHeader: "foo",
    //       'Content-Type': 'multipart/form-data',
    //     }, [
    //       { name: 'username', data: this.state.userid },
    //       {name:'r_id', data:r_id}
    
    //     ]).then((resp) => {
    //       var tempMSG = resp.data;
    //       // tempMSG = tempMSG.replace(/^"|"$/g, '');
    //       tempMSG = tempMSG.replace(/\"/g, "");
    //       Alert.alert(tempMSG);
    //     }).catch((error) => {
    //       console.error(error);
    //     });
    //   }

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

      FetchComplete = () => {
        // console.warn(this.state.userid)
        this.setState({
            ModalComplete: true,
        });
        const { userid } = this.state;
        console.warn(userid)
        fetch('https://ngoapp3219.000webhostapp.com/db/status/status_com.php', {
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
                if (responseJson) {
                    this.setState({
                        dataSource: responseJson
                    })

                }
                else {
                    alert('Please Login Again');
                    //alert for the empty InputText
                }
            }
            ).catch((error) => {
                console.error(error);
            });
    }

    Complete = (r_id) => {
        // console.warn(r_id)
        this.setState({
            r_id: r_id,
          });
          console.warn(this.state.userid)
        
        // RNFetchBlob.fetch('POST', 'https://ngoapp.000webhostapp.com/ngoapp/n_signup.php', {
        RNFetchBlob.fetch('POST', 'https://ngoapp3219.000webhostapp.com/db/complete.php', {
            Authorization: "Bearer access-token",
            otherHeader: "foo",
            'Content-Type': 'multipart/form-data',
        }, [
            { name: 'username', data: this.state.userid },
            {name:'r_id', data:r_id},
            { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },

        ]).then((resp) => {
            var tempMSG = resp.data;
            tempMSG = tempMSG.replace(/^"|"$/g, '');
            Alert.alert(tempMSG);
        }).catch((error) => {
            console.error(error);
        });
      }

     

      Cancel=(r_id)=>{

                 console.warn(r_id)
        this.setState({
            r_id: r_id,
          });
          console.warn(this.state.userid)
        RNFetchBlob.fetch('POST', 'https://ngoapp3219.000webhostapp.com/db/status/cancel.php', {
          Authorization: "Bearer access-token",
          otherHeader: "foo",
          'Content-Type': 'multipart/form-data',
        }, [
          { name: 'username', data: this.state.userid },
          {name:'r_id', data:r_id}
    
        ]).then((resp) => {
          var tempMSG = resp.data;
          // tempMSG = tempMSG.replace(/^"|"$/g, '');
          tempMSG = tempMSG.replace(/\"/g, "");
          Alert.alert(tempMSG);
        }).catch((error) => {
          console.error(error);
        });
      }

      
    ShowModalFunction(visible, r_id, image, name, address, mo_no, latitude, longitude) {
        this.setState({
            r_id: r_id,
            secondModal: visible,
            Image: image,
            Iname: name,
            Naddress: address,
            Nmo_no: mo_no,
            Latitude: latitude,
            Longitude: longitude
        });
    }

    renderSeprator = () => {
        return (
            <View style={{ height: 2, width: "100%", backgroundColor: 'black' }}>
            </View>
        )
    }

    render() {

        return (
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 3 }}>
                <TouchableOpacity
                    onPress={this.FetchPending}
                    style={styles.button}>
                    <Text style={styles.buttonText}> Pending Requests </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this.FetchComplete}
                    style={styles.button}>
                    <Text style={styles.buttonText}> Completed </Text>
                </TouchableOpacity>

                <Modal
                    transparent={false}
                    animationType={"fade"}
                    visible={this.state.ModalComplete}
                    onRequestClose={() => { this.setState({ ModalComplete: false }); }} >
                    <FlatList
                        data={this.state.dataSource}
                        ItemSeparatorComponent={this.renderSeprator}
                        renderItem={({ item }) =>
                            <View>
                                <TouchableOpacity
                                    onPress={this.ShowModalFunction.bind(this, true, item.r_id, item.image, item.name, item.address, item.mo_no, item.latitude, item.longitude)} >
                                    <Image style={{ width: 100, height: 100, margin: 5, flexDirection: 'row' }} source={{ uri: item.image }} />
                                    <Text style={{ fontSize: 15, color: 'black', }}>Problem:
                         </Text>
                                    <Text style={{ fontSize: 18, color: 'orange', marginBottom: 15, flexDirection: 'row' }}>
                                        {item.problem}
                                    </Text>

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
                    <FlatList
                        data={this.state.dataSource}
                        ItemSeparatorComponent={this.renderSeprator}
                        renderItem={({ item }) =>
                            <View>
                                <TouchableOpacity
                                    onPress={this.ShowModalFunction.bind(this, true, item.r_id, item.image, item.name, item.address, item.mo_no, item.latitude, item.longitude)} >
                                    <Image style={{ width: 100, height: 100, margin: 5, flexDirection: 'row' }} source={{ uri: item.image }} />
                                    <Text style={{ fontSize: 15, color: 'black', }}>Problem:
                         </Text>
                                    <Text style={{ fontSize: 18, color: 'orange', marginBottom: 15, flexDirection: 'row' }}>
                                        {item.problem}
                                    </Text>

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
                                    <Image style={styles.mainImage} source={{ uri: this.state.Image }} />
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        style={styles.TouchableOpacity_Style}
                                        onPress={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus) }}>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ flex: 2 }}>

                                    <Text style={{ fontSize: 15, color: 'black', }}>Name:
                         </Text>
                                    <Text style={{ fontSize: 18, color: 'blue', marginBottom: 1 }}>
                                        {this.state.Iname}
                                    </Text>

                                    <Text style={{ fontSize: 15, color: 'black', }}>Address:
                         </Text>
                                    <Text style={{ fontSize: 18, color: 'orange', marginBottom: 15 }}>
                                        {this.state.Naddress}
                                    </Text>

                                    <Text style={{ fontSize: 15, color: 'black', }}>Mobile: </Text>
                                    <Text style={{ fontSize: 18, color: 'orange', marginBottom: 15 }}>
                                        {this.state.Nmo_no}
                                    </Text>

                                    <Text style={{ fontSize: 15, color: 'black', }}>Location: </Text>
                                    <Text style={{ fontSize: 18, color: 'orange', marginBottom: 15 }}>
                                        {this.state.Latitude}, {this.state.Longitude}
                                    </Text>

                                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                            <View style={styles.ImageContainer}>
                                {/* <Icon style={styles.Icon} name="camera" size={50} color="#000" /> */}
                                {this.state.ImageSource === null ?  <Icon style={styles.Icon} name="camera" size={50} color="grey" />  :
                                    <Image style={styles.ImageContainer} source={this.state.ImageSource} />
                                }
                            </View>
                        </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={this.Complete.bind(this, this.state.r_id)}
                                        style={styles.button}>
                                        <Text style={styles.buttonText}> Complete Requests </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={this.Cancel.bind(this, this.state.r_id)}
                                        style={styles.button}>
                                        <Text style={styles.buttonText}> Cancel Requests </Text>
                                    </TouchableOpacity>

                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                                    <TouchableOpacity onPress={() => { this.dialCall(this.state.Nmo_no) }} activeOpacity={0.7} style={styles.buttonn} >
                                        <Icon style={{ paddingLeft: 50 }} name="phone" size={35} color="#fff" />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => { this._goToYosemite(this.state.Latitude, this.state.Longitude) }} activeOpacity={0.7} style={styles.buttonn} >
                                        {/* <Icon style={{ paddingLeft: 50 }} name="palm" size={35} color="#fff" />
                     */}
                                        <Text style={{ fontSize: 15, color: 'white' }}>  GoFor Help </Text>
                                    </TouchableOpacity>
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#DCDCDC',
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
    Button2: {
        backgroundColor: "green",
        borderWidth: 2,
        borderColor: 'black'
    },
    loginText: {
        color: 'white',
    },
    slider: {
        justifyContent: 'center',
        flex: 1,
    }
});

export default Home;