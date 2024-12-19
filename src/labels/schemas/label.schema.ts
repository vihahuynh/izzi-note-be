import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { BaseEntity } from 'src/libs/base.schema';
import { User } from 'src/users/schemas/user.schema';

export type UserDocument = HydratedDocument<Label>;

@Schema()
export class Label extends BaseEntity {
  @Prop({ required: true })
  title: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  })
  createdBy: User;
}

export const LabelSchema = SchemaFactory.createForClass(Label);
