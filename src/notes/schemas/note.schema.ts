import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import {
  NOTE_BACKGROUND_COLOR,
  NOTE_BACKGROUND_IMAGE,
  NOTE_STATUS,
  NOTE_TYPE,
} from 'src/contants/contants';
import { Label } from 'src/labels/schemas/label.schema';
import { BaseEntity } from 'src/libs/base.schema';
import { User } from 'src/users/schemas/user.schema';

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note extends BaseEntity {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop([String])
  checkboxesContent: string[];

  @Prop({ enum: NOTE_TYPE, default: NOTE_TYPE.TEXT })
  type: string;

  @Prop({ enum: NOTE_STATUS, default: NOTE_STATUS.NORMAL })
  status: string;

  @Prop({ enum: NOTE_BACKGROUND_COLOR, default: NOTE_BACKGROUND_COLOR.DEFAULT })
  backgroundColor: string;

  @Prop({
    default: NOTE_BACKGROUND_IMAGE.DEFAULT,
  })
  backgroundImage: string;

  @Prop()
  reminder: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  collaborators: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Label' }] })
  labels: Label[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  })
  createdBy: User;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
