import {Navigation} from 'react-native-navigation';

import SScreen from './SScreen';

export function registerScreens() {

    Navigation.registerComponent('ngo.SScreen', () => SScreen);
}
