import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  View,
  Text,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

//Import required react-navigation component 
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

//Import all the screens for Drawer
import TabNavigator from './TabNavigator';
import Screen3 from './screen3';
import Login1 from './login1';


// ComponentWillMount(){
//   BackHandler.addEventListener('hardwareBackPress', function(){
//     return true;
//   });
// }


//Navigation Drawer Structure for all screen
class NavigationDrawerStructure extends Component {
  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  // ComponentWillMount() {
  //   BackHandler.addEventListener('hardwareBackPress', function () {
  //     return true;
  //   }
  //   );
  // }
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={require('../../assets/icons/drawer.png')}
            style={{ width: 30, height: 30, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

//Stack Navigator for First Option of Navigation Drawer
const FirstActivity_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  First: {
    screen: TabNavigator,
    navigationOptions: ({ navigation }) => ({
      // header: null,

      title: 'NGO App',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#694fad',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: "white",
    }),
  },
});

//Stack Navigator for Second Option of Navigation Drawer
const Screen2_StackNavigator = createStackNavigator({
  //All the screen from the Screen2 will be indexed here
  Second: {
    screen: Screen3,
    navigationOptions: ({ navigation }) => ({
      title: 'Demo Screen 2',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});

//Stack Navigator for Third Option of Navigation Drawer
const Screen3_StackNavigator = createStackNavigator({
  //All the screen from the Screen3 will be indexed here
  Third: {
    screen: Screen3,
    navigationOptions: ({ navigation }) => ({
      title: 'Demo Screen 3',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});

//Drawer Navigator for the Navigation Drawer / Sidebar
const DrawerNavigator = createDrawerNavigator({
  //Drawer Optons and indexing
  Screen1: {
    //Title
    screen: FirstActivity_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => <Icon style={[{ color: tintColor }]} size={25} name={'home'} />
    },
  },

  Screen2: {
    //Title
    screen: Screen2_StackNavigator,
    navigationOptions: {
      drawerLabel: 'About Us',
      drawerIcon: ({ tintColor }) => <Icon style={[{ color: tintColor }]} size={25} name={'user'} />
    },
  },

  Screen3: {
    //Title
    screen: Screen3_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Option 3',
    },
  },
});
export default createAppContainer(DrawerNavigator);