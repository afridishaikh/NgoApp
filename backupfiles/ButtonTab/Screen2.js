import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

export default class Screen extends React.Component {

  onPress = () => {
    this.props.navigation.navigate('Tab1') // this will navigate to Tab1
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Tab 2</Text>
        <Button title={'Switch tab'} onPress={this.onPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});