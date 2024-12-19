import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LabelsService } from './labels.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('labels')
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req, @Body() createLabelDto: CreateLabelDto) {
    return this.labelsService.create(createLabelDto, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.labelsService.findAll(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.labelsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateLabelDto: UpdateLabelDto,
  ) {
    return this.labelsService.update(id, updateLabelDto, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.labelsService.remove(id, req.user.id);
  }
}
