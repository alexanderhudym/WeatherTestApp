import {types} from './weatherActions';

const initialState = {
    isLoading: false,
    currentLocation: null,
    weatherForecasts: [],
    error: null
};

const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.getWeatherProcessing:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case types.getWeatherSuccess:
            return {
                ...state,
                isLoading: false,
                currentLocation: action.location,
                weatherForecasts: action.weatherForecasts
            };
        case types.getWeatherError:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        default:
            return {
                ...state
            }
    }
};


export default weatherReducer;
