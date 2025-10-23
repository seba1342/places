import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PlaceSearchFilterInput } from './dto/place-filter.input';
import { PlaceConnection } from './dto/place-connection.type';
import { Place } from './dto/place.type';
import {
  createConnection,
  decodeCursor,
  encodeGlobalId,
} from '../common/relay/connection.helper';

@Injectable()
export class PlacesService {
  constructor(private prisma: PrismaService) {}

  async searchPlaces(
    first: number = 10,
    after?: string,
    filter?: PlaceSearchFilterInput,
  ): Promise<PlaceConnection> {
    const where: any = {};

    if (filter?.text) {
      where.name = {
        contains: filter.text,
        mode: 'insensitive',
      };
    }

    if (filter?.category) {
      where.category = filter.category;
    }

    if (filter?.bbox) {
      where.lat = {
        gte: filter.bbox.minLat,
        lte: filter.bbox.maxLat,
      };
      where.lng = {
        gte: filter.bbox.minLng,
        lte: filter.bbox.maxLng,
      };
    }

    const totalCount = await this.prisma.place.count({ where });

    const cursor = after ? { id: decodeCursor(after) } : undefined;

    const places = await this.prisma.place.findMany({
      where,
      take: first + 1,
      ...(cursor && { skip: 1, cursor }),
      orderBy: { id: 'asc' },
    });

    const hasNextPage = places.length > first;
    const nodes = hasNextPage ? places.slice(0, first) : places;

    const mappedNodes: Place[] = nodes.map((place) => ({
      id: encodeGlobalId('Place', place.id),
      name: place.name,
      category: place.category,
      rating: place.rating ?? undefined,
      lat: place.lat,
      lng: place.lng,
      description: place.description ?? undefined,
      address: place.address ?? undefined,
      city: place.city ?? undefined,
      state: place.state ?? undefined,
      country: place.country ?? undefined,
      imageUrl: place.imageUrl ?? undefined,
    }));

    return createConnection(mappedNodes, totalCount, hasNextPage);
  }

  async findById(id: string): Promise<Place | null> {
    const place = await this.prisma.place.findUnique({
      where: { id },
    });

    if (!place) {
      return null;
    }

    return {
      id: encodeGlobalId('Place', place.id),
      name: place.name,
      category: place.category,
      rating: place.rating ?? undefined,
      lat: place.lat,
      lng: place.lng,
      description: place.description ?? undefined,
      address: place.address ?? undefined,
      city: place.city ?? undefined,
      state: place.state ?? undefined,
      country: place.country ?? undefined,
      imageUrl: place.imageUrl ?? undefined,
    };
  }
}
