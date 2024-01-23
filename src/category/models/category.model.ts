import { Schema, model } from 'mongoose';
import { CategoryType, ICategory } from '../../shared/types/types';

class CategoryModel {
  categorySchema: Schema<ICategory> | undefined;
  CategoryModel: any;

  constructor() {
    this.defineMongooseSchema();
    this.createMongooseModel();
  }

  private defineMongooseSchema() {
    this.categorySchema = new Schema<ICategory>({
      name: { type: String, required: true },
      categoryType: { type: String, required: true },
      status: { type: Boolean, required: true },
      userId: { type: String, required: true }
    });
    this.categorySchema.index({ userId: 1 });
  }

  private createMongooseModel() {
    this.CategoryModel = model<ICategory>('Category', this.categorySchema);
  }

  public async list() {
    const entities = await this.CategoryModel.find({});
    return entities;
  }

  public async insert(categoryData: ICategory) {
    const newCategory = new this.CategoryModel(categoryData);
    const savedCategory = await newCategory.save();
    return savedCategory;
  }

  public async update(id: string, dataToUpdate: ICategory) {
    const updatedCategory = await this.CategoryModel.findByIdAndUpdate(id, dataToUpdate, { new: true });
    return updatedCategory;
  }

  public async delete(id: string) {
    const deletedCategory = await this.CategoryModel.findByIdAndDelete(id);
    return deletedCategory;
  }

  public async getById(id: string) {
    const category = await this.CategoryModel.findById(id);
    return category;
  }

  public async getByUserId(userId: Pick<ICategory, 'userId'>) {
    const categories = await this.CategoryModel.find(userId);
    return categories;
  }

  public async getByCategoryType(userId: string, categoryType: string) {
    console.log('userId:', userId);
    const categories = await this.CategoryModel.find({userId, categoryType});
    return categories;
  }
}

const categoryModel = new CategoryModel();
export default categoryModel;