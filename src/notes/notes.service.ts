import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './schemas/note.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name)
    private noteModel: Model<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto, userId: string): Promise<Note> {
    const createdNote = new this.noteModel({
      ...createNoteDto,
      createdBy: userId,
    });
    return createdNote.save();
  }

  async findAll(userId: string): Promise<Note[]> {
    return this.noteModel.find({ createdBy: userId }).exec();
  }

  async update(
    id: string,
    updateNoteDto: UpdateNoteDto,
    userId: string,
  ): Promise<Note> {
    await this.checkNoteAndAuthor(id, userId);

    const updatedItem = await this.noteModel
      .findByIdAndUpdate(id, updateNoteDto, { new: true, runValidators: true })
      .exec();

    return updatedItem;
  }

  async remove(id: string, userId: string) {
    await this.checkNoteAndAuthor(id, userId);
    return this.noteModel.findByIdAndDelete(id);
  }

  private async checkNoteAndAuthor(noteId: string, userId: string) {
    const itemToUpdate = await this.noteModel.findById(noteId);
    if (!itemToUpdate) {
      throw new NotFoundException(`Item with ID ${noteId} not found.`);
    }
    if (itemToUpdate.createdBy.toString() !== userId) {
      throw new ForbiddenException();
    }
  }
}
