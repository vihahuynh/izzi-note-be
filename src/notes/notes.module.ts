import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from './schemas/note.schema';
import { NotesRepository } from './notes.repository';
import { Label, LabelSchema } from 'src/labels/schemas/label.schema';
import { LabelsRepository } from 'src/labels/labels.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Note.name, schema: NoteSchema },
      { name: Label.name, schema: LabelSchema },
    ]),
  ],
  controllers: [NotesController],
  providers: [NotesService, NotesRepository, LabelsRepository],
})
export class NotesModule {}
