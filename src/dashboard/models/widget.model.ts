import { Field, ObjectType } from '@nestjs/graphql';
import { IWidget } from './widget.interface';

@ObjectType()
export class Widget implements IWidget {
  @Field()
  name: string;

  @Field(() => [String])
  values: string[];
}
