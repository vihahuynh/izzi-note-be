import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { UserDocument } from 'src/users/schemas/user.schema';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { LabelsRepository } from './labels.repository';
import { Label } from './schemas/label.schema';

@Injectable()
export class LabelsService {
  constructor(private readonly labelsRepository: LabelsRepository) {}

  create(createLabelDto: CreateLabelDto, user: UserDocument) {
    return this.labelsRepository.create({ ...createLabelDto, user: user._id });
  }

  findAll(query: FilterQuery<Label>) {
    return this.labelsRepository.find(query);
  }

  async findOne(query: FilterQuery<Label>) {
    const label = await this.labelsRepository.findOne(query);
    if (!label) throw new NotFoundException('label not found');
    return label;
  }

  update(id: string, updateLabelDto: UpdateLabelDto) {
    return this.labelsRepository.update(id, updateLabelDto);
  }

  remove(id: string) {
    return this.labelsRepository.remove(id);
  }
}
