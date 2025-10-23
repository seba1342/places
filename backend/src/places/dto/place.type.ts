import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Node } from '../../common/relay/node.interface';

@ObjectType({ implements: () => [Node] })
export class Place implements Node {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  category: string;

  @Field(() => Float, { nullable: true })
  rating?: number;

  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lng: number;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  state?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  imageUrl?: string;
}
