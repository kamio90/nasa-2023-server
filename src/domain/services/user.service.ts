/* eslint-disable no-useless-catch */
import { UserModel, type User } from '@domain/entity/user.entity';
import { UserAcademicTitle } from '@domain/interfaces/user-academic-title.interface';
import { UserCity } from '@domain/interfaces/user-city.interface';
import { UserCountry } from '@domain/interfaces/user-country.interface';
import { UserEducation } from '@domain/interfaces/user-education.interface';
import { validateUserInput } from '@domain/validation/user.validation';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
interface ResponseType {
  success: boolean;
  message: string | any[];
  token?: string;
}
export class UserService {
  async createUser(userInput: User): Promise<ResponseType> {
    try {
      const validationErrors = await validateUserInput(userInput);
      if (validationErrors.length > 0) {
        throw new Error('Error: data is not valid!');
      }

      const existingUser = await UserModel.findOne({ email: userInput.email });
      if (existingUser != null) {
        throw new Error('Error: User existing!');
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userInput.password, saltRounds);

      const newUser = new UserModel({
        ...userInput,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();

      const token = jwt.sign(
        { userId: savedUser._id },
        process.env.JWT_SECRET_KEY ?? 'your-secret-key',
        {
          expiresIn: process.env.JWT_TOKEN_LIFE_TIME_IN_HOURS,
        }
      );

      return { success: true, message: 'User created', token };
    } catch (error) {
      throw error;
    }
  }

  async loginUser(email: string, password: string): Promise<ResponseType> {
    try {
      const user = await UserModel.findOne({ email });

      if (user == null) {
        throw new Error('Error: User not found');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error('Error: Invalid password');
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY ?? 'your-secret-key',
        {
          expiresIn: process.env.JWT_TOKEN_LIFE_TIME_IN_HOURS,
        }
      );

      return { success: true, message: 'Login successful', token };
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
