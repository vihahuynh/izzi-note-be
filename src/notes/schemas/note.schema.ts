import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Prop()
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Label' }])
  labels: Types.ObjectId[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;
}

const NoteSchema = SchemaFactory.createForClass(Note);

NoteSchema.set('timestamps', true);
NoteSchema.set('toJSON', {
  transform: (doc, note) => {
    note.id = note._id;
    delete note._id;
    delete note.__v;
  },
});

export { NoteSchema };
