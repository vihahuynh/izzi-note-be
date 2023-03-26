import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesRepository } from './notes.repository';
import { Note } from './schemas/note.schema';

@Injectable()
export class NotesService {
  constructor(private readonly notesRepository: NotesRepository) {}

  create(createNoteDto: CreateNoteDto) {
    return this.notesRepository.create(createNoteDto);
  }

  findAll(query: FilterQuery<Note>) {
    return this.notesRepository.find(query);
  }

  async findOne(notesFilterQuery: FilterQuery<Note>) {
    const note = await this.notesRepository.findOne(notesFilterQuery);
    if (!note) throw new NotFoundException('note not found');
    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    return this.notesRepository.update(id, updateNoteDto);
  }

  async remove(id: string) {
    return this.notesRepository.remove(id);
  }
}
