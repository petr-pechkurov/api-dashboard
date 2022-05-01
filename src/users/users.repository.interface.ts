import { UserModel } from '@prisma/client';
import User from './user.entity';

export interface IUsersRepository {
	checkLogin: (email: string, password: string) => Promise<UserModel | null>;
	create: (user: User) => Promise<UserModel>;
	find: (email: string) => Promise<UserModel | null>;
}
