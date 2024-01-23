import * as crypto from "crypto";
import { generateNewError } from "../../middlewares/error.middleware";
const algorithm = 'aes-256-ctr';
const secretKey = 'KbPeShVmYq3s6v9y$B&E)H@McQfTjWnZ';

export const encrypthPassword = (password: string): string =>{
    if(!password){
        generateNewError(500)
    }
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
    return salt + "$" + hash;
}


export const createConfirmationToken = (data: any) =>{
    return generateTokenByData(data);
}

export const generateTokenByData = (data: any)=>{
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
    const finalToken = `iv:${iv.toString('hex')}content:${encrypted.toString('hex')}`;
    return finalToken;
}

export const generatePasswordToken = (data: string) =>{
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
    const finalToken = `${iv.toString('hex')}${encrypted.toString('hex')}`;
    return finalToken;
}