import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Label } from './schemas/label.schema';
import { Model } from 'mongoose';

@Injectable()
export class LabelsService {
  constructor(
    @InjectModel(Label.name)
    private labelModel: Model<Label>,
  ) {}
  async create(createLabelDto: CreateLabelDto, userId: string) {
    const foundLabel = await this.labelModel.findOne({
      createdBy: userId,
      title: createLabelDto.title,
    });
    if (foundLabel) {
      throw new BadRequestException('Label already exists');
    }
    const newLabel = new this.labelModel({
      ...createLabelDto,
      createdBy: userId,
    });
    return newLabel.save();
  }

  findAll(userId: string) {
    return this.labelModel.find({ createdBy: userId }).exec();
  }

  findOne(id: string) {
    return `This action returns a #${id} label`;
  }

  async update(id: string, updateLabelDto: UpdateLabelDto, userId: string) {
    await this.checkLabelAndAuthor(id, userId);
    return this.labelModel
      .findByIdAndUpdate(id, updateLabelDto, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async remove(id: string, userId: string) {
    await this.checkLabelAndAuthor(id, userId);
    return this.labelModel.findByIdAndDelete(id).exec();
  }

  private async checkLabelAndAuthor(labelId: string, userId: string) {
    const itemToUpdate = await this.labelModel.findById(labelId);
    if (!itemToUpdate) {
      throw new NotFoundException(`Item with ID ${labelId} not found.`);
    }
    if (itemToUpdate.createdBy.toString() !== userId) {
      throw new ForbiddenException();
    }
  }
}
