import { Request, Response, NextFunction } from "express";
import ExpenseModel from "../models/expense.model";
import { IExpense } from "../../shared/types/types";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await ExpenseModel.list();
    res.status(200).send(response);
  } catch (error) {
    next(error)
  }
}

export const insert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const expenseData = req.body;
    console.log('expenseData:', expenseData)
    const response = await ExpenseModel.insert(expenseData);
    res.status(201).send(response);
  } catch (error) {
    next(error)
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const expenseId: string = req.params.id;
    const expenseDataToUpdate = req.body;
    const response = await ExpenseModel.update(expenseId, expenseDataToUpdate);
    res.status(200).send(response);
  } catch (error) {
    next(error)
  }
}

export const deleteExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const expenseId: string = req.params.id;
    const response = await ExpenseModel.delete(expenseId);
    res.status(200).send(response);
  } catch (error) {
    next(error)
  }
}

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const expenseId: string = req.params.id;
    const response = await ExpenseModel.getById(expenseId);
    res.status(200).send(response);
  } catch (error) {
    next(error)
  }
}

export const listByUserId = async (req: Request, res: Response, next: NextFunction) =>{
  try {
    const userId: string = req.params.userId;
    const listByUserId: Pick<IExpense, 'userId'> = { userId };
    const response = await ExpenseModel.getByUserId(listByUserId);
    res.status(200).send(response);
  } catch (error) {
    next(error)
  }
}