import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseEntity } from 'src/libs/base.schema';

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User extends BaseEntity {
  @Prop({ unique: true })
  username: string;

  @Prop()
  hashPwd: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
