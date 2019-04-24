import weatherApi from './weatherApi';

export const types = {
    getWeatherProcessing: 'get_weather_processing',
    getWeatherSuccess: 'get_weather_success',
    getWeatherError: 'get_weather_error'
};

export const getWeatherByText = text => async dispatch => {
    try {
        dispatch({type: types.getWeatherProcessing});
        const locationResponse = await weatherApi.getLocationByText(text);
        const locations = locationResponse.data;
        const forecastsResponse = await weatherApi.getWeatherForecast(locations[0]['Key']);
        const forecasts = forecastsResponse.data['DailyForecasts'];
        dispatch({type: types.getWeatherSuccess, weatherForecasts: forecasts, currentLocation: locations[0]});
    } catch (e) {
        dispatch({type: types.getWeatherError, error: e});
    }
};

export const getWeatherByCoordinates = ({lat, lng}) => async dispatch => {
    try {
        dispatch({type: types.getWeatherProcessing});
        const locationResponse = await weatherApi.getLocationByCoordinates({lat, lng});
        const location = locationResponse.data;
        const forecastsResponse = await weatherApi.getWeatherForecast(location['Key']);
        const forecasts = forecastsResponse.data['DailyForecasts'];
        dispatch({type: types.getWeatherSuccess, weatherForecasts: forecasts, currentLocation: location});
    } catch (e) {
        alert(e.message);
        dispatch({type: types.getWeatherError, error: e});
    }
};
