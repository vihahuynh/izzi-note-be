import {
  IsOptional,
  IsDateString,
  IsString,
  IsArray,
  IsMongoId,
} from 'class-validator';
import {
  NOTE_BACKGROUND_COLOR,
  NOTE_STATUS,
  NOTE_TYPE,
} from 'src/contants/contants';
import { ObjectId } from 'mongoose';

export class UpdateNoteDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content: string;

  checkboxesContent: string[];

  @IsOptional()
  @IsString()
  type: NOTE_TYPE;

  @IsOptional()
  @IsString()
  status: NOTE_STATUS;

  @IsOptional()
  @IsString()
  backgroundColor: NOTE_BACKGROUND_COLOR;

  @IsOptional()
  @IsString()
  backgroundImage: string;

  @IsOptional()
  @IsDateString()
  reminder: Date;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  labels?: ObjectId[];
}
