import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { IWidget } from '../../models/widget.interface';
import { WidgetDashboardInputInput } from './widget-dashboard-input';

@InputType()
export class UpdateDashboardInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  _id: string;

  @Field(() => [WidgetDashboardInputInput])
  @IsArray()
  Widgets: IWidget[];
}
