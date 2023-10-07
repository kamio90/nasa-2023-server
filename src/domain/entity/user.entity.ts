import { type UserAcademicTitle } from '@domain/interfaces/user-academic-title.interface';
import { type UserCity } from '@domain/interfaces/user-city.interface';
import { type UserCountry } from '@domain/interfaces/user-country.interface';
import { type UserEducation } from '@domain/interfaces/user-education.interface';

export class User {
  constructor(
    public username: string,
    public password: string,
    public email: string,
    public phoneNumber: string,
    public country: UserCountry,
    public city: UserCity,
    public education: UserEducation,
    public academicTitle: UserAcademicTitle
  ) {}
}
