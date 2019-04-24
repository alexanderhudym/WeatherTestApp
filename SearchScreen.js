import React from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Text} from 'react-native';
import CardView from 'react-native-cardview'
import Icon from "react-native-vector-icons/MaterialIcons";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {getWeatherByText} from "./weatherActions";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    searchBarContainer: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    searchBarInput: {
        flex: 1
    },
    searchBarButton: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    list: {
        width: '100%',
        flex: 1
    },
    weatherContainer: {
        width: '100%',
        height: 100,
        padding: 10
    },
    weatherCard: {
        borderRadius: 8,
        backgroundColor: '#2b43f9',
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    weatherDate: {
        color: 'white',
        fontSize: 20
    },
    weatherValue: {
        color: 'white',
        fontSize: 15
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    messageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    message: {
        alignItems: 'center'
    }
});

const SearchBar = ({value, onChange, onSearch}) => {
    return (
        <CardView style={styles.searchBarContainer}>
            <TextInput style={styles.searchBarInput}
                       placeholder='Search'
                       value={value}
                       onChangeText={onChange}
                       onSubmitEditing={() => onSearch && onSearch()}
                       returnKeyType='search'/>
            <TouchableOpacity style={styles.searchBarButton}
                              onPress={() => onSearch && onSearch()}>
                <Icon name='search'
                      size={25}/>
            </TouchableOpacity>
        </CardView>
    )
};

const WeatherItem = ({weather, onPress}) => {
    const temperature = weather['Temperature'];
    const min = temperature['Minimum'];
    const max = temperature['Maximum'];
    return (
        <View style={styles.weatherContainer}>
            <TouchableOpacity onPress={() => onPress && onPress()}>
                <View style={styles.weatherCard}>
                    <Text style={styles.weatherDate}>{new Date(weather['Date']).toDateString()}</Text>
                    <Text style={styles.weatherValue}>{`${min['Value']}${min['Unit']} - ${max['Value']}${max['Unit']}`}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
};

const Loading = () => {
    return(
        <View style={styles.loadingContainer}>
            <ActivityIndicator/>
        </View>
    )
};

const Message = ({text}) => {
    return(
        <View style={styles.messageContainer}>
            <Text style={styles.message}>{text}</Text>
        </View>
    )
};

class SearchScreen extends React.Component {

    state = {
        text: ''
    };

    render() {
        const {isLoading, currentLocation, weatherForecasts, error} = this.props;
        const {text} = this.state;

        return (
            <View style={styles.container}>

                <SearchBar value={text}
                           onChange={text => this.setState({text})}
                           onSearch={() => this.props.getWeatherByText(text)}/>

                {
                    isLoading ?
                        <Loading/> :
                        error === null ? <FlatList style={styles.list}
                                                  data={weatherForecasts}
                                                  keyExtractor={weatherForecast => String(weatherForecast['EpochDate'])}
                                                  renderItem={({item}) => <WeatherItem weather={item}
                                                                                       onPress={() => {

                                                                                       }}/>}/> :
                            <Message text='Не удалось загрузить прогноз погоды'/>

                }

            </View>
        )
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (prevProps.currentLocation != this.props.currentLocation) {
            this.setState({text: this.props.currentLocation['LocalizedName']});
        }
    }

    // static getDerivedStateFromProps(props, state) {
    //     if (props.currentLocation) {
    //         return {
    //             text: props.currentLocation['LocalizedName']
    //         }
    //     }
    //     return null;
    // }

}

// export default SearchScreen;

export default connect(
    (state) => ({
        isLoading: state.weatherReducer.isLoading,
        currentLocation: state.weatherReducer.currentLocation,
        weatherForecasts: state.weatherReducer.weatherForecasts,
        error: state.weatherReducer.error
    }),
    dispatch => bindActionCreators({getWeatherByText}, dispatch)
)(SearchScreen);
