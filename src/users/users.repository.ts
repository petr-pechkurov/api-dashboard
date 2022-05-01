import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import PrismaService from '../database/prisma.service';
import { TYPES } from '../types';
import User from './user.entity';
import { IUsersRepository } from './users.repository.interface';

@injectable()
export default class UsersRepository implements IUsersRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async create({ name, email, password }: User): Promise<UserModel> {
		return this.prismaService.client.userModel.create({
			data: {
				name,
				email,
				password,
			},
		});
	}

	async find(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		});
	}

	async checkLogin(email: string, password: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				email,
				password,
			},
		});
	}
}
