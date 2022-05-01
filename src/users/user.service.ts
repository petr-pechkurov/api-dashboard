import { UserModel } from '@prisma/client';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'inversify';
import IConfigService from '../config/config.service.interface';
import { TYPES } from '../types';
import UserLoginDto from './dto/user-login.dto';
import UserRegisterDto from './dto/user-register.dto';
import User from './user.entity';
import IUserService from './user.service.interface';
import { IUsersRepository } from './users.repository.interface';

@injectable()
export default class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
	) {}

	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		const existingUser = await this.usersRepository.find(email);

		return existingUser ? null : this.usersRepository.create(newUser);
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existingUser = await this.usersRepository.find(email);
		if (!existingUser) {
			return false;
		}
		const newUser = new User(existingUser.email, existingUser.name, existingUser.password);
		return newUser.comparePassword(password);
	}

	async getUserInfo(email: string): Promise<UserModel | null> {
		return this.usersRepository.find(email);
	}
}
