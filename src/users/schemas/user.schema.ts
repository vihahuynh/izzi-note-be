import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop({ unique: true })
  email: string;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('timestamps', true);
UserSchema.set('toJSON', {
  transform: (doc, user) => {
    user.id = user._id;
    delete user._id;
    delete user.__v;
  },
});

export { UserSchema };
