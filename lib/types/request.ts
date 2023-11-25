import type { LocationValues } from '@/components/LocationInput';
import type { RideRequest } from '@prisma/client';

export type RideRequestParams = Omit<
  RideRequest,
  'id' | 'userChatId' | 'time'
> & {
  time: string;
  from: LocationValues;
};
export type RideQueryResult = RideRequest & {
  from: string;
};
export type RideRequestResult = RideRequest & {
  from: LocationValues;
};
