import { PrismaClient, UserModel } from '@prisma/client';
import e from 'express';
import { inject, injectable } from 'inversify';
import ILogger from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export default class PrismaService {
	client: PrismaClient;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log('[PrismaService] DB connection successful!');
		} catch (err) {
			if (err instanceof Error)
				this.logger.error('[PrismaService] DB connection error:', err.message);
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
