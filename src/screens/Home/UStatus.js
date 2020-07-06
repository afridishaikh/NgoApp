import React, { Component } from 'react';
import {
    StyleSheet,
    Modal,
    ActivityIndicator,
    Text,
    Alert,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    ImageBackground,
    animating,
    Linking,
    Dimensions
} from 'react-native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import openMap from 'react-native-open-maps';
import { Card } from 'react-native-paper'
import firebase from '../../../config'

class Home extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            ModalVisibleStatus: false,
            secondModal: false,
            sentModal: false,
            ModalComplete: false,
            TempImageURL: '',
            userid: '',
            id: '',
            dataSource:[]
        }
    }

    // To store AsyncStorage value in state.
    componentDidMount() {
        AsyncStorage.getItem('username').then(value =>
            this.setState({ userid: value }),
        );
    }


// VARIOUS ACTIVITIES
    FetchSent = () => {
        this.setState({
       
            loading: true,
        });
        const { userid } = this.state;
        const root = firebase.database().ref();
        const dataa = root.child('RequestData').orderByChild('u_status').equalTo(`${userid}_Inactive`)
        dataa.on('value', Snapshot => {
            Snapshot.forEach(item => {
                this.state.dataSource.push({ id: item.key, ...item.val() })
            })
            
            this.setState({
                loading: false,
                sentModal: true,
            });

            if (this.state.dataSource==''){
                Alert.alert('Empty List !','Your Sent Request List is Empty !')
                this.setState({
                    sentModal: false,
                    loading: false,
                });
                this.props.navigation.goBack();
            }
        })
    
    }


    FetchPending =() => {
        this.setState({
            loading: true,

        });
        const userid = this.state.userid;
        const root = firebase.database().ref();
        const dataa = root.child('RequestData').orderByChild('u_status').equalTo(`${userid}_Active`)
    
     dataa.on('value', Snapshot => {
            Snapshot.forEach(item => {
                this.state.dataSource.push({ id: item.key, ...item.val() })
            })
         this.setState({
                loading: false,
                ModalVisibleStatus:true
            });

            if (this.state.dataSource==''){
                Alert.alert('Empty List !','Your Pending Request List is Empty !')
                this.setState({
                    ModalVisibleStatus: false,
                    loading: false,
                });
                this.props.navigation.goBack();
            }
        })

        // if (this.state.dataSource==''){
        //     Alert.alert('Check Connection !','Your Pending Request List is Empty !')
        //     this.setState({
        //         ModalVisibleStatus: false,
        //         loading: false,
        //     });
        //     this.props.navigation.goBack();
        // }


     
    }

    FetchComplete = () => {
        this.setState({
            loading: true,
  
        });
        const { userid } = this.state;
        const root = firebase.database().ref();
        const dataa = root.child('RequestData').orderByChild('u_status').equalTo(`${userid}_Complete`)
        dataa.on('value', Snapshot => {
            Snapshot.forEach(item => {
                this.state.dataSource.push({ id: item.key, ...item.val() })
            })
            this.setState({
                loading: false,
                ModalComplete: true,
            })
     

            if (this.state.dataSource==''){
                Alert.alert('Empty List !','Your Completed Request List is Empty !')
                this.setState({
                    ModalComplete: false,
                    loading: false,
                });
                this.props.navigation.goBack();
            }
    
        })
       
    }


    Delete = async(id) => {
        // console.warn(r_id)
        this.setState({
            id: id,
            loading: true,
        });
        const root = firebase.database().ref();
        const dataa = root.child('RequestData').child(id)
       await dataa.remove();
       await Alert.alert('Request Deleted ! ','The Request has been Deleted !');
       await  this.props.navigation.goBack();
    }


    ShowModalFunction(visible, id, image, problem, address, mo_no, latitude, longitude) {
        this.setState({
            secondModal: visible,
            id: id,
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
        
        console.warn(this.state.userid)
        const bg = {uri:'https://firebasestorage.googleapis.com/v0/b/pukaar-c2f79.appspot.com/o/Assest%2Fetc%2Fbg.jpg?alt=media&token=e7d69656-d0a2-427d-aec8-197561522b9a'}

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
            <ImageBackground source={bg} style={styles.backgroundImage}>
                <View style={styles.container}>


                    <Button style={{ marginBottom: 50 }} uppercase={false} icon="send" mode="contained" onPress={this.FetchSent}>
                        Sent Requests</Button>

                    <Button style={{ marginBottom: 50 }} uppercase={false} color="#eeff00" icon="clock-outline" mode="contained" onPress={this.FetchPending}>
                        Pending Requests</Button>

                    <Button icon="check-decagram" uppercase={false} mode="contained" color="#00ea0c" onPress={this.FetchComplete}>
                        Complete Requests</Button>


                    <Modal
                        transparent={false}
                        animationType={"fade"}
                        visible={this.state.ModalComplete}
                        onRequestClose={() => { this.setState({ ModalComplete: false }); this.props.navigation.goBack()}} >


                        <View style={{
                            backgroundColor: '#bc2b78',
                            justifyContent: 'center',
                            alignContent: 'center',
                            paddingLeft: 50,
                            margin: 10,
                            borderColor: 'black',
                            borderWidth: 2
                        }}>
                            <Text style={[styles.loginText, { fontSize: 18 }]} >Your Completed Requests List </Text>
                        </View>

                        <FlatList
                            data={this.state.dataSource}

                            renderItem={({ item }) =>
                                <View>

                                    <Card style={styles.mycard}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image style={{ width: 100, height: 100, margin: 5, borderRadius: 5, borderWidth: 2, borderColor: 'black', flexDirection: 'row' }} source={{ uri: item.u_image }} />
                                            <View style={{ justifyContent: 'center', alignContent: 'center', marginLeft: 20 }}>
                                                <Text style={{ fontSize: 15, color: 'black', }}>Problem:
                         </Text>
                                                <Text style={{ fontSize: 18, color: 'darkblue', marginBottom: 15, flexDirection: 'row' }}>
                                                    {item.problem}
                                                </Text>
                                                <Text style={{ fontSize: 15, color: 'black', }}>Completed by:
                         </Text>
                                                <Text style={{ fontSize: 18, color: 'darkblue', marginBottom: 15, flexDirection: 'row' }}>
                                                    {item.n_name}
                                                </Text>
                                            </View>
                                        </View>
                                    </Card>

                                </View>
                            }
                            keyExtractor={(item, index) => index}
                        />
                    </Modal>


                    {/* Pending Modal */}
                    <Modal
                        transparent={false}
                        animationType={"fade"}
                        visible={this.state.ModalVisibleStatus}
                        onRequestClose={() => { this.setState({ ModalVisibleStatus: false }); this.props.navigation.goBack() }} >

                        <View style={{
                            backgroundColor: '#bc2b78',
                            justifyContent: 'center',
                            alignContent: 'center',
                            paddingLeft: 50,
                            margin: 10,
                            borderColor: 'black',
                            borderWidth: 2
                        }}>

                            <Text style={[styles.loginText, { fontSize: 18 }]} >Your Pending Requests List </Text>
                        </View>


                        <FlatList
                            data={this.state.dataSource}
                            renderItem={({ item }) =>
                                <View>
                                    <Card style={styles.mycard}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image style={{ width: 100, height: 100, margin: 5, borderRadius: 5, borderWidth: 2, borderColor: 'black', flexDirection: 'row' }} source={{ uri: item.u_image }} />
                                            <View style={{ justifyContent: 'center', alignContent: 'center', marginLeft: 20 }}>
                                                <Text style={{ fontSize: 15, color: 'black', }}>Problem:
                         </Text>
                                                <Text style={{ fontSize: 18, color: 'darkblue', marginBottom: 15, flexDirection: 'row' }}>
                                                    {item.problem}
                                                </Text>
                                                <Text style={{ fontSize: 15, color: 'black', }}>Request Taken by:
                         </Text>
                                                <Text style={{ fontSize: 18, color: 'darkblue', marginBottom: 15, flexDirection: 'row' }}>
                                                    {item.n_name}
                                            </Text>
                                            </View>
                                        </View>
                                    </Card>

                                </View>
                            }
                            keyExtractor={(item, index) => index}
                        />
                    </Modal>

                    <Modal
                        transparent={false}
                        animationType={"fade"}
                        visible={this.state.sentModal}
                        onRequestClose={() => { this.setState({ sentModal: false });this.props.navigation.goBack() }} >


                        <View style={{
                            backgroundColor: '#bc2b78',
                            justifyContent: 'center',
                            alignContent: 'center',
                            paddingLeft: 50,
                            margin: 10,
                            borderColor: 'black',
                            borderWidth: 2
                        }}>
                            <Text style={[styles.loginText, { fontSize: 18 }]} >Your Sent Requests List </Text>
                        </View>

                        <FlatList
                            data={this.state.dataSource}

                            renderItem={({ item }) =>
                                <View>
                                    <TouchableOpacity
                                        onPress={this.ShowModalFunction.bind(this, true, item.id, item.u_image, item.problem, item.address, item.mo_no, item.latitude, item.longitude)} >
                                        <Card style={styles.mycard}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image style={{ width: 100, height: 100, margin: 5, borderRadius: 5, borderWidth: 2, borderColor: 'black', flexDirection: 'row' }} source={{ uri: item.u_image }} />
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
                                    visible={this.state.sentModal}
                                    onRequestClose={() => { this.ShowModalFunction(!this.state.sentModal) }} >
                                    <View style={styles.modalView2}>
                                        <Image style={styles.mainImage} source={{ uri: this.state.Image }} />
                                        <TouchableOpacity
                                            activeOpacity={0.5}
                                            style={styles.TouchableOpacity_Style}
                                            onPress={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus) }}>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ flex: 2, alignItems: 'center', }}>

                                        <Text style={styles.modalFont}>Problem</Text>
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

                                        <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                                            <TouchableOpacity onPress={() => { this.dialCall(this.state.Nmo_no) }} activeOpacity={0.7} style={styles.buttonn} >
                                                <Icon style={{ paddingLeft: 50 }} name="phone" size={35} color="#fff" />
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() => { this._goToYosemite(this.state.Latitude, this.state.Longitude) }} activeOpacity={0.7} style={styles.buttonn} >

                                                <Icon style={{ paddingLeft: 50 }} name="map-marker" size={35} color="#fff" />

                                            </TouchableOpacity>
                                        </View>

                                        <Button width={200} style={{}} icon="delete" mode="contained" color='#ff1e00' onPress={this.Delete.bind(this, this.state.id)}>
                                            Delete Request</Button>
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
    modalFont: {
        fontSize: 15,
        color: 'black',
    },
    modalText: {
        fontSize: 18,
        color: '#8803fc',
        marginBottom: 15
    },
    loginText: {
        color: 'white',
    },
    slider: {
        justifyContent: 'center',
        flex: 1,
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

    backgroundImage: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
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

    modalView2: {
        flexDirection: "column",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
        margin: 5,
        backgroundColor: 'black',
        borderRadius: 10
    },

    mainImage: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },

    cardContent: {
        margin: 3,
        flexDirection: 'row'
    },

});

export default Home;