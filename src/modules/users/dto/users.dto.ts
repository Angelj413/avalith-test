import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: `Username for the user. (Min length 3 char, Max 25)`,
  })
  @MaxLength(25)
  @MinLength(3)
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: `Password of the user. (Min length 8 char, Max 30)`,
  })
  @MaxLength(30)
  @MinLength(8)
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `First name of the user.` })
  readonly first_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `Last name of the user.` })
  readonly last_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `Social security number of the user.` })
  readonly ssn: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `Date of birth of the user.` })
  readonly date_of_birth: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `Phone number of the user.` })
  readonly phone: string;
}
