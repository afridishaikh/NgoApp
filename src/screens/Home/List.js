import React, { Component } from 'react'
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
    constructor() {
        super();
        this.state = {
            isLoading: true,
        }
    }
componentDidMount() {
    const url = 'http://192.168.42.250/Project/fetch.php'
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
                    source={{ uri: item.image_path }} />
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    {/* <Text>
                {item.image_path}
            </Text> */}
                    <Text style={{ fontSize: 18, color: 'green', marginBottom: 15 }}>
                        {item.Address}
                    </Text>
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
        </View>
    )
}
}
export default List
