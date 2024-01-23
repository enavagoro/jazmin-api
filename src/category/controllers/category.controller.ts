import { Request, Response, NextFunction } from "express";
import CategoryModel from "../models/category.model";
import { ICategory } from "../../shared/types/types";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await CategoryModel.list();
    res.status(200).send(response);
  } catch (error) {
    next(error)
  }
}

export const insert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryData = req.body;
    const response = await CategoryModel.insert(categoryData);
    res.status(201).send(response);
  } catch (error) {
    next(error)
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryId: string = req.params.id;
    const categoryDataToUpdate = req.body;
    const response = await CategoryModel.update(categoryId, categoryDataToUpdate);
    res.status(200).send(response);
  } catch (error) {
    next(error)
  }
}

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryId: string = req.params.id;
    const response = await CategoryModel.delete(categoryId);
    res.status(200).send(response);
  } catch (error) {
    next(error)
  }
}

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryId: string = req.params.id;
    const response = await CategoryModel.getById(categoryId);
    res.status(200).send(response);
  } catch (error) {
    next(error)
  }
}

export const listByUserId = async (req: Request, res: Response, next: NextFunction) =>{
  try {
    const userId: string = req.params.userId;
    const listByUserId: Pick<ICategory, 'userId'> = { userId };
    const response = await CategoryModel.getByUserId(listByUserId);
    res.status(200).send(response);
  } catch (error) {
    next(error)
  }
}

export const byCategoryType = async (req: Request, res: Response, next: NextFunction) =>{
  try {
    const userId: string = req.params.userId;
    const categoryType: string = req.body.categoryType;
    const response = await CategoryModel.getByCategoryType(userId, categoryType);
    res.status(200).send(response);
  } catch (error) {
    next(error)
  }
}