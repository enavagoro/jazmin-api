import { Schema, model } from 'mongoose';
import { IIncome } from '../../shared/types/types';

class IncomeModel {
  incomeSchema: Schema<IIncome> | undefined;
  IncomeModel: any;

  constructor() {
    this.defineMongooseSchema();
    this.createMongooseModel();
  }

  private defineMongooseSchema() {
    this.incomeSchema = new Schema<IIncome>({
      name: { type: String, required: true },
      description: { type: String },
      amount: { type: Object, required: true},
      status: { type: Boolean, required: true },
      userId: { type: String, required: true },
      categoryId: { type: String, required: true}
    });
    this.incomeSchema.index({ userId: 1 });
  }

  private createMongooseModel() {
    this.IncomeModel = model<IIncome>('Income', this.incomeSchema);
  }

  public async list() {
    const entities = await this.IncomeModel.find({});
    return entities;
  }

  public async insert(incomeData: IIncome) {
    const newIncome = new this.IncomeModel(incomeData);
    const savedIncome = await newIncome.save();
    return savedIncome;
  }

  public async update(id: string, dataToUpdate: IIncome) {
    const updatedIncome = await this.IncomeModel.findByIdAndUpdate(id, dataToUpdate, { new: true });
    return updatedIncome;
  }

  public async delete(id: string) {
    const deletedIncome = await this.IncomeModel.findByIdAndDelete(id);
    return deletedIncome;
  }

  public async getById(id: string) {
    const income = await this.IncomeModel.findById(id);
    return income;
  }

  public async getByUserId(userId: Pick<IIncome, 'userId'>) {
    const incomes = await this.IncomeModel.find(userId);
    return incomes;
  }
}

const incomeModel = new IncomeModel();
export default incomeModel;