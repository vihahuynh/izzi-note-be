import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseEntity } from 'src/libs/base.schema';
import { Note } from 'src/notes/schemas/note.schema';
import { User } from 'src/users/schemas/user.schema';

export type UserDocument = HydratedDocument<Label>;

@Schema()
export class Label extends BaseEntity {
  @Prop()
  title: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }] })
  notes: Note[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  createdBy: User;
}

export const LabelSchema = SchemaFactory.createForClass(Label);
