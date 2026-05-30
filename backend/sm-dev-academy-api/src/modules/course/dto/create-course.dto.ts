import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsIn,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CATEGORIES } from '../../../common/constants/categories';
import { LANGUAGES } from '../../../common/constants/languages';
import { TECHNOLOGIES } from '../../../common/constants/technologies';

export class CreateCourseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty()
  @IsString()
  @IsUrl()
  thumbnail!: string;

  @ApiProperty()
  @IsString()
  @IsUrl()
  playlistUrl!: string;

  @ApiProperty({
    enum: CATEGORIES,
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(CATEGORIES)
  category!: string;

  @ApiProperty({
    enum: TECHNOLOGIES,
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(TECHNOLOGIES)
  technology!: string;

  @ApiProperty({
    enum: LANGUAGES,
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(LANGUAGES)
  language!: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  level?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;
}
