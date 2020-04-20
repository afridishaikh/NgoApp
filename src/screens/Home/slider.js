
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
 
import { SliderBox } from "react-native-image-slider-box";
 
export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        require('../../assets/Slider/1.jpg'),
        require('../../assets/Slider/2.jpg'),
        require('../../assets/Slider/3.jpg'),
        require('../../assets/Slider/4.jpg'),
      ]
    };
  }
 
  render() {
    return (
      <View style={styles.container}>
        <SliderBox
  //  ImageComponent={FastImage}
        disableOnPress='false'
        sliderBoxHeight={200}
        dotColor='black'
        ImageComponentStyle={{borderRadius: 15, width: '95%', marginTop: 5}}
        imageLoadingColor="#2196F3"
        // loopBothSides
        //   autoPlayWithInterval={30}
        autoplay
        circleLoop
        disableOnPress='true'

        paginationBoxStyle={{
          position: "absolute",
          bottom: 0,
          padding: 0,
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          paddingVertical: 10
        }}

        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          padding: 0,
          margin: 0,
          backgroundColor: "rgba(128, 128, 128, 0.92)"
        }}
          images={this.state.images}

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