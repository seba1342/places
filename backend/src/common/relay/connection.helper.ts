import { PageInfo } from './page-info.type';

export function encodeCursor(id: string): string {
  return Buffer.from(id).toString('base64');
}

export function decodeCursor(cursor: string): string {
  return Buffer.from(cursor, 'base64').toString('utf-8');
}

export function encodeGlobalId(type: string, id: string): string {
  return Buffer.from(`${type}:${id}`).toString('base64');
}

export function decodeGlobalId(globalId: string): { type: string; id: string } {
  const decoded = Buffer.from(globalId, 'base64').toString('utf-8');
  const [type, id] = decoded.split(':');
  return { type, id };
}

export interface ConnectionArgs {
  first?: number;
  after?: string;
}

export interface Edge<T> {
  cursor: string;
  node: T;
}

export interface Connection<T> {
  edges: Edge<T>[];
  pageInfo: PageInfo;
  totalCount: number;
}

export function createConnection<T extends { id: string }>(
  nodes: T[],
  totalCount: number,
  hasNextPage: boolean,
  hasPreviousPage: boolean = false,
): Connection<T> {
  const edges = nodes.map((node) => ({
    cursor: encodeCursor(node.id),
    node,
  }));

  const pageInfo: PageInfo = {
    hasNextPage,
    hasPreviousPage,
    startCursor: edges.length > 0 ? edges[0].cursor : undefined,
    endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : undefined,
  };

  return {
    edges,
    pageInfo,
    totalCount,
  };
}
