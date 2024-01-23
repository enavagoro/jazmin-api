import { Schema, model } from 'mongoose';
import { IExpense } from '../../shared/types/types';

class ExpenseModel {
  expenseSchema: Schema<IExpense> | undefined;
  ExpenseModel: any;

  constructor() {
    this.defineMongooseSchema();
    this.createMongooseModel();
  }

  private defineMongooseSchema() {
    this.expenseSchema = new Schema<IExpense>({
      name: { type: String, required: true },
      description: { type: String },
      amount: { type: Object, required: true},
      status: { type: Boolean, required: true },
      userId: { type: String, required: true },
      categoryId: {type: String, required: true},
    });
    this.expenseSchema.index({ userId: 1 });
  }

  private createMongooseModel() {
    this.ExpenseModel = model<IExpense>('Expense', this.expenseSchema);
  }

  public async list() {
    const expenses = await this.ExpenseModel.find({});
    return expenses;
  }

  public async insert(expenseData: IExpense) {
    const newExpense = new this.ExpenseModel(expenseData);
    const savedExpense = await newExpense.save();
    return savedExpense;
  }

  public async update(id: string, dataToUpdate: IExpense) {
    const updatedExpense = await this.ExpenseModel.findByIdAndUpdate(id, dataToUpdate, { new: true });
    return updatedExpense;
  }

  public async delete(id: string) {
    const deletedExpense = await this.ExpenseModel.findByIdAndDelete(id);
    return deletedExpense;
  }

  public async getById(id: string) {
    const expense = await this.ExpenseModel.findById(id);
    return expense;
  }

  public async getByUserId(userId: Pick<IExpense, 'userId'>) {
    const expenses = await this.ExpenseModel.find(userId);
    return expenses;
  }
}

const expenseModel = new ExpenseModel();
export default expenseModel;