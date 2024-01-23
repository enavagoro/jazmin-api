import { Schema, model } from 'mongoose';
import { IUser } from '../../shared/types/types'

class UserModel {
    userSchema: Schema<IUser> | undefined;
    UserModel: any;

    constructor() {
        this.defineMongooseSchema();
        this.createMongooseModel();
    }

    private defineMongooseSchema() {
        this.userSchema = new Schema<IUser>({
            name: { type: String, required: true },
            email: { type: String, required: true, unique: true },
            phone: { type: String },
            rut: { type: String, unique: true },
            password: { type: String, required: true },
            status: { type: Boolean },
            recoverPasswordToken: { type: String },
            isConfirmed: { type: Boolean },
        });
    }

    private createMongooseModel() {
        this.UserModel = model<IUser>('User', this.userSchema);
    }

    public async list() {
        const users = await this.UserModel.find({});
        return users;
    }

    public async insert(userData: IUser) {
        const newUser = new this.UserModel(userData);
        const savedUser = await newUser.save();
        return savedUser;
    }

    public async update(id: string, dataToUpdate: IUser) {
        const updatedUser = await this.UserModel.findByIdAndUpdate(id, dataToUpdate, { new: true });
        return updatedUser;
    }

    public async updatePassword(id: string, dataToUpdate: Pick<IUser, 'password'>) {
        const updatedUser = await this.UserModel.findByIdAndUpdate(id, dataToUpdate, { new: true });
        return updatedUser;
    }

    public async delete(id: string) {
        const deletedUser = await this.UserModel.findByIdAndDelete(id);
        return deletedUser;
    }

    public async getById(id: string) {
        const user = await this.UserModel.findById(id);
        return user;
    }

    public async getByEmail(email: string){
        const user = await this.UserModel.find({email}).limit(1);
        if(user.length == 0){
            return null;
        }
        return user[0]
    }

    public async findByRecoveryToken(email: string){
        const user = await this.UserModel.find({email}).limit(1);
        if(user.length == 0){
            return null;
        }
        return user[0]
    }

    public async findByPasswordRecoveryToken(recoverPasswordToken: string){
        const user = await this.UserModel.find({recoverPasswordToken}).limit(1);
        if(user.length == 0){
            return null;
        }
        return user[0]
    }
}

const userModel = new UserModel();
export default userModel;