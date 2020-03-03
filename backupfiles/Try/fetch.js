import React, { Component } from 'react'
import { Platform, StyleSheet, View, FlatList, ActivityIndicator, Image, Modal, TouchableOpacity, ImageBackground ,Text} from 'react-native'


export class List extends Component {
    constructor() {
        super();
        isLoading: true,
        this.state = {
            // dataSource: []
            TempImageURL : ''
        }
    }
componentDidMount() {
        const url = 'http://192.168.42.250/Project/fetch.php'
        fetch(url)
            .then((Response) => Response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
 
        if (this.state.isLoading) {
 
            return (
 
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
 
                <ActivityIndicator size="large" />
 
              </View>
            
          );
          
        }
    }

renderItem = ({ item }) => {
    return (
        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 3 }}>
            <Image style={{ width: 100, height: 100, margin: 5 }}
                source={{ uri: item.image_path }} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
                {/* <Text>
                    {item.image_path}
                </Text> */}
                <Text style={{fontSize:18, color:'green', marginBottom:15}}>
                    {item.Address}
                // </Text>
            </View>
        </View>
    )
}

renderSeprator = () => {
    return(
        <View style= {{height:2, width:"100%", backgroundColor:'black'}}> 
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
                ItemSeparatorComponent = {this.renderSeprator}
            />
        </View>
    )
}
}
export default List

// import React, { Component } from 'react';
 
// import { StyleSheet, ActivityIndicator, ListView, Text, View, Alert } from 'react-native';
 
// export default class Project extends Component {
  
//   constructor(props) {

//     super(props);

//     this.state = {

//       isLoading: true,

//     }

//   }

// GetItem (flower_name) {
   
//   Alert.alert(flower_name);
 
// }
 
// componentDidMount(){



//   return fetch('https://ngoapp3219.000webhostapp.com/db/FlowersList.php')

//   .then((response) => response.json())
//   .then((responseJson) => {
//     let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//     this.setState({
//       isLoading: false,
//       dataSource: ds.cloneWithRows(responseJson),
//     }, function() {
//       // In this block you can do something with new state.
//     });
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// }
 
//   ListViewItemSeparator = () => {
//     return (
//       <View
//         style={{
//           height: 2,
//           width: "100%",
//           backgroundColor: "#000",
//         }}
//       />
//     );
//   }

//   render() {
//     if (this.state.isLoading) {
//       return (
//         <View style={{flex: 1, paddingTop: 20}}>
//           <ActivityIndicator />
//         </View>
//       );
//     }
 
//     return (
 
//       <View style={styles.MainContainer}>
 
//         <ListView
 
//           dataSource={this.state.dataSource}
 
//           renderSeparator= {this.ListViewItemSeparator}

//           enableEmptySections = {true}
 
//           renderRow={(rowData) => <Text style={styles.rowViewContainer} 
//           onPress={this.GetItem.bind(this, rowData.flower_name)} >{rowData.flower_name}</Text>}

//         />
 
//       </View>
//     );
//   }
// }
 
// const styles = StyleSheet.create({
 
// MainContainer :{
// justifyContent: 'center',
// flex:1,
// margin: 10
 
// },
 
// rowViewContainer: {
//   fontSize: 20,
//   paddingRight: 10,
//   paddingTop: 10,
//   paddingBottom: 10,
// }
 
// });