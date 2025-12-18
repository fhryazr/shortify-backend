import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./dtos/auth-response.dto";

export class AuthController {
  private authService = new AuthService()

  signUp = async (req: Request, res: Response) => {
    const { fullname, email, password } = req.body;

    const dataUser = await this.authService.signUp(fullname, email, password);

    return res.status(201).json({
      message: "User registered successfully",
      data: dataUser
    });
  }

  signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const token = await this.authService.signIn(email, password);

    return res.status(200).json({
      message: "User signed in successfully",
      token
    });
  }

}