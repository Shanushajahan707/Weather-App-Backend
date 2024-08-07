import { User } from "../entities/user";
import { UserModel } from "../model/user";
import { iUserRespository } from "../providers/interface/iUserRepositories";
import {
  OpenWeatherMapResponse,
  WeatherData,
} from "../providers/interface/weatherData";
import bcrypt from 'bcryptjs'

export class userRepository implements iUserRespository {
  private apiKey = process.env.weatherApi_key;
  private apiUrl = process.env.weatherApi;

  checkPass = async (userid: string, password: string): Promise<boolean> => {
    try {
      const user = await UserModel.findById(userid).exec();
  
      if (!user) {
        // User not found
        return false;
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      return isMatch;
    } catch (error) {
      throw error;
    }
  };

  findUser = async (email: string): Promise<User | null> => {
    try {
      return UserModel.findOne({ email: email });
    } catch (error) {
      throw error;
    }
  };

  register = async (email: string, password: string): Promise<User | null> => {
    try {

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
        email,
        password: hashedPassword,
        isblocked: false,
      });

      const savedUser = await newUser.save();

      return new User(
        savedUser.email,
        savedUser.password,
        savedUser.isblocked,
        savedUser._id as string
      );
    } catch (error) {
      throw error;
    }
  };

  weatherCheck = async (city: string): Promise<WeatherData | null> => {
    if (!city) {
      throw new Error("City name is required");
    }

    const cleanCity = city.replace(/'/g, "");
    const url = `${this.apiUrl}${encodeURIComponent(cleanCity)}&appid=${
      this.apiKey
    }`;
    console.log("Request URL:", url); 

    try {
      const response = await fetch(url);

      if (!response.ok) {
        // Attempt to parse the response JSON and assert its type
        const errorData = await response
          .json()
          .catch(() => ({ message: "Unknown error occurred" }));
        if (
          typeof errorData === "object" &&
          errorData !== null &&
          "message" in errorData
        ) {
          console.error(
            "API Error:",
            (errorData as { message: string }).message
          );
          throw new Error(
            (errorData as { message: string }).message ||
              "Error fetching weather data"
          );
        } else {
          console.error("API Error: Unknown error format");
          throw new Error("Error fetching weather data");
        }
      }

      const data = (await response.json()) as OpenWeatherMapResponse;

      return {
        city: data.name,
        temp: data.main.temp,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        weather: data.weather[0].main,
      };
    } catch (error) {
      console.error("Error in weatherCheck:", error);
      return null;
    }
  };

  test = async (): Promise<boolean> => {
    if (Math.random() > 0.5) {
      return true;
    }
    return false;
  };
}
