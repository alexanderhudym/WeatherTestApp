import React from "react";
import {Image} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import MapScreen from './MapScreen';
import SearchScreen from './SearchScreen';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Provider} from 'react-redux';
import configureStore from "./store";

const TabNavigator = createBottomTabNavigator({
    Map: {
        screen: MapScreen,
        navigationOptions: {
            tabBarIcon: ({focused, tintColor}) => {
                return <Icon name='map' size={25} color={tintColor}/>
            }
        }
    },
    Search: {
        screen: SearchScreen,
        navigationOptions: {
            tabBarIcon: ({focused, tintColor}) => {
                return <Icon name='search' size={25} color={tintColor}/>
            }
        }
    }
});

const AppContainer = createAppContainer(TabNavigator);

const store = configureStore();

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        )
    }
};

// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';
//
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });
//
// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React Native!</Text>
//         <Text style={styles.instructions}>To get started, edit App.js</Text>
//         <Text style={styles.instructions}>{instructions}</Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
