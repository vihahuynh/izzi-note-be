import { IsArray, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateNoteDto {
  @IsOptional()
  _id: Types.ObjectId;

  @IsOptional()
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsArray()
  labels: any;

  user: any;
}
