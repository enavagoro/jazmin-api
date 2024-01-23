import { Request } from 'express';

export interface RequestWithJwt extends Request {
    jwt?: { [key: string]: any };
  }

// Type for custom error

export interface CustomError extends Error {
    status?: number;
}

// user interface 

export interface IUser {
    name: string;
    email: string;
    phone: string;
    rut: string;
    password: string;
    status?: boolean;
    recoverPasswordToken?: string;
    isConfirmed?: boolean;
}

// authorization interface

export interface AuthData {
    email: string,
    password: string,
}

// amount interface

export interface IAmount {
    value: number;
    currency: string;
}

// income interface
export interface IIncome {
    status: Boolean;
    userId: String;
    amount: IAmount;
    categoryId: String;
    name: String;
    description: String;
}

// expense interface
export interface IExpense {
    status: Boolean;
    userId: String;
    amount: IAmount;
    categoryId: String;
    name: String;
    description: String;
}

// category interface
export interface ICategory {
    status: Boolean;
    userId: String;
    categoryType: CategoryType;
    name: String;
}

// category type
export type CategoryType = 'expense' | 'income';
