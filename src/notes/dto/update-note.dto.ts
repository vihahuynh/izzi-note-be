import {
  IsOptional,
  IsDateString,
  IsString,
  ValidateIf,
  IsNotEmpty,
  ArrayNotEmpty,
  IsUUID,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import {
  NOTE_BACKGROUND_COLOR,
  NOTE_STATUS,
  NOTE_TYPE,
} from 'src/contants/contants';

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
}
