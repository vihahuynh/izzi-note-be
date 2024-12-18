import { BaseRepositoryAbstract } from 'src/libs/base.repository';
import { Label } from './schemas/label.schema';
import { Injectable } from '@nestjs/common';
import { BaseRepositoryInterface } from 'src/libs/base.repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

interface LabelRepositoryInterface extends BaseRepositoryInterface<Label> {}

@Injectable()
export class LabelRepository
  extends BaseRepositoryAbstract<Label>
  implements LabelRepositoryInterface
{
  constructor(
    @InjectModel(Label.name)
    private readonly labelRepositry: Model<Label>,
  ) {
    super(labelRepositry);
  }
}
