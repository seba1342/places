export enum PlaceCategory {
  RESTAURANT = 'RESTAURANT',
  BAR = 'BAR',
  PUB = 'PUB',
  CAFE = 'CAFE',
  OTHER = 'OTHER',
}

export interface Place {
  id: string;
  name: string;
  description: string | null;
  category: PlaceCategory;
  rating: number | null;
  lat: number;
  lng: number;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  imageUrl: string | null;
}

export interface PlaceEdge {
  node: Place;
  cursor: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface PlaceConnection {
  edges: PlaceEdge[];
  pageInfo: PageInfo;
  totalCount: number;
}

export interface SearchPlacesFilter {
  text?: string;
  category?: PlaceCategory;
  bbox?: {
    minLat: number;
    maxLat: number;
    minLng: number;
    maxLng: number;
  };
}
