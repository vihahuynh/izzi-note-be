import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
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
  @IsString()
  color: string;

  @IsOptional()
  @IsString()
  backgroundImage: string;

  @IsOptional()
  @IsBoolean()
  isPinned: boolean;

  @IsOptional()
  @IsBoolean()
  isArchived: boolean;

  @IsOptional()
  @IsBoolean()
  isDeleted: boolean;

  @IsOptional()
  @IsBoolean()
  isCheckBox: boolean;

  @IsOptional()
  deletedAt: Date;

  @IsOptional()
  @IsArray()
  collaborators: any;

  @IsOptional()
  @IsArray()
  labels: any;

  owner: any;
}
