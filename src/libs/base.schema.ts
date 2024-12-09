import { Prop } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

export class BaseEntity {
  _id: ObjectId;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: null })
  updatedAt: Date;

  @Prop({ default: null })
  deletedAt: Date;
}
