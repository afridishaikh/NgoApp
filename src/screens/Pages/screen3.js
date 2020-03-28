//This is an example of Tab inside Navigation Drawer in React Native//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text } from 'react-native';
// import all basic components
 
export default class Screen3 extends Component {
  //Screen3 Component
  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 23 }}> Screen 3 </Text>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },
});
// //Bottom Material Tabs
// import React, { Component } from 'react';
// import { Text, StyleSheet, ScrollView, View, ImageComponent } from 'react-native';

// import Icon from 'react-native-vector-icons/FontAwesome';

// import { createAppContainer } from 'react-navigation';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

// import HomeRoute from '../Home/HRoutes'

// // import HomeRoute from './../Home/Home'
// import UserRoute from '../Users/URoutes'
// // import UserRoute from '../Users/login'
// //Routes for Material Bottom Tabs
// function Feed() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Feed!</Text>
//     </View>
//   );
// }

// function Profile() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Profile!</Text>
//     </View>
//   );
// }

// function Notifications() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Notifications!</Text>
//     </View>
//   );
// }

// //Material Bottom Tabs
// const TabNavigator = createMaterialBottomTabNavigator(
//     //Define Routes & Tabs
//     {
//         Home: {
//             screen: this.feed,
//             navigationOptions: {
//                  tabBarLabel: 'Home',
//                 tabBarIcon: ({ tintColor }) => (
//                     <View>
//                         <Icon style={[{ color: tintColor }]} size={25} name={'home'} />
//                     </View>
//                 )
//             }
//         },
//         UserScreen: {
//             screen: this.profile,
//             navigationOptions: {
//                 tabBarLabel: 'User',
//                 tabBarIcon: ({ tintColor }) => (
//                     <View>
//                         <Icon style={[{ color: tintColor }]} size={25} name={'user'} />
//                     </View>
//                 ),

//                 activeColor: 'white',
//                 inactiveColor: '#3e2465',
//                 barStyle: {
//                     backgroundColor: '#d13560',
//                 },

//             },

//         }
//     },
//     //Styles for BottomTabs
//     {
//         initialRouteName: 'Home',
//         activeColor: 'white',
//         inactiveColor: '#3e2465',
//         barStyle: {
//             backgroundColor: '#694fad',
//         },
//     }
// );

// //Styles for Componets
// const style = StyleSheet.create({
//     cotntainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     }
// });

// export default createAppContainer(TabNavigator);

