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
  costumerCode: string;

  @ApiProperty({
    description: 'Date and time when the measure was taken',
    example: '2024-08-29T15:00:00Z',
  })
  measureDateTime: Date;

  @ApiProperty({
    description: 'Type of the measure',
    example: 'GAS',
  })
  measureType: string;
}
