import { Response, Request, NextFunction } from "express";
import { IuserInteractor } from "../providers/interface/iUserInteractor";
import { ResponseStatus } from "../constants/statusEnums";
export class userController {
  private _interactor: IuserInteractor;

  constructor(private interactor: IuserInteractor) {
    this._interactor = interactor;
  }

  test = async (req: Request, res: Response, next: NextFunction) => {
    const val = await this._interactor.test();
    res.send(val);
  };
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const userdata = {
        email,
        password,
      };
      if (!email || !password) {
        return res
          .status(ResponseStatus.BadRequest)
          .json({ message: "Email and password are required" });
      }
      const user = await this._interactor.findUser(email);

      if (!user) {
        return res.status(404).json({ message: "User not found " });
      }

      const checkPass = await this._interactor.checkPass(
        user._id as string,
        password
      );

      if (!checkPass) {
        return res.status(404).json({ message: "Password dont match" });
      }

      const jwtData = await this.interactor.jwt(user._id as string);

      if (!jwtData) {
        throw console.error("error while creating jwt token");
      }

      res.status(ResponseStatus.OK).json({
        message: "Login successful",
        token: jwtData,
      });
      
    } catch (error) {
      next(error);
    }
  };
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const userdata = {
        email,
        password,
      };
      if (!email || !password) {
        return res
          .status(ResponseStatus.BadRequest)
          .json({ message: "Email and password are required" });
      }
      const user = await this._interactor.findUser(email);

      if (user) {
        return res.status(404).json({ message: "User alrady exists " });
      }
      const saveData = await this._interactor.register(email, password);
      if (!saveData) {
        return res.status(404).json({ message: "Error saving data " });
      }
      res
        .status(ResponseStatus.Created)
        .json({ message: "User registered successfully", user: saveData });
    } catch (error) {
      next(error);
    }
  };

  weather = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("here", req.query.city);
      const weather = await this._interactor.weatherCheck(
        req.query.city as string
      );
      console.log(weather);
      if (weather) {
        return res
          .status(ResponseStatus.OK)
          .json({ message: "Weather data fetched", WeatherData: weather });
      } else {
        return res
          .status(ResponseStatus.NotFound)
          .json({ message: "Weather data not found for the provided city" });
      }
    } catch (error) {
      next(error);
    }
  };
}
