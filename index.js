/**
 * @format
 */

import { AppRegistry, View } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { PaperProvider, Text } from 'react-native-paper';

const Main = () => {
    return (
        <PaperProvider>
            <App />
        </PaperProvider >
    )
}

AppRegistry.registerComponent(appName, () => Main);
