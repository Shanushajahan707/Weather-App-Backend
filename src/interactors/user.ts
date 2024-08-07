import { User } from "../entities/user";
import { IuserInteractor } from "../providers/interface/iUserInteractor";
import { iUserRespository } from "../providers/interface/iUserRepositories";
import { WeatherData } from "../providers/interface/weatherData";
import jwt from "jsonwebtoken";

export class userInteractor implements IuserInteractor {
  private _repository: iUserRespository;

  constructor(private repository: iUserRespository) {
    this._repository = repository;
  }

  test = async (): Promise<boolean> => {
    return await this._repository.test();
  };
  jwt = async (userid: string): Promise<string | null> => {
    try {
      const token = jwt.sign(
        {
          id: userid as string,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "2h" }
      );
      if (!token) {
        return null;
      }
      return token;
    } catch (error) {
      throw error;
    }
  };
  checkPass = async (userid: string, password: string): Promise<boolean> => {
    try {
      return await this._repository.checkPass(userid, password);
    } catch (error) {
      throw error;
    }
  };
  register = async (email: string, password: string): Promise<User | null> => {
    try {
      return await this._repository.register(email, password);
    } catch (error) {
      throw error;
    }
  };
  findUser = async (email: string): Promise<User | null> => {
    try {
      return await this._repository.findUser(email);
    } catch (error) {
      throw error;
    }
  };
  weatherCheck = async (city: string): Promise<WeatherData | null> => {
    try {
      return await this._repository.weatherCheck(city);
    } catch (error) {
      throw error;
    }
  };
}
