import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Prop()
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  isPinned: boolean;

  @Prop()
  isArchived: boolean;

  @Prop()
  isCheckBox: boolean;

  @Prop()
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;

  @Prop()
  color: string;

  @Prop()
  backgroundImage: string;

  @Prop()
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  collaborators: Types.ObjectId[];

  @Prop()
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Label' }])
  labels: Types.ObjectId[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: Types.ObjectId;
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
