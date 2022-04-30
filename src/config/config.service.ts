import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import ILogger from '../logger/logger.interface';
import { TYPES } from '../types';
import IConfigService from './config.service.interface';

@injectable()
export default class ConfigService implements IConfigService {
	private config: DotenvParseOutput;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('[ConfigService] Can not read .env file');
		} else {
			this.logger.log('[ConfigService] Config .env is loaded');
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get(key: string): string {
		return this.config[key];
	}
}
