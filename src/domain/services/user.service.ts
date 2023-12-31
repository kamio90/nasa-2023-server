/* eslint-disable no-useless-catch */
import { UserModel, type User } from '@domain/entity/user.entity';
import { UserAcademicTitleBase } from '@domain/interfaces/user/user-academic-title.interface';
import { UserCity } from '@domain/interfaces/user/user-city.interface';
import { UserCountry } from '@domain/interfaces/user/user-country.interface';
import { UserAcademicTitle } from '@domain/interfaces/user/user-education.interface';
import { UserLanguages } from '@domain/interfaces/user/user-languages.interface';
import { validateUserInput } from '@domain/validation/user.validation';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { type Request } from 'express';
import { UserAcademicTitleEurope } from '@domain/interfaces/user/user-academic-title-europe.interface';
import { UserAcademicTitleCanada } from '@domain/interfaces/user/user-academic-title-canada.interface';
import { UserAcademicTitleOther } from '@domain/interfaces/user/user-academic-title-other.interface';
import { UserAcademicTitleUSA } from '@domain/interfaces/user/user-academic-title-usa.interface';
import { UserFieldsOfScience } from '@domain/interfaces/user/user-fields-of-science.interface';
import { UserDisciplinesOfScienceAgriculturalScience } from '@domain/interfaces/user/user-disciplines-of-science-agricultural-science.interface';
import { UserDisciplinesOfScienceArt } from '@domain/interfaces/user/user-disciplines-of-science-art.interface';
import { UserDisciplinesOfScienceConicScience } from '@domain/interfaces/user/user-disciplines-of-science-conic-science.interface';
import { UserDisciplinesOfScienceEngineeringAndTechnicalSciences } from '@domain/interfaces/user/user-disciplines-of-science-engineering-and-technical-sciences.interface';
import { UserDisciplinesOdScienceExactAndNaturalScience } from '@domain/interfaces/user/user-disciplines-of-science-exact-and-natural-science.interface';
import { UserDisciplinesOfScienceHumanities } from '@domain/interfaces/user/user-disciplines-of-science-humanities.interface';
import { UserDisciplinesOfScienceMedicalAndHealthSciences } from '@domain/interfaces/user/user-disciplines-of-science-medical-and-health-sciences.interface';
import { UserDisciplinesOfScienceSocialScience } from '@domain/interfaces/user/user-disciplines-of-science-social-science.interface';
import { UserDisciplinesOfScienceTheologicalScience } from '@domain/interfaces/user/user-disciplines-of-science-theological-science.interface';

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
          expiresIn: '1h',
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
          expiresIn: '1h',
        }
      );

      return { success: true, message: user._id, token };
    } catch (error) {
      throw error;
    }
  }

  async getUserAcademicTitleUSA(): Promise<ResponseType> {
    return { success: true, message: new Array(UserAcademicTitleUSA) };
  }

  async getUserAcademicTitleOther(): Promise<ResponseType> {
    return { success: true, message: new Array(UserAcademicTitleOther) };
  }

  async getUserAcademicTitleEurope(): Promise<ResponseType> {
    return { success: true, message: new Array(UserAcademicTitleEurope) };
  }

  async getUserAcademicTitleCanada(): Promise<ResponseType> {
    return { success: true, message: new Array(UserAcademicTitleCanada) };
  }

  async getUserAcademicTitle(): Promise<ResponseType> {
    return { success: true, message: new Array(UserAcademicTitleBase) };
  }

  async getUserCity(): Promise<ResponseType> {
    return { success: true, message: new Array(UserCity) };
  }

  async getUserCountry(): Promise<ResponseType> {
    return { success: true, message: new Array(UserCountry) };
  }

  async getUserEducation(): Promise<ResponseType> {
    return { success: true, message: new Array(UserAcademicTitle) };
  }

  async getUserLanguages(): Promise<ResponseType> {
    return { success: true, message: new Array(UserLanguages) };
  }

  async getUserFieldsOfScience(): Promise<ResponseType> {
    return { success: true, message: new Array(UserFieldsOfScience) };
  }

  async getUserDisciplinesOfScienceAgriculturalScience(): Promise<ResponseType> {
    return {
      success: true,
      message: new Array(UserDisciplinesOfScienceAgriculturalScience),
    };
  }

  async getUserDisciplinesOfScienceArt(): Promise<ResponseType> {
    return {
      success: true,
      message: new Array(UserDisciplinesOfScienceArt),
    };
  }

  async getUserDisciplinesOfScienceConicScience(): Promise<ResponseType> {
    return {
      success: true,
      message: new Array(UserDisciplinesOfScienceConicScience),
    };
  }

  async getUserDisciplinesOfScienceEngineeringAndTechnicalSciences(): Promise<ResponseType> {
    return {
      success: true,
      message: new Array(
        UserDisciplinesOfScienceEngineeringAndTechnicalSciences
      ),
    };
  }

  async getUserDisciplinesOfScienceHumanities(): Promise<ResponseType> {
    return {
      success: true,
      message: new Array(UserDisciplinesOfScienceHumanities),
    };
  }

  async getUserDisciplinesOfScienceMedicalAndHealthSciences(): Promise<ResponseType> {
    return {
      success: true,
      message: new Array(UserDisciplinesOfScienceMedicalAndHealthSciences),
    };
  }

  async getUserDisciplinesOfScienceSocialScience(): Promise<ResponseType> {
    return {
      success: true,
      message: new Array(UserDisciplinesOfScienceSocialScience),
    };
  }

  async getUserDisciplinesOfScienceTheologicalScience(): Promise<ResponseType> {
    return {
      success: true,
      message: new Array(UserDisciplinesOfScienceTheologicalScience),
    };
  }

  async getUserDisciplinesOfScienceExactAndNaturalScience(): Promise<ResponseType> {
    return {
      success: true,
      message: new Array(UserDisciplinesOdScienceExactAndNaturalScience),
    };
  }

  async test(): Promise<ResponseType> {
    return { success: true, message: 'Test passed' };
  }

  async getAllUsers(query: Request['query']): Promise<User[]> {
    try {
      const filters: Record<string, any> = {};

      if (query.title != null) {
        filters.title = { $regex: query.title, $options: 'i' };
      }

      const users = await UserModel.find(filters);
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId: string): Promise<User | null> {
    try {
      const user = await UserModel.findById(userId);
      return user;
    } catch (error) {
      throw error;
    }
  }
}
