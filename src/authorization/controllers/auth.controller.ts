import { Request, Response, NextFunction, json } from "express";
import { emailAndPasswordMatch } from "../services/auth.services";
import { AuthData } from '../../shared/types/types';
import UserModel from '../../user/models/user.model';
import { generateNewError } from "../../shared/middlewares/error.middleware";
import { generateToken } from "../../shared/utils/encrypth/jwt.encrypth.utils";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authData: AuthData = { email: req.body.email, password: req.body.password }
        const user = await UserModel.getByEmail(authData.email);
        if(!user){
            generateNewError(500,`Email doesn't exist or password is invalid`);
        }

        emailAndPasswordMatch(user.password, authData.password)
        const accessToken = generateToken(user)
        res.status(201).send({accessToken, userId: user._id});
    } catch (error) {
        next(error)
    }
}