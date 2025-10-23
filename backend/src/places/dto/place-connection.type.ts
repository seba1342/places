import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PageInfo } from '../../common/relay/page-info.type';
import { Place } from './place.type';

@ObjectType()
export class PlaceEdge {
  @Field()
  cursor: string;

  @Field(() => Place)
  node: Place;
}

@ObjectType()
export class PlaceConnection {
  @Field(() => [PlaceEdge])
  edges: PlaceEdge[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => Int)
  totalCount: number;
}
