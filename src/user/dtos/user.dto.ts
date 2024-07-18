import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  ENG_REGEX,
  NUM_REGEX,
  validationOptionsMsg,
} from 'src/common/utils/GLOBAL';

export class UserDto {
  @IsNotEmpty(validationOptionsMsg('Username cannot be empty'))
  @Matches(
    new RegExp('^[' + ENG_REGEX + NUM_REGEX + '_' + ']{2,40}$'),
    validationOptionsMsg(
      'Username is not correct (a-zA-Z0-9_), or too short (min: 2), or too long (max: 40)'
    )
  )
  username: string;

  @IsNotEmpty(validationOptionsMsg('Email cannot be empty'))
  @IsEmail({}, validationOptionsMsg('Email is not an email'))
  email: string;

  @IsNotEmpty(validationOptionsMsg('Username cannot be empty'))
  @MinLength(2, validationOptionsMsg('Full name is too short (min: 2)'))
  @MaxLength(50, validationOptionsMsg('Full name is too long (max: 50)'))
  fullName: string;

  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d).+$/,
    validationOptionsMsg(
      'The password must be between 8 and 50 characters long, include at least 1 digit and 1 letter'
    )
  )
  @IsNotEmpty(validationOptionsMsg('Password cannot be empty'))
  password: string;
}
