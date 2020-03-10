
import React, { Component } from 'react'
import AddModal from './Modal';
import {
    Platform,
    StyleSheet,
    View,
    FlatList,
    ActivityIndicator,
    Image,
    Modal,
    TouchableOpacity,
    ImageBackground,
    Text
} from 'react-native'

export class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isModalVisible: false
        }
    }
    componentDidMount() {
        const url = 'https://ngoapp3219.000webhostapp.com/db/ngo_list.php'
        fetch(url)
            .then((Response) => Response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson,
                    isLoading: false,
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    renderItem = ({ item }) => {
        return (

            this.state.isLoading
                ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color='red' animating />
                </View>
                :
                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 3 }}>
                    <Image style={{ width: 100, height: 100, margin: 5 }}
                        source={{ uri: item.image }} />
                    <View style={{ flex: 1, justifyContent: 'center' }}>

                    <Text style={{ fontSize: 15, color: 'black',}}>Name:
                        </Text>
                        <Text style={{ fontSize: 18, color: 'orange', marginBottom: 15 }}>
                            {item.name}
                        </Text>

                        <Text style={{ fontSize: 15, color: 'black',}}>Type Of NGO:
                        </Text>
                        <Text style={{ fontSize: 18, color: '#985263', marginBottom: 15 }}>
                            {item.category}
                        </Text>
                        {/* <Text style={{ fontSize: 18, color: '#985263', marginBottom: 15 }}>
                            {item.address}
                        </Text> */}
                    </View>
                </View>
        )
    }
    renderSeprator = () => {
        return (
            <View style={{ height: 2, width: "100%", backgroundColor: 'black' }}>
            </View>
        )
    }
    render() {
        return (
            <View>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={this.renderSeprator}
                />

                <AddModal ref={'addmodal'} parentFlatLIst={this}> </AddModal>
            </View>
        )
    }
}
export default List
