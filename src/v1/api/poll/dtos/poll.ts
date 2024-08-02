import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class PollCreateDto {
  @IsNotEmpty({ message: 'title is required' })
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  title: string;
}
