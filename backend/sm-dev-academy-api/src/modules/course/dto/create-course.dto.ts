import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  videoUrl!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  technology!: string;

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
