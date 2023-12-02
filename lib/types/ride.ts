import type { LocationValues } from '@/components/LocationInput';
import type { RideAnnouncement } from '@prisma/client';

export type RideAnnouncementParams = Omit<
  RideAnnouncement,
  'id' | 'userChatId' | 'time' | 'fromAddr' | 'toAddr'
> & {
  time: string;
  from: LocationValues;
  to: LocationValues;
};
export type RideAnnouncementQueryResult = RideAnnouncement & {
  from: string;
  to: string;
  distanceFrom: number;
  // distanceTo: number;
  totalCount: number;
};
export type RideAnnouncementResult = RideAnnouncement & {
  from: LocationValues;
  to: LocationValues;
  distanceFrom: number;
  // distanceTo: number;
  totalCount: number;
};
