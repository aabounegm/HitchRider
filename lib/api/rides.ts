export interface Ride {
  id: number;
  time: Date;
  from: string;
  to: string;
  price: number;
  seats: number;
  recurrence?: {
    type: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: Date;
  };
}
