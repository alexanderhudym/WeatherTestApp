import axios from "axios";

const API_KEY = 'sW7vwdfRw4xsnzUml1uSFdyC16suHjHn';

const client = axios.create({
    baseURL: 'http://dataservice.accuweather.com/'
});

const getWeatherForecast = async locationId => await client.get(`forecasts/v1/daily/5day/${locationId}`, {
    params: {
        'apikey': API_KEY
    }
});

const getLocationByText = async text => await client.get('locations/v1/search', {
    params: {
        'apikey': API_KEY,
        'q': text
    }
});

const getLocationByCoordinates = async ({lat, lng}) => await client.get('locations/v1/cities/geoposition/search', {
    params: {
        'apikey': API_KEY,
        'q': `${lat},${lng}`,
        'toplevel': true
    }
});

export default {
    getWeatherForecast,
    getLocationByText,
    getLocationByCoordinates
}
