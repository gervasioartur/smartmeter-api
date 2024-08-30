import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MeasuresService } from './measures.service';
import { CreateMeasureDto } from './dto/create-measure.dto';
import { UpdateMeasureDto } from './dto/update-measure.dto';

@Controller('measures')
export class MeasuresController {
  constructor(private readonly measuresService: MeasuresService) {}

  @Post()
  create(@Body() createMeasureDto: CreateMeasureDto) {
    return this.measuresService.create(createMeasureDto);
  }

  @Get()
  findAll() {
    return this.measuresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.measuresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeasureDto: UpdateMeasureDto) {
    return this.measuresService.update(+id, updateMeasureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.measuresService.remove(+id);
  }
}
