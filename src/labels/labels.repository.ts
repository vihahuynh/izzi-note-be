import { Injectable } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Label, LabelDocument } from './schemas/label.schema';

@Injectable()
export class LabelsRepository {
  constructor(
    @InjectModel(Label.name)
    private labelModel: Model<LabelDocument>,
  ) {}

  async findOne(labelsFilterQuery: FilterQuery<Label>): Promise<Label> {
    return this.labelModel.findOne(labelsFilterQuery);
  }

  async find(labelsFilterQuery: FilterQuery<Label>): Promise<Label[]> {
    return this.labelModel.find(labelsFilterQuery);
  }

  async create(label: Label): Promise<Label> {
    const newLabel = new this.labelModel(label);
    return newLabel.save();
  }

  async update(id: string, label: Partial<Label>): Promise<Label> {
    return this.labelModel.findByIdAndUpdate(id, label, { new: true });
  }

  async remove(id: string): Promise<void> {
    return this.labelModel.findByIdAndDelete(id);
  }
}
