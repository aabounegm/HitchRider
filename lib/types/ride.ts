import type { LocationValues } from '@/components/LocationInput';
import type { RideAnnouncement } from '@prisma/client';

export type RideAnnouncementParams = Omit<
  RideAnnouncement,
  'id' | 'userChatId' | 'time'
> & {
  time: string;
  from: LocationValues;
  to: LocationValues;
};
export type RideAnnouncementQueryResult = RideAnnouncement & {
  from: string;
  to: string;
};
export type RideAnnouncementResult = RideAnnouncement & {
  from: LocationValues;
  to: LocationValues;
};
