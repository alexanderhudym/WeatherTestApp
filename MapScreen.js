import React from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {getWeatherByCoordinates} from "./weatherActions";

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    popupContainer: {
        height: 50,
        width: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    loadingContainer: {
        backgroundColor: 'white',
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    messageContainer: {
        backgroundColor: 'white',
        width: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    message: {
        textAlign: 'center'
    }
});

class MapScreen extends React.Component {

    state = {
        coordinate: null,
    };

    render() {
        const {isLoading, currentLocation, weatherForecasts, error} = this.props;
        const {coordinate} = this.state;

        return (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    onLongPress={e => {
                        this.setState({coordinate: e.nativeEvent.coordinate}, () => {
                            this.marker.hideCallout();
                        });
                    }}>
                    {
                        coordinate && <Marker coordinate={coordinate}
                                              ref={ref => this.marker = ref}
                                              onCalloutPress={() => {
                                                  this.marker.hideCallout();
                                              }}
                                              onPress={e => {
                                                  this.marker.hideCallout();
                                                  const {latitude, longitude} = e.nativeEvent.coordinate;
                                                  this.props.getWeatherByCoordinates({lat: latitude, lng: longitude});
                                              }}>
                            <Callout tooltip={true}
                                     onPress={() => {
                                         this.props.navigation.navigate('Search');
                                     }}>
                                {
                                    currentLocation != null ?
                                    <View style={styles.popupContainer}>
                                        <Text>{currentLocation['LocalizedName']}</Text>
                                        <Text>{`${weatherForecasts[0]['Temperature']['Minimum']['Value']}${weatherForecasts[0]['Temperature']['Minimum']['Unit']} - ${weatherForecasts[0]['Temperature']['Maximum']['Value']}${weatherForecasts[0]['Temperature']['Maximum']['Unit']}`}</Text>
                                    </View> : <View/>
                                }
                            </Callout>
                        </Marker>
                    }
                </MapView>
            </View>
        )
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (prevProps.currentLocation != this.props.currentLocation) {
            this.marker.showCallout();
        }
    }
}

// export default MapScreen;

export default connect(
    (state) => ({
        isLoading: state.weatherReducer.isLoading,
        currentLocation: state.weatherReducer.currentLocation,
        weatherForecasts: state.weatherReducer.weatherForecasts,
        error: state.weatherReducer.error
    }),
    dispatch => bindActionCreators({getWeatherByCoordinates}, dispatch)
)(MapScreen);
