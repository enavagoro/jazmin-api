import { Request , Response, NextFunction} from "express";
import { CustomError } from "../types/types";

interface ErrorMap {
    [key: number]: string;
}

export const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    const errorMap: ErrorMap = {
        300: 'Multiple Choices',
        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
        500: 'Internal Server Error',
        502: 'Bad Gateway',
        503: 'Service Unavailable',
        504: 'Gateway Timeout'
    };

    const { status = 500, message } = error;
    const errorMessage = message || errorMap[status] || 'Unknown Error';

    res.status(status).json({ message: errorMessage });
};

export const generateNewError = (status: number, message?: string) =>{
    const error: CustomError = new Error();
    error.message = message || '';
    error.status = status;
    throw error;
}