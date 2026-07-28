import { ArrayMaxSize, ArrayMinSize, IsArray, IsString } from 'class-validator';

export class ImportCoursesDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @IsString({
    each: true,
  })
  technologies!: string[];
}
