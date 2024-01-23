import { Request, Response, NextFunction } from "express";
import UserModel from '../models/user.model';
import { encrypthPassword, generatePasswordToken } from "../../shared/utils/encrypth/encrypth.utils";
import { IUser } from "../../shared/types/types";
import { generateNewError } from "../../shared/middlewares/error.middleware";

export const list = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await UserModel.list();
        res.status(200).send(response);
    } catch (error) {
        next(error)
    }
}

export const insert = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData: IUser = req.body;
        //first set
        userData.password = encrypthPassword(userData.password);
        userData.status = true;
        userData.isConfirmed = false;

        // generate recuperation password and confirmation token
        const response = await UserModel.insert(userData);
        res.status(201).send(response);
    } catch (error) {
        next(error)
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: string = req.params.id;
        const userDataToUpdate = req.body;
        const response = await UserModel.update(userId, userDataToUpdate);
        res.status(200).send(response);
    } catch (error) {
        next(error)
    }
}

export const deleteEntity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: string = req.params.id;
        const response = await UserModel.delete(userId);
        res.status(200).send(response);
    } catch (error) {
        next(error)
    }
}

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: string = req.params.id;
        const response = await UserModel.getById(userId);
        res.status(200).send(response);
    } catch (error) {
        next(error)
    }
}

export const passwordRecovery = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userEmail = req.body.email;
        const user = await UserModel.getByEmail(userEmail)
        if (!user) {
            generateNewError(500, `Operation error or email doesn't exist`);
        }
        console.log('user:', user)

        const tempPayload = { time: new Date().getTime() };
        console.log('tempPayload:', tempPayload)

        const dataString = JSON.stringify(tempPayload);
        console.log('dataString:', tempPayload)

        const token = generatePasswordToken(dataString);
        console.log('token:', token)
        user.recoverPasswordToken = token;
        await UserModel.update(user._id, user);

        res.status(200).send({
            statusCode: 200,
            message: 'Operation Succesfully'
        });
    } catch (error) {
        console.log('error:', error)

        next(error)
    }
}

export const newPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: string = req.params.id;
        const newPassword = req.body.password;
        const password = encrypthPassword(newPassword);

        const userDataToUpdate = { password };
        console.log('userId:', userId, 'password:', password);
        const response = await UserModel.updatePassword(userId, userDataToUpdate);
        res.status(200).send({
            statusCode: 200,
            message: 'Operation Succesfully'
        });
    } catch (error) {
        next(error)
    }
}

export const newPasswordByToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.body.token;
        const newPassword = req.body.newPassword;

        const user = await UserModel.findByPasswordRecoveryToken(token);
        user.password = encrypthPassword(newPassword);
        const newUser = {...user._doc};
        newUser.recoverPasswordToken = "";
        await UserModel.update(user._id, newUser);
        res.status(200).send({
            statusCode: 200,
            message: 'Operation Succesfully'
        });
    } catch (error) {
        next(error)
    }
}
