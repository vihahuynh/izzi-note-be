import { Module } from '@nestjs/common';
import { LabelsService } from './labels.service';
import { LabelsController } from './labels.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Label, LabelSchema } from './schemas/label.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Label.name, schema: LabelSchema }]),
  ],
  controllers: [LabelsController],
  providers: [LabelsService],
})
export class LabelsModule {}
