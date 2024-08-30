import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Measure {
  @Prop()
  imageUrl: string;

  @Prop()
  customerCode: string;

  @Prop()
  measureDateTime: Date;

  @Prop()
  measureType: string;

  @Prop()
  measureValue: number;

  @Prop()
  hasConfirmed: boolean;
}

export const MeasureSchema = SchemaFactory.createForClass(Measure);
