import { ApiProperty } from '@nestjs/swagger';

export class UploadMeasureRequest {
  @ApiProperty({
    description: 'Base64 encoded image data',
    example: 'data:image/png;base64,...',
  })
  image: string;

  @ApiProperty({
    description: 'Customer code associated with the measure',
    example: 'CUST123',
  })
  costumer_code: string;

  @ApiProperty({
    description: 'Date and time when the measure was taken',
    example: '2024-08-29T15:00:00Z',
  })
  measure_dateTime: Date;

  @ApiProperty({
    description: 'Type of the measure',
    example: 'GAS',
  })
  measure_type: string;
}
