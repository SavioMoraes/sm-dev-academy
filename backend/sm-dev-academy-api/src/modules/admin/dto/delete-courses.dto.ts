import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class DeleteCoursesDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({
    each: true,
  })
  playlistIds!: string[];
}