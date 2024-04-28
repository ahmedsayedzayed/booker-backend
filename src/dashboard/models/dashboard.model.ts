import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from '../../common/abstract.model';
import { Widget } from './widget.model';

@ObjectType()
export class Dashboard extends AbstractModel {
  @Field()
  readonly name: string;

  @Field(() => [Widget])
  readonly Widgets: Widget[];
}
