import { Module } from '@nestjs/common';
import { LabelsService } from './labels.service';
import { LabelsController } from './labels.controller';
import { LabelsRepository } from './labels.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Label, LabelSchema } from './schemas/label.schema';
import { Note, NoteSchema } from 'src/notes/schemas/note.schema';
import { NotesRepository } from 'src/notes/notes.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Label.name, schema: LabelSchema },
      { name: Note.name, schema: NoteSchema },
    ]),
  ],
  controllers: [LabelsController],
  providers: [LabelsService, LabelsRepository, NotesRepository],
})
export class LabelsModule {}
