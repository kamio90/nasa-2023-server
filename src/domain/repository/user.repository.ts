import { type User } from '@domain/entity/user.entity';

export interface UserRepository {
  findByUsername: (username: string) => Promise<User | null>;
  save: (user: User) => Promise<void>;
}
