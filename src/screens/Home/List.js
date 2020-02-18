import React, { Component } from 'react'
import { Text, View, FlatList, Image, StyleSheet } from 'react-native'

export class List extends Component {
    constructor() {
        super()
        this.state = {
            dataSource: []
        }
    }

renderItem = ({ item }) => {
    return (
        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 3 }}>
            <Image style={{ width: 100, height: 100, margin: 5 }}
                source={{ uri: item.image }} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>
                    {item.book_title}
                </Text>
                <Text>
                    {item.author}
                </Text>
            </View>
        </View>
    )
}
componentDidMount() {
    const url = 'https://www.json-generator.com/api/json/get/ccLAsEcOSq?indent=1'
    fetch(url)
        .then((Response) => Response.json())
        .then((responseJson) => {
            this.setState({
                dataSource: responseJson.book_array
            })
        })
        .catch((error) => {
            console.log(error)
        })
}

render() {
    return (
        <View>
            <FlatList
                data={this.state.dataSource}
                renderItem={this.renderItem}
            />
        </View>
    )
}
}
export default List