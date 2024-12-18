import { Model } from 'mongoose';
import { BaseRepositoryInterface } from './base.repository.interface';
import { BaseEntity } from './base.schema';
import { NotFoundException } from '@nestjs/common';

export abstract class BaseRepositoryAbstract<T extends BaseEntity>
  implements BaseRepositoryInterface<T>
{
  protected constructor(private readonly model: Model<T>) {
    this.model = model;
  }
  create(dto: Partial<T>): Promise<T> {
    const createdItem = new this.model(dto);
    return createdItem.save();
  }

  async update(id: string, dto: Partial<T>): Promise<T> {
    const updatedItem = await this.model
      .findByIdAndUpdate(id, dto, { new: true, runValidators: true })
      .exec();
    if (!updatedItem) {
      throw new NotFoundException(`Item with ID ${id} not found.`);
    }
    return updatedItem;
  }

  remove(id: string): Promise<T[]> {
    return this.model.findByIdAndDelete(id);
  }

  findAll(condition: object): Promise<T[]> {
    return this.model.find();
  }

  async findById(id: string): Promise<T> {
    const foundItem = await this.model.findById(id);
    if (!foundItem) {
      throw new NotFoundException(`Item with ID ${id} not found.`);
    }
    return foundItem;
  }
}
