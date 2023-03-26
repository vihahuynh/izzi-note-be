import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LabelsService } from './labels.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { FilterQuery } from 'mongoose';
import { Label } from './schemas/label.schema';
import { ParseObjectIdPipe } from 'src/common/pipes/parseObjectID.pipe';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserDocument } from 'src/users/schemas/user.schema';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('labels')
@UseGuards(AuthGuard)
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Post()
  create(
    @Body() createLabelDto: CreateLabelDto,
    @CurrentUser() user: UserDocument,
  ) {
    return this.labelsService.create(createLabelDto, user);
  }

  @Get()
  findAll(@Query() query: FilterQuery<Label>) {
    return this.labelsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.labelsService.findOne({ id });
  }

  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateLabelDto: UpdateLabelDto,
  ) {
    return this.labelsService.update(id, updateLabelDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.labelsService.remove(id);
  }
}
