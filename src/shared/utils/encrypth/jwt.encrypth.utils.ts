
import jwt from 'jsonwebtoken';
import { generateNewError } from "../../middlewares/error.middleware";
import * as dotenv from 'dotenv';
dotenv.config();

export const generateToken = (data: any): string | undefined => {
    console.log('data',data )
    try {
        const payload = {data};
        const options = {
            expiresIn: '1h', // Set the token to expire in 1 hour
        };

        const jwtSecret = process.env.JTW_SECRET || '';
        console.timeLog('jwtScret', jwtSecret);
        const token = jwt.sign(payload, jwtSecret, options);
        return token;

    } catch (err) {
        console.log('err:', err);
        generateNewError(500)
    }
}