
//Drawers & Tabs
// //This is an example of Tab inside Navigation Drawer in React Native//
// import React, { Component } from 'react';
// //import react in our code.
// import {
//   StyleSheet,
//   Platform,
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
 
// //Import required react-navigation component 
// import {
//   // createDrawerNavigator,
//   // createStackNavigator,
//   createAppContainer
// } from 'react-navigation';

// import {createStackNavigator} from 'react-navigation-stack';
// import { createDrawerNavigator} from 'react-navigation-drawer';
 
// //Import all the screens for Drawer/ Sidebar
// import Screen1 from './src/Pages/screen1';
// import Screen2 from './src/Pages/screen2';
// import Screen3 from './src/Pages/screen3';
 
// //Navigation Drawer Structure for all screen
// class NavigationDrawerStructure extends Component {
//   //Structure for the navigatin Drawer
//   toggleDrawer = () => {
//     //Props to open/close the drawer
//     this.props.navigationProps.toggleDrawer();
//   };
//   render() {
//     return (
//       <View style={{ flexDirection: 'row' }}>
//         <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
//           {/*Donute Button Image */}
//           <Image
//             source={require('./src/image/drawer.png')}
//             style={{ width: 30, height: 30, marginLeft: 5 }}
//           />
      
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }
 
// //Stack Navigator for First Option of Navigation Drawer
// const FirstActivity_StackNavigator = createStackNavigator({
//   //All the screen from the Screen1 will be indexed here
//   First: {
//     screen: Screen1,
//     navigationOptions: ({ navigation }) => ({
//       title: 'Demo Screen 1',
//       headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
//       headerStyle: {
//         // backgroundColor: '#FF9800',
//           backgroundColor: 'purple',

//         shadowOpacity: 0,
//         elevation: 0,
//       },
//       headerTintColor: '#fff',
//     }),
//   },
// });
 
// //Stack Navigator for Second Option of Navigation Drawer
// const Screen2_StackNavigator = createStackNavigator({
//   //All the screen from the Screen2 will be indexed here
//   Second: {
//     screen: Screen2,
//     navigationOptions: ({ navigation }) => ({
//       title: 'Demo Screen 2',
//       headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
 
//       headerStyle: {
//         backgroundColor: '#FF9800',
//       },
//       headerTintColor: '#fff',
//     }),
//   },
// });
 
// //Stack Navigator for Third Option of Navigation Drawer
// const Screen3_StackNavigator = createStackNavigator({
//   //All the screen from the Screen3 will be indexed here
//   Third: {
//     screen: Screen3,
//     navigationOptions: ({ navigation }) => ({
//       title: 'Demo Screen 3',
//       headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
 
//       headerStyle: {
//         backgroundColor: '#FF9800',
//       },
//       headerTintColor: '#fff',
//     }),
//   },
// });
 
// //Drawer Navigator for the Navigation Drawer / Sidebar
// const DrawerNavigatorExample = createDrawerNavigator({
//   //Drawer Optons and indexing
//   Screen1: {
//     //Title
//     screen: FirstActivity_StackNavigator,
//     navigationOptions: {
//       drawerLabel: 'Demo Screen 1',
//     },
//   },
 
//   Screen2: {
//     //Title
//     screen: Screen2_StackNavigator,
//     navigationOptions: {
//       drawerLabel: 'Demo Screen 2',
//     },
//   },
 
//   Screen3: {
//     //Title
//     screen: Screen3_StackNavigator,
//     navigationOptions: {
//       drawerLabel: 'Demo Screen 3',
//     },
//   },
// });
// export default createAppContainer(DrawerNavigatorExample);