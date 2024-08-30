import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class ConfirmMeasureRequest {
  @ApiProperty({
    description: 'The measure unique identity.',
    example: randomUUID(),
  })
  measure_uuid: string;

  @ApiProperty({
    description: 'The correct values that appear on the image.',
    example: '200',
  })
  confirmed_value: number;
}
