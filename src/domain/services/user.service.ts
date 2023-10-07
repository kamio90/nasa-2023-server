import { UserAcademicTitle } from '@domain/interfaces/user-academic-title.interface';
import { UserCity } from '@domain/interfaces/user-city.interface';
import { UserCountry } from '@domain/interfaces/user-country.interface';
import { UserEducation } from '@domain/interfaces/user-education.interface';
interface ResponseType {
  success: boolean;
  message: string | any[];
}
export class UserService {
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
