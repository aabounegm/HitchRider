import type { LocationValues } from '@/components/LocationInput';
import type { RideRequest } from '@prisma/client';

export type RideRequestParams = Omit<
  RideRequest,
  'id' | 'userChatId' | 'time' | 'fromAddr' | 'toAddr'
> & {
  time: string;
  from: LocationValues;
  to: LocationValues;
};
export type RideRequestQueryResult = RideRequest & {
  from: string;
  to: string;
};
export type RideRequestResult = RideRequest & {
  from: LocationValues;
  to: LocationValues;
};
