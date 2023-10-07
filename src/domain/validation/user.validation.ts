import { type User } from '@domain/entity/user.entity';
import { validate, type ValidationError } from 'class-validator';

export async function validateUserInput(userInput: User): Promise<string[]> {
  const errors: ValidationError[] = await validate(userInput);

  if (errors.length === 0) {
    return [];
  }

  const validationErrors: string[] = [];
  errors.forEach((error: ValidationError) => {
    for (const constraint in error.constraints) {
      if (Object.prototype.hasOwnProperty.call(error.constraints, constraint)) {
        validationErrors.push(error.constraints[constraint]);
      }
    }
  });

  return validationErrors;
}
