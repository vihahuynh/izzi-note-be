import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './schemas/note.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const createdNote = new this.noteModel(createNoteDto);
    return createdNote.save();
  }

  async findAll(): Promise<Note[]> {
    return this.noteModel.find().exec();
  }

  async findOne(id: string) {
    const foundNote = await this.noteModel.findById(id);
    if (!foundNote) {
      throw new NotFoundException(`Item with ID ${id} not found.`);
    }
    return foundNote;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const updatedItem = await this.noteModel
      .findByIdAndUpdate(id, updateNoteDto, { new: true, runValidators: true })
      .exec();
    if (!updatedItem) {
      throw new NotFoundException(`Item with ID ${id} not found.`);
    }
    return updatedItem;
  }

  remove(id: string) {
    return this.noteModel.findByIdAndDelete(id);
  }
}
