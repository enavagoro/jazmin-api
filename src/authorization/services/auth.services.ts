import * as crypto from "crypto";
import { generateNewError } from "../../shared/middlewares/error.middleware";

export const emailAndPasswordMatch = (password: string, incomingPassword: string) =>{
    let encrypthedPassword = password.split('$');
    let salt = encrypthedPassword[0];
    let hash = crypto.createHmac('sha512', salt).update(incomingPassword).digest("base64");
    if(encrypthedPassword[1] !== hash){
        generateNewError(403, 'Connect refused, bad credentials')
    }
}