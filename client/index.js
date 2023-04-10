/**
 * @format
 */

import {AppRegistry, View} from 'react-native';
import App from './App';
import {name as appName} from './app.json';


const rootComponent = () => (
  <View style={{ flex: 1 }}>
    <App />
  </View>
);

AppRegistry.registerComponent(appName, () => rootComponent);