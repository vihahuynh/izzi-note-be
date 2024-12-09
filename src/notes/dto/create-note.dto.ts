import {
  IsOptional,
  IsDateString,
  IsString,
  ValidateIf,
  IsNotEmpty,
  ArrayNotEmpty,
} from 'class-validator';
import {
  NOTE_BACKGROUND_COLOR,
  NOTE_STATUS,
  NOTE_TYPE,
} from 'src/contants/contants';

export class CreateNoteDto {
  @ValidateIf((n) => (!n.content && !n.checkboxesContent) || n.title)
  @IsString()
  @IsNotEmpty()
  title: string;

  @ValidateIf((n) => (!n.title && !n.checkboxesContent) || n.content)
  @IsString()
  @IsNotEmpty()
  content: string;

  @ValidateIf((n) => (!n.content && !n.title) || n.checkboxesContent)
  @ArrayNotEmpty()
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
