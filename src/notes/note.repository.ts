import { BaseRepositoryInterface } from 'src/libs/base.repository.interface';
import { Note } from './schemas/note.schema';
import { BaseRepositoryAbstract } from 'src/libs/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

interface NoteRepositoryInterface extends BaseRepositoryInterface<Note> {}

@Injectable()
export class NoteRepository
  extends BaseRepositoryAbstract<Note>
  implements NoteRepositoryInterface
{
  constructor(
    @InjectModel(Note.name)
    private readonly noteRepository: Model<Note>,
  ) {
    super(noteRepository);
  }
}
