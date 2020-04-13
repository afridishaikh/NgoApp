import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, FlatList, Share, Alert, Button, Modal, Platform, TouchableOpacity, Clipboard } from 'react-native'
import { Card } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
// import { Container, Header, Content, Button, Text } from 'native-base';
export default class App extends Component {
    constructor() {
        var no = 1
        data = [

            { id: no, word: "\"Khawaao me aao na pls.\"" },
            { id: ++no, word: "Nigga wanna die in a \n ,nightmare \n ad \n an" },
            { id: ++no, word: "Hello" },
            // { id: ++no, word: "Hello" },
            // { id: ++no, word: "Hello" },
            // { id: ++no, word: "Hello" },
            // { id: ++no, word: "Hello" },
            // { id: ++no, word: "Hello" },
            // { id: ++no, word: "I am lol" },
            // { id: ++no, word: "Hello" },
            // { id: ++no, word: "Hello" },
            // { id: ++no, word: "Hello" },
            // { id: ++no, word: "Hello" },
        ]

        super();
        this.state = {
            ModalVisibleStatus: false,
            Word: '',
        }
    }

    //Share
    ShareMessage = () => {
        Share.share(
            {
                message: this.state.Word.toString()

            }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));
    }


    //To copy in clipBoard
    setTextIntoClipboard = async (visible, word) => {
        console.warn(this.state.Word)
        await Clipboard.setString(this.state.Word);
    }

    //Modal function
    ShowModalFunction(visible, word) {
        console.warn(word)
        this.setState({
            ModalVisibleStatus: visible,
            Word: word
        });
    }


    render() {
        return (
            <View style={styles.MainContainer}>
                <FlatList
                    data={data}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={this.ShowModalFunction.bind(this, true, item.word)} >
                            <Card style={styles.mycard} key={item.id}>
                                <View style={styles.cardView} >
                                    <Text style={styles.text}> {item.id} </Text>
                                    <Text style={styles.text}> {item.word}  </Text>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    }
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

                                    <View>
                                        <Text style={styles.modalText}>
                                            {this.state.Word}

                                    </Text>
                                        <Text style={{ color: 'white', alignItems: 'center' }}> -24 Hours </Text>
                                    </View>

                                </View>

<View  style={{flexDirection:'row',backgroundColor:'black'}}>

                                <TouchableOpacity onPress={this.setTextIntoClipboard} activeOpacity={0.7} style={styles.touchableButton} >
                                    <Icon style={{ paddingLeft: 50 }} name="Clipboard" size={35} color="red" />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={this.ShareMessage} activeOpacity={0.7} style={styles.touchableButton} >
                                    <Icon style={{ paddingLeft: 50 }} name="share" size={35} color="red" />
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
    MainContainer: {
        flexDirection: 'row',
        textDecorationColor: 'white',
        justifyContent: 'center',
        flex: 1,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0
    },
    mycard: {
        margin: 5,
        padding: 5,
        // width:50,
        height: 150,
        flexDirection: 'row',
        backgroundColor: 'black',
        alignItems: 'center'

    },
    cardView: {
        flexDirection: 'row',
        padding: 6,
        // color:'black'
        alignContent: 'center',
        alignItems: 'center'

    },
    text: {
        fontSize: 20,
        marginLeft: 10,
        color: 'white',
    },
    modalView: {
        flexDirection: "column",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'black'
    },
    modalFont: {
        fontSize: 15,
        color: 'black',

    },
    modalText: {
        fontSize: 25,
        color: 'yellow',
        marginBottom: 15
    },
}
);

// export default Home


// import React, { Component } from 'react';
// import { Text, StyleSheet, View, TextInput, TouchableOpacity, Clipboard } from 'react-native';


// export default class App extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       clipboardText: "",
//       textInputText: ""
//     }
//   }

//   setTextIntoClipboard = async () => {
//     await Clipboard.setString(this.state.textInputText);
//   }

//   getTextFromClipboard = async () => {
//     var textHolder = await Clipboard.getString();
//     this.setState({
//       clipboardText: textHolder
//     })
//   }

//   render() {
//     return (
//       <View style={styles.container} >
//         <TextInput
//           placeholder="Enter Text Here"
//           style={styles.textInputStyle}
//           underlineColorAndroid='transparent'
//           onChangeText={value => this.setState({ textInputText: value })}
//         />

//         <TouchableOpacity onPress={this.getTextFromClipboard} activeOpacity={0.7} style={styles.touchableButton} >
//           <Text style={styles.TextStyle}> PASTE THE COPIED TEXT </Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={this.setTextIntoClipboard} activeOpacity={0.7} style={styles.touchableButton} >
//           <Text style={styles.TextStyle}> COPY TEXTINPUT TEXT INTO CLIPBOARD </Text>
//         </TouchableOpacity>

//         <Text style={{ fontSize: 20 }}>Display Text : {this.state.clipboardText}</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create(
//   {
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       margin: 20
//     },
//     textInputStyle: {
//       textAlign: 'center',
//       height: 41,
//       width: '92%',
//       borderWidth: 1,
//       borderColor: '#009688',
//       borderRadius: 8,
//       marginBottom: 20
//     },
//     touchableButton: {
//       width: '80%',
//       padding: 10,
//       backgroundColor: '#009688',
//       marginBottom: 10,
//     },
//     TextStyle: {
//       color: '#fff',
//       fontSize: 18,
//       textAlign: 'center',
//     }
//   });