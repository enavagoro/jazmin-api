import { NextFunction } from "connect";
import { Request, Response } from "express";
import { generateNewError } from "../error.middleware";
import { schemas } from './requestValidator.schemas';

export const requestValidator = (objectStructureName: string, req: Request, res: Response, next: NextFunction) => {
    const objectStructure: any = getSchema(objectStructureName)
    const incomingObject = req.body;
    for (let index in objectStructure) {
        const validatorFunction = objectStructure[index];
        const objectKeyValue = incomingObject[index];

        if (!incomingObject.hasOwnProperty(index) || !validatorFunction(objectKeyValue)) {
            generateNewError(400);
        }
    }
    next()
}

export const requestValidatorWrapper = (objectStructureName: string) => (req: Request, res: Response, next: NextFunction) =>  {
    requestValidator(objectStructureName, req, res, next);
}


export const getSchema = (schemaName: string) =>{
    if(!schemas[schemaName as keyof typeof schemas]){
        generateNewError(400);
    }

    return schemas[schemaName as keyof typeof schemas]
}

