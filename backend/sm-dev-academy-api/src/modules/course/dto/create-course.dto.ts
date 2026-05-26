import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateCourseDto {

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsUrl()
  thumbnail!: string;

  @IsString()
  @IsUrl()
  videoUrl!: string;

  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsString()
  @IsNotEmpty()
  technology!: string;

}