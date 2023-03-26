import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

export type LabelDocument = Label & Document;

@Schema()
export class Label {
  @Prop({ unique: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;
}

const LabelSchema = SchemaFactory.createForClass(Label);

LabelSchema.set('timestamps', true);
LabelSchema.set('toJSON', {
  transform: (doc, label) => {
    label.id = label._id;
    delete label._id;
    delete label.__v;
  },
});

export { LabelSchema };
