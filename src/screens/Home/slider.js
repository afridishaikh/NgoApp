
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
 
import { SliderBox } from "react-native-image-slider-box";
 
export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        require('../../assets/Slider/1.png'),
        require('../../assets/Slider/2.png'),
        require('../../assets/Slider/3.jpg'),
        
        require('../../assets/Logo.png'),
      ]
    };
  }
 
  render() {
    return (
      <View style={styles.container}>
        <SliderBox
        // loopBothSides
        //   autoPlayWithInterval={30}
        autoplay
        circleLoop
          images={this.state.images}
          // onCurrentImagePressed={index =>
          //   console.warn(`image ${index} pressed`)
          // }
        />
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
 
  }
});