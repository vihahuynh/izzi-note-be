import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesRepository } from './notes.repository';
import { Note } from './schemas/note.schema';

@Injectable()
export class NotesService {
  constructor(private readonly usersRepository: NotesRepository) {}

  create(createNoteDto: CreateNoteDto) {
    return this.usersRepository.create(createNoteDto);
  }

  findAll(query: FilterQuery<Note>) {
    return this.usersRepository.find(query);
  }

  async findOne(id: string) {
    const note = await this.usersRepository.findOne(id);
    if (!note) throw new NotFoundException('note not found');
    return note;
  }

  update(id: string, updateNoteDto: UpdateNoteDto) {
    return this.usersRepository.update(id, updateNoteDto);
  }

  remove(id: string) {
    return this.usersRepository.remove(id);
  }
}
