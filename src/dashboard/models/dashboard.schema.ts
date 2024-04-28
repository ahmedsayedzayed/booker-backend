import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../database/abstract.schema';
import { IWidget } from './widget.interface';

@Schema({ versionKey: false })
export class DashboardDocument extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  Widgets: IWidget[];
}

export const DashboardSchema = SchemaFactory.createForClass(DashboardDocument);
