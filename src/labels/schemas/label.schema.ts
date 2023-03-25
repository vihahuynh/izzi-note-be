import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type LabelDocument = Label & Document;

@Schema()
export class Label {
  @Prop({ unique: true })
  name: string;
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
