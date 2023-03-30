/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { Component } from 'react';
import Splash from './src/components/assets/splash/Splash';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {currentScreen : 'Splash'};
        setTimeout(() => {
            this.setState({ currentScreen: 'App' })
        }, 4000);
    }
    render() {
        const { currentScreen } = this.state;
        let mainScreen = currentScreen === 'Splash' ? <Splash/> : <App/>
        return mainScreen
    }

}

AppRegistry.registerComponent(appName, () => Main);
