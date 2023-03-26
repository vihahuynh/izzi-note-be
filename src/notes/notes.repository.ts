import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Note, NoteDocument } from './schemas/note.schema';

@Injectable()
export class NotesRepository {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async findOne(notesFilterQuery: FilterQuery<Note>): Promise<Note> {
    return this.noteModel.findOne(notesFilterQuery);
  }

  async find(notesFilterQuery: FilterQuery<Note>): Promise<Note[]> {
    return this.noteModel.find(notesFilterQuery);
  }

  async create(note: Note): Promise<Note> {
    const newNote = new this.noteModel(note);
    return newNote.save();
  }

  async update(id: string, note: Partial<Note>): Promise<Note> {
    return this.noteModel.findByIdAndUpdate(id, note, {
      new: true,
    });
  }

  async remove(id: string): Promise<void> {
    return this.noteModel.findByIdAndDelete(id);
  }
}
