import Screen1 from './Screen1';
import Screen2 from './Screen2';
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

// create TabNavigator
const screens = {
  Tab1: {
    screen: Screen1
  },
  Tab2: {
    screen: Screen2
  }
};

const config = {
  headerMode: 'none',
  initialRouteName: 'Tab1'
};


const TabNavigator = createBottomTabNavigator(screens, config);
export default createAppContainer(TabNavigator);