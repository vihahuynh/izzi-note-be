import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { Note, NoteSchema } from './notes/schemas/note.schema';
import { LabelsModule } from './labels/labels.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/test'),
    NotesModule,
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
    LabelsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
