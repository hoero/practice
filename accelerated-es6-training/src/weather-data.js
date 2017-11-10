export class WeatherData {
    constructor(city, description) {
        this.city        = city;
        this.description = description;
        this.temperature = '';
    }
}

export const WEATHER_PROXY_HANDLER = {
    get(target, property) {
        return Reflect.get(...arguments);
    },
    set(target, property, value) {
        const toFahrenheit = `${(value * 1.8 + 32)} F.`;

        return Reflect.set(target, property, toFahrenheit);
    }
}