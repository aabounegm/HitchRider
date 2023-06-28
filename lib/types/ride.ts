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

export const sampleRides: Ride[] = [
  {
    id: 1,
    time: new Date('2023-08-02T16:30:00.000Z'),
    from: 'Innopolis',
    to: 'Kazan',
    price: 20,
    seats: 4,
    recurrence: {
      type: 'daily',
      interval: 1,
    },
  },
  {
    id: 2,
    time: new Date('2023-08-05T15:00:00.000Z'),
    from: 'Ufa',
    to: 'Innopolis',
    price: 0,
    seats: 2,
  },
  {
    id: 3,
    time: new Date('2023-08-07T12:00:00.000Z'),
    from: 'Kazan',
    to: 'Innopolis',
    price: 30,
    seats: 3,
  },
];
