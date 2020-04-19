//ADDED CUSTOM DRAWER
import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  animating
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import AsyncStorage from '@react-native-community/async-storage';


import Login from './Users/login'
import Signup from './Users/signup'
import Home from './Home/Home'
import Nlogin from './Users/n_login'
import Nsignup from './Users/n_signup'
import UHome from './Home/UHome'
import NHome from './Home/NHome'
import Request from './Home/Request'
import List from './Home/NList'
import Gallery from './Home/Gallery'
import ReqList from './Home/ReqList'
import First from './Pages/First'
import How from './Pages/HowToUse'
import Feedback from './Pages/Feedback'
import AboutUs from './Pages/AboutUs'
import UStatus from './Home/UStatus'
import NStatus from './Home/NStatus'
import Donate from './Home/Donate'
import CustomSidebarMenu from './CustomSidebarMenu';

//To open and close the Drawer
class NavigationDrawerStructure extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Icon name="bars" style={styles.Icon} size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }
}

global.currentScreenIndex = 0;

//Drawer & stack for New User
const NewUser = createStackNavigator({
  First: {
    screen: First,
    navigationOptions: ({ navigation }) => ({
      header: null,
      title: 'NGO App',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
    }),
  },
  Home: {
    screen: Home,
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
  List: {
    screen: List,   
     navigationOptions: ({ navigation }) => ({
      // header: null,
      title: 'NGO List',
      headerStyle: {
        backgroundColor: '#694fad',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: "white",
    }),
  },
  Gallery: {
    screen: Gallery,
    navigationOptions: ({ navigation }) => ({
      // header: null,
      title: 'Gallery',
      headerStyle: {
        backgroundColor: '#694fad',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: "white",
    }),
  },
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      // header: null,
      title: 'Login As User',
      headerStyle: {
        backgroundColor: '#694fad',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: "white",
    }),
  },
  Nlogin: {
    screen: Nlogin,
    navigationOptions: ({ navigation }) => ({
      // header: null,
      title: 'Login As NGO',
      headerStyle: {
        backgroundColor: '#694fad',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: "white",
    }),
  },
  Signup: {
    screen: Signup,
    navigationOptions: ({ navigation }) => ({
      // header: null,
      title: 'Signup As User',
      headerStyle: {
        backgroundColor: '#694fad',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: "white",
    }),
  },
  Nsignup: {
    screen: Nsignup,
    navigationOptions: ({ navigation }) => ({
      // header: null,
      title: 'Signup As NGO',
      headerStyle: {
        backgroundColor: '#694fad',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: "white",
    }),
  },
  How: {
    screen: How,
    navigationOptions: ({ navigation }) => ({
      // header: null,
      title: 'Signup As NGO',
      headerStyle: {
        backgroundColor: '#694fad',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: "white",
    }),
  },
});

const NewuserNav = createDrawerNavigator({
  //Drawer Optons and indexing
  Screen1: {
    screen: NewUser,
  },
  Screen2: {
    screen: List,
  },
  Screen3: {
    screen: How,
  },
  Screen4: {
    screen: Feedback,
  },
  Screen5: {
    screen: AboutUs,
  },
},
{
  contentComponent: CustomSidebarMenu,
}
);



//Drawer & stack for NGO User
const NGOUser = createStackNavigator({
  NHome: {
    screen: NHome,
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
  List: {
    screen: List,
    navigationOptions: ({ navigation }) => ({
      // header: null,
      title: 'List OF NGO',
      headerStyle: {
        backgroundColor: '#694fad',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: "white",
    }),
  },
  Gallery: {
    screen: Gallery,
    navigationOptions: ({ navigation }) => ({
      // header: null,
      title: 'Gallery',
      headerStyle: {
        backgroundColor: '#694fad',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: "white",
    }),
  },
  ReqList: {
    screen: ReqList,
    navigationOptions: ({ navigation }) => ({
      // header: null,
      title: 'List of Requests',
      headerStyle: {
        backgroundColor: '#694fad',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: "white",
    }),
  },
  NStatus: {
    screen: NStatus,
    navigationOptions: ({ navigation }) => ({
      // header: null,
      title: 'Profile',
      headerStyle: {
        backgroundColor: '#694fad',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: "white",
    }),
  },
  How: {
    screen: How,
    navigationOptions: ({ navigation }) => ({
      // header: null,
      title: 'Signup As NGO',
      headerStyle: {
        backgroundColor: '#694fad',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: "white",
    }),
  },
});


const NGONav = createDrawerNavigator({
  //Drawer Optons and indexing
  Screen1: {
    screen: NGOUser,
  },
  Screen2: {
    screen: List,
  },
  Screen3: {
    screen: How,
  },
  Screen4: {
    screen: Feedback,
  },
  Screen5: {
    screen: AboutUs,
  },
},
{
  contentComponent: CustomSidebarMenu,
});



//Drawer & stack for Exist User
const ExistUser = createStackNavigator({
  UHome: {
    screen: UHome,
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

  Request: {
    screen: Request,
    navigationOptions: ({ navigation }) => ({
      // header: null,
      title: 'Post A Request',
      headerStyle: {
        backgroundColor: '#694fad',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: "white",
    }),
    // headerTintColor: "white",
  },
  List: {
    screen: List,
    navigationOptions: ({ navigation }) => ({
      // header: null,
      title: 'List of NGO',
      headerStyle: {
        backgroundColor: '#694fad',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: "white",
    }),
    
  },
  Gallery: {
    screen: Gallery,
    navigationOptions: ({ navigation }) => ({
      // header: null,
      title: 'Gallery',
      headerStyle: {
        backgroundColor: '#694fad',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: "white",
    }),
  },
   UStatus: {
    screen: UStatus,
    navigationOptions: ({ navigation }) => ({
      // header: null,
      title: 'Profile',
      headerStyle: {
        backgroundColor: '#694fad',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: "white",
    }),
  },
  Donate: {
    screen: Donate,
    navigationOptions: ({ navigation }) => ({
      // header: null,
      title: 'Gallery',
      headerStyle: {
        backgroundColor: '#694fad',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: "white",
    }),
  },
  How: {
    screen: How,
    navigationOptions: ({ navigation }) => ({
      // header: null,
      title: 'Signup As NGO',
      headerStyle: {
        backgroundColor: '#694fad',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: "white",
    }),
  },
});


//Drawer Navigator for the Navigation Drawer / Sidebar
const UserNav = createDrawerNavigator({
  //Drawer Optons and indexing
  Screen1: {
    screen:ExistUser,
  },
  Screen2: {
    screen: List,
  },
  Screen3: {
    screen: How,
  },
  Screen4: {
    screen: Feedback,
  },
  Screen5: {
    screen: AboutUs,
  },
},
{
  contentComponent: CustomSidebarMenu,

});



//Auth check
class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._loadData();
  }

  render() {
    return (
      <View sytyle={{flex:1, justifyContent: 'center', alignItems: 'center'} }>
        
          <ActivityIndicator
                    animating={animating}
                    color='#bc2b78'
                    size={30}
                  />
       </View>
    )
  }
  _loadData = async () => {
    const userType = await AsyncStorage.getItem('userType');
    if (userType == 'user') {
      this.props.navigation.navigate('App');
    }
    else if (userType == 'ngo') {
      this.props.navigation.navigate('NGO');
    } else {
      this.props.navigation.navigate('Auth');
    }
  }
}

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: UserNav,
    NGO: NGONav,
    Auth: NewuserNav,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)
)


//Styling
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
  Icon: {
    paddingLeft: 10
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
});

// // // BACKUP GITHUBBED
// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   Platform,
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   BackHandler,
//   ActivityIndicator,
//   StatusBar,
//   Dimensions
// } from 'react-native'
// import Icon from 'react-native-vector-icons/FontAwesome';

// import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import { createDrawerNavigator } from 'react-navigation-drawer';
// import AsyncStorage from '@react-native-community/async-storage';

// import Login from './Users/login'
// import Signup from './Users/signup'
// import Home from './Home/Home'
// import Nlogin from './Users/n_login'
// import Nsignup from './Users/n_signup'
// import UHome from './Home/UHome'
// import NHome from './Home/NHome'
// import Request from './Home/Request'
// import List from './Home/NList'
// import Gallery from './Home/Gallery'
// import ReqList from './Home/ReqList'
// import First from './Pages/First'


// // import CustomSidebarMenu from './CustomSidebarMenu';

// //To open and close the Drawer
// class NavigationDrawerStructure extends Component {
//   toggleDrawer = () => {
//     this.props.navigationProps.toggleDrawer();
//   };

//   render() {
//     return (
//       <View style={{ flexDirection: 'row' }}>
//         <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
//           <Icon name="bars" style={styles.Icon} size={25} color="#fff" />
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }


// // global.currentScreenIndex = 0;
// //Drawer & stack for New User
// const NewUser = createStackNavigator({
//   First: {
//     screen: First,
//     navigationOptions: ({ navigation }) => ({
//       header: null,
//       title: 'NGO App',
//       headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
//     }),
//   },
//   Home: {
//     screen: Home,
//     navigationOptions: ({ navigation }) => ({
//       // header: null,
//       title: 'NGO App',
//       headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
//       headerStyle: {
//         backgroundColor: '#694fad',
//         shadowOpacity: 0,
//         elevation: 0,
//       },
//       headerTintColor: "white",
//     }),
//   },
//   List: {
//     screen: List,   
//      navigationOptions: ({ navigation }) => ({
//       // header: null,
//       title: 'NGO List',
//       headerStyle: {
//         backgroundColor: '#694fad',
//         shadowOpacity: 0,
//         elevation: 0,
//       },
//       headerTintColor: "white",
//     }),
//   },
//   Gallery: {
//     screen: Gallery,
//     navigationOptions: ({ navigation }) => ({
//       // header: null,
//       title: 'Gallery',
//       headerStyle: {
//         backgroundColor: '#694fad',
//         shadowOpacity: 0,
//         elevation: 0,
//       },
//       headerTintColor: "white",
//     }),
//   },
//   Login: {
//     screen: Login,
//     navigationOptions: ({ navigation }) => ({
//       // header: null,
//       title: 'Login As User',
//       headerStyle: {
//         backgroundColor: '#694fad',
//         shadowOpacity: 0,
//         elevation: 0,
//       },
//       headerTintColor: "white",
//     }),
//   },
//   Nlogin: {
//     screen: Nlogin,
//     navigationOptions: ({ navigation }) => ({
//       // header: null,
//       title: 'Login As NGO',
//       headerStyle: {
//         backgroundColor: '#694fad',
//         shadowOpacity: 0,
//         elevation: 0,
//       },
//       headerTintColor: "white",
//     }),
//   },
//   Signup: {
//     screen: Signup,
//     navigationOptions: ({ navigation }) => ({
//       // header: null,
//       title: 'Signup As User',
//       headerStyle: {
//         backgroundColor: '#694fad',
//         shadowOpacity: 0,
//         elevation: 0,
//       },
//       headerTintColor: "white",
//     }),
//   },
//   Nsignup: {
//     screen: Nsignup,
//     navigationOptions: ({ navigation }) => ({
//       // header: null,
//       title: 'Signup As NGO',
//       headerStyle: {
//         backgroundColor: '#694fad',
//         shadowOpacity: 0,
//         elevation: 0,
//       },
//       headerTintColor: "white",
//     }),
//   },
// });

// const NewuserNav = createDrawerNavigator({
//   //Drawer Optons and indexing
//   Screen1: {
//     //Title
//     screen: NewUser,
//     navigationOptions: {
//       drawerLabel: 'Home',
//       drawerIcon: ({ tintColor }) => <Icon style={[{ color: tintColor }]} size={25} name={'home'} />
//     },

//   },
  
//   Screen2: {
//     //Title
//     screen: NewUser,
//     navigationOptions: {
//       drawerLabel: 'About Us',
//       drawerIcon: ({ tintColor }) => <Icon style={[{ color: tintColor }]} size={25} name={'user'} />
//     },
//   },

//   Screen3: {
//     //Title
//     screen: Nsignup,
//     navigationOptions: {
//       drawerLabel: 'About Us',
//     },
//   },
// },
// // {
// //   //For the Custom sidebar menu we have to provide our CustomSidebarMenu
// //   contentComponent: CustomSidebarMenu,
// //   //Sidebar width
// //   drawerWidth: Dimensions.get('window').width - 130,
// // }
// );


// //Drawer & stack for NGO User
// const NGOUser = createStackNavigator({
//   NHome: {
//     screen: NHome,
//     navigationOptions: ({ navigation }) => ({
//       // header: null,
//       title: 'NGO App',
//       headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
//       headerStyle: {
//         backgroundColor: '#694fad',
//         shadowOpacity: 0,
//         elevation: 0,
//       },
//       headerTintColor: "white",
//     }),
//   },
//   List: {
//     screen: List,
//     navigationOptions: ({ navigation }) => ({
//       // header: null,
//       title: 'List OF NGO',
//       headerStyle: {
//         backgroundColor: '#694fad',
//         shadowOpacity: 0,
//         elevation: 0,
//       },
//       headerTintColor: "white",
//     }),
//   },
//   Gallery: {
//     screen: Gallery,
//     navigationOptions: ({ navigation }) => ({
//       // header: null,
//       title: 'Gallery',
//       headerStyle: {
//         backgroundColor: '#694fad',
//         shadowOpacity: 0,
//         elevation: 0,
//       },
//       headerTintColor: "white",
//     }),
//   },
//   ReqList: {
//     screen: ReqList,
//     navigationOptions: ({ navigation }) => ({
//       // header: null,
//       title: 'List of Requests',
//       headerStyle: {
//         backgroundColor: '#694fad',
//         shadowOpacity: 0,
//         elevation: 0,
//       },
//       headerTintColor: "white",
//     }),
//   },
// });
// //Drawer Navigator for the Navigation Drawer / Sidebar
// const NGONav = createDrawerNavigator({
//   //Drawer Optons and indexing
//   Screen1: {
//     //Title
//     screen: NGOUser,
//     navigationOptions: {
//       drawerLabel: 'NGOUser',
//       drawerIcon: ({ tintColor }) => <Icon style={[{ color: tintColor }]} size={25} name={'home'} />
//     },
//   },

// });



// //Drawer & stack for Exist User
// const ExistUser = createStackNavigator({
//   UHome: {
//     screen: UHome,
//     navigationOptions: ({ navigation }) => ({
//       // header: null,
//       title: 'NGO App',
//       headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
//       headerStyle: {
//         backgroundColor: '#694fad',
//         shadowOpacity: 0,
//         elevation: 0,
//       },
//       headerTintColor: "white",
//     }),
//   },

//   Request: {
//     screen: Request,
//     navigationOptions: ({ navigation }) => ({
//       // header: null,
//       title: 'Post A Request',
//       headerStyle: {
//         backgroundColor: '#694fad',
//         shadowOpacity: 0,
//         elevation: 0,
//       },
//       headerTintColor: "white",
//     }),
//     // headerTintColor: "white",
//   },
//   List: {
//     screen: List,
//     navigationOptions: ({ navigation }) => ({
//       // header: null,
//       title: 'List of NGO',
//       headerStyle: {
//         backgroundColor: '#694fad',
//         shadowOpacity: 0,
//         elevation: 0,
//       },
//       headerTintColor: "white",
//     }),
    
//   },
//   Gallery: {
//     screen: Gallery,
//     navigationOptions: ({ navigation }) => ({
//       // header: null,
//       title: 'Gallery',
//       headerStyle: {
//         backgroundColor: '#694fad',
//         shadowOpacity: 0,
//         elevation: 0,
//       },
//       headerTintColor: "white",
//     }),
//   },
// });
// //Drawer Navigator for the Navigation Drawer / Sidebar
// const UserNav = createDrawerNavigator({
//   //Drawer Optons and indexing
//   Screen1: {
//     //Title
//     screen: ExistUser,
//     navigationOptions: {
//       drawerLabel: 'Home',
//       drawerIcon: ({ tintColor }) => <Icon style={[{ color: tintColor }]} size={25} name={'home'} />
//     },
//   },

//   // Screen2: {
//   //   //Title
//   //   screen: Screen2_StackNavigator,
//   //   navigationOptions: {
//   //     drawerLabel: 'Login As NGO',
//   //     drawerIcon: ({ tintColor }) => <Icon style={[{ color: tintColor }]} size={25} name={'user'} />
//   //   },
//   // },

//   // Screen3: {
//   //   //Title
//   //   screen: Screen3_StackNavigator,
//   //   navigationOptions: {
//   //     drawerLabel: 'About Us',
//   //   },
//   // },
// });
// // // export default createAppContainer(DrawerNavigator);

// class AuthLoadingScreen extends Component {
//   constructor(props) {
//     super(props);
//     this._loadData();
//   }

//   render() {
//     return (
//       <View sytyle={{ flex: 1, justifyContent: 'Center' }}>
//         <ActivityIndicator />
//         <StatusBar barStyle="default" />
//       </View>
//     )
//   }
//   _loadData = async () => {

//     const userType = await AsyncStorage.getItem('userType');
//     if (userType == 'user') {
//       // this.props.navigation.navigate(isLoggedIn!=='1' ? 'Auth' : 'App');
//       this.props.navigation.navigate('App');
//     }
//     else if (userType == 'ngo') {
//       this.props.navigation.navigate('NGO');
//     } else {
//       this.props.navigation.navigate('Auth');
//     }
//     // else{
//     //   this.props.navigation.navigate(isLoggedIn!=='2' ? 'Auth' : 'NGO');
//     // }
//   }
// }


// export default createAppContainer(createSwitchNavigator(
//   {
//     AuthLoading: AuthLoadingScreen,
//     App: UserNav,
//     NGO: NGONav,
//     Auth: NewuserNav,
//   },
//   {
//     initialRouteName: 'AuthLoading',
//   }
// )

// )


// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: "#00BFFF",
//     height: 200,
//   },
//   avatar: {
//     width: 130,
//     height: 130,
//     borderRadius: 63,
//     borderWidth: 4,
//     borderColor: "white",
//     marginBottom: 10,
//     alignSelf: 'center',
//     position: 'absolute',
//     marginTop: 130
//   },
//   Icon: {
//     paddingLeft: 10
//   },
//   name: {
//     fontSize: 22,
//     color: "#FFFFFF",
//     fontWeight: '600',
//   },
//   body: {
//     marginTop: 40,
//   },
//   bodyContent: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 30,
//   },
//   name: {
//     fontSize: 28,
//     color: "#696969",
//     fontWeight: "600"
//   },
//   info: {
//     fontSize: 16,
//     color: "#00BFFF",
//     marginTop: 10
//   },
//   description: {
//     fontSize: 16,
//     color: "#696969",
//     marginTop: 10,
//     textAlign: 'center'
//   },
//   buttonContainer: {
//     marginTop: 10,
//     height: 45,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//     width: 250,
//     borderRadius: 30,
//     backgroundColor: "#00BFFF",
//   },
// });

// // // BACKUP
