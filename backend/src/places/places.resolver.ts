import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { PlacesService } from './places.service';
import { PlaceConnection } from './dto/place-connection.type';
import { PlaceSearchFilterInput } from './dto/place-filter.input';
import { Place } from './dto/place.type';
import { Node } from '../common/relay/node.interface';
import { decodeGlobalId } from '../common/relay/connection.helper';

@Resolver(() => Place)
export class PlacesResolver {
  constructor(private placesService: PlacesService) {}

  @Query(() => PlaceConnection)
  async searchPlaces(
    @Args('first', { type: () => Int, nullable: true, defaultValue: 10 })
    first: number,
    @Args('after', { nullable: true }) after?: string,
    @Args('filter', { nullable: true }) filter?: PlaceSearchFilterInput,
  ): Promise<PlaceConnection> {
    return this.placesService.searchPlaces(first, after, filter);
  }

  @Query(() => Node, { nullable: true })
  async node(@Args('id') id: string): Promise<Node | null> {
    const { type, id: rawId } = decodeGlobalId(id);

    if (type === 'Place') {
      return this.placesService.findById(rawId);
    }

    return null;
  }
}
