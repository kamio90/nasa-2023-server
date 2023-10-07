/* eslint-disable no-useless-catch */
import { UserModel, type User } from '@domain/entity/user.entity';
import { UserAcademicTitle } from '@domain/interfaces/user-academic-title.interface';
import { UserCity } from '@domain/interfaces/user-city.interface';
import { UserCountry } from '@domain/interfaces/user-country.interface';
import { UserEducation } from '@domain/interfaces/user-education.interface';
import bcrypt from 'bcrypt';
interface ResponseType {
  success: boolean;
  message: string | any[];
}
export class UserService {
  async createUser(userInput: User): Promise<User> {
    try {
      const existingUser = await UserModel.findOne({ email: userInput.email });
      if (existingUser != null) {
        throw new Error('User existing');
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userInput.password, saltRounds);

      const newUser = new UserModel({
        ...userInput,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();

      return savedUser;
    } catch (error) {
      throw error;
    }
  }

  async getUserAcademicTitle(): Promise<ResponseType> {
    return { success: true, message: new Array(UserAcademicTitle) };
  }

  async getUserCity(): Promise<ResponseType> {
    return { success: true, message: new Array(UserCity) };
  }

  async getUserCountry(): Promise<ResponseType> {
    return { success: true, message: new Array(UserCountry) };
  }

  async getUserEducation(): Promise<ResponseType> {
    return { success: true, message: new Array(UserEducation) };
  }

  async test(): Promise<ResponseType> {
    return { success: true, message: 'Test passed' };
  }
}
