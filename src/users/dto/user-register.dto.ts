import { IsEmail, IsString } from 'class-validator';

export default class UserRegisterDto {
	@IsString({ message: 'Name is not set' })
	name: string;

	@IsEmail({}, { message: 'Invalid email' })
	email: string;

	@IsString({ message: 'Password is not set' })
	password: string;
}
