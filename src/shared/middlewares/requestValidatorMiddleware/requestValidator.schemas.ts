import { shouldBeTruthy, isString } from "./requestValidator.validatorType";

// Schemas

const userStructureSchema = {
    name: shouldBeTruthy,
    email: shouldBeTruthy,
    phone: shouldBeTruthy,
    rut: shouldBeTruthy,
    password: shouldBeTruthy,
}

export const schemas = {
    userStructure: userStructureSchema,
}