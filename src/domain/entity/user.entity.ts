import { UserAcademicTitle } from '@domain/interfaces/user-academic-title.interface';
import { UserCity } from '@domain/interfaces/user-city.interface';
import { UserCountry } from '@domain/interfaces/user-country.interface';
import { UserEducation } from '@domain/interfaces/user-education.interface';
import { Document, Schema, type Model, model } from 'mongoose';

export class User extends Document {
  constructor(
    public username: string,
    public password: string,
    public email: string,
    public phoneNumber: string,
    public country: UserCountry,
    public city: UserCity,
    public education: UserEducation,
    public academicTitle: UserAcademicTitle,
    public workExperience: number,
    public primaryLanguage: string
  ) {
    super();
  }
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  country: { type: String, enum: Object.values(UserCountry), required: true },
  city: { type: String, enum: Object.values(UserCity), required: true },
  education: {
    type: String,
    enum: Object.values(UserEducation),
    required: true,
  },
  academicTitle: {
    type: String,
    enum: Object.values(UserAcademicTitle),
    required: true,
  },
  workExperience: { type: Number, required: true },
  primaryLanguage: { type: String, required: true },
});

export const UserModel: Model<User> = model<User>('User', UserSchema);
