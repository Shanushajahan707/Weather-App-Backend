export interface WeatherData {
    city: string;
    temp: number;
    humidity: number;
    wind: number;
    weather: string;
  }
 export interface OpenWeatherMapResponse {
    name: string;
    main: {
      temp: number;
      humidity: number;
    };
    wind: {
      speed: number;
    };
    weather: [
      {
        main: string;
      }
    ];
    message:string
  }