import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';

@Schema()
export class MeasureModel {
  @Prop({ type: String, unique: true, required: true, default: randomUUID })
  measureUUId: string;

  @Prop()
  image: string;

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

export const MeasureSchema = SchemaFactory.createForClass(MeasureModel);
