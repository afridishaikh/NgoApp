import React, { Component } from 'react';
import { Platform, StyleSheet, View, FlatList, ActivityIndicator, Image, Modal, TouchableOpacity, ImageBackground } from 'react-native';
export default class App extends Component{
    constructor()
    {
      super();
      this.state = { 
      isLoading: true,
      ModalVisibleStatus: false,
      TempImageURL : ''
     }
    }
    componentDidMount() {
      return fetch('https://ngoapp3219.000webhostapp.com/db/Gallery.php')
             .then((response) => response.json())
             .then((responseJson) => {
               this.setState({
                 isLoading: false,
                 dataSource: responseJson
               }, function() {
                 // In this block you can do something with new state.
               });
             })
             .catch((error) => {
               console.error(error);
             });
         }
 
    ShowModalFunction(visible, imageURL) 
    {
      this.setState({
        ModalVisibleStatus: visible,
        TempImageURL : imageURL})
    }
    
    render() {
        if (this.state.isLoading) {
            return (
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" />
              </View>
          );
        }
      return (
   <View style={styles.MainContainer}>
    
         <FlatList
            data={ this.state.dataSource }
            renderItem={({item}) => 
              <View style={{flex:1, flexDirection: 'column', margin:1 }}> 
                <TouchableOpacity onPress={this.ShowModalFunction.bind(this, true, item.image)} >
                  <Image style={styles.imageThumbnail} source = {{ uri: item.image }} />
                </TouchableOpacity>
              </View> 
            }
            numColumns = { 3 }
            keyExtractor={(item, index) => index}
           />
           {
             this.state.ModalVisibleStatus 
             ?
              (
                <Modal
              transparent={false}
              animationType={"fade"}
              visible={this.state.ModalVisibleStatus}
              onRequestClose={ () => { this.ShowModalFunction(!this.state.ModalVisibleStatus)} } >
                <View style={styles.modalView}>
                    <Image style={styles.mainImage} source = {{ uri: this.state.TempImageURL }} />
                 <TouchableOpacity 
                        activeOpacity = { 0.5 }
                        style={styles.TouchableOpacity_Style}
                        onPress={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus)} }>
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
   MainContainer :{
   justifyContent: 'center',
   flex:1,
   paddingTop: (Platform.OS) === 'ios' ? 20 : 0
    
   },
    
   imageThumbnail: {
     justifyContent: 'center',
     alignItems: 'center',
     height: 180,
     width:150,
     position:"relative",
     resizeMode:"contain"
   },
 
   mainImage:{
 
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width:'98%',
    resizeMode : 'contain'
 
   },
 
   modalView:{
 flexDirection:"column",
    flex:1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding:10,
    backgroundColor: 'black'
 
   },
 
   TouchableOpacity_Style:{
 
    width:25, 
    height: 25, 
    top:9, 
    right:9, 
    position: 'absolute'
 
}
 });



