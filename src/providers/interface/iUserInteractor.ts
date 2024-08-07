import { User } from "../../entities/user";
import { WeatherData } from "./weatherData";

export interface IuserInteractor {
  test(): Promise<boolean>;
  register(email: string,password:string): Promise<User | null>;
  findUser(email:string):Promise<User|null>
  jwt(userid:string):Promise<string|null>
  checkPass(userid:string,password:string):Promise<boolean>
  weatherCheck(city: string): Promise<WeatherData | null>;
}
