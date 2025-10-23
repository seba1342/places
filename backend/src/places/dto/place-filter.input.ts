import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class BoundingBoxInput {
  @Field(() => Float)
  minLat: number;

  @Field(() => Float)
  maxLat: number;

  @Field(() => Float)
  minLng: number;

  @Field(() => Float)
  maxLng: number;
}

@InputType()
export class PlaceSearchFilterInput {
  @Field({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  category?: string;

  @Field(() => BoundingBoxInput, { nullable: true })
  bbox?: BoundingBoxInput;
}
