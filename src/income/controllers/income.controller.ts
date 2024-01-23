import { Request, Response, NextFunction } from "express";
import IncomeModel from "../models/income.model";
import { IIncome } from "../../shared/types/types";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await IncomeModel.list();
    res.status(200).send(response);
  } catch (error) {
    next(error)
  }
}

export const insert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const incomeData = req.body;
    const response = await IncomeModel.insert(incomeData);
    res.status(201).send(response);
  } catch (error) {
    next(error)
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const incomeId: string = req.params.id;
    const incomeDataToUpdate = req.body;
    const response = await IncomeModel.update(incomeId, incomeDataToUpdate);
    res.status(200).send(response);
  } catch (error) {
    next(error)
  }
}

export const deleteIncome = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const incomeId: string = req.params.id;
    const response = await IncomeModel.delete(incomeId);
    res.status(200).send(response);
  } catch (error) {
    next(error)
  }
}

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const incomeId: string = req.params.id;
    const response = await IncomeModel.getById(incomeId);
    res.status(200).send(response);
  } catch (error) {
    next(error)
  }
}

export const listByUserId = async (req: Request, res: Response, next: NextFunction) =>{
  try {
    const userId: string = req.params.userId;
    const listByUserId: Pick<IIncome, 'userId'> = { userId };
    const response = await IncomeModel.getByUserId(listByUserId);
    res.status(200).send(response);
  } catch (error) {
    next(error)
  }
}