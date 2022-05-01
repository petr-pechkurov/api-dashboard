import { IsEmail, IsString } from 'class-validator';
export default class UserLoginDto {
	@IsEmail({}, { message: 'Invalid email' })
	email: string;

	@IsString({ message: 'Password is not set' })
	password: string;
}
