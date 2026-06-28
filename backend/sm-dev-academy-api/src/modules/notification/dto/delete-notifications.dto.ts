import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class DeleteNotificationsDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({
    each: true,
  })
  ids!: string[];
}
