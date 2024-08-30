import { Injectable } from '@nestjs/common';
import { CreateMeasureDto } from './dto/create-measure.dto';
import { UpdateMeasureDto } from './dto/update-measure.dto';

@Injectable()
export class MeasuresService {
  create(createMeasureDto: CreateMeasureDto) {
    return 'This action adds a new measure';
  }

  findAll() {
    return `This action returns all measures`;
  }

  findOne(id: number) {
    return `This action returns a #${id} measure`;
  }

  update(id: number, updateMeasureDto: UpdateMeasureDto) {
    return `This action updates a #${id} measure`;
  }

  remove(id: number) {
    return `This action removes a #${id} measure`;
  }
}
